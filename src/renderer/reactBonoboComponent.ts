// @ts-nocheck
import Image from './elements/Image';
import Text from './elements/Text';
import View from './elements/View';
import { CustomComponents } from '../modules/Register';
// import { trackMousePosition, isMouseInside } from './utils';
import Button from './elements/Button';

const CHILDREN = 'children';
const STYLE = 'style';

const ReactBonoboComponent = {
  createElement(
    type,
    props,
    rootContainerElement,
    bonoboContextGlobal,
    internalInstanceHandle
  ) {
    // TODO: Run it once
    const customDict = {};
    Object.keys(CustomComponents).forEach((customKey) => {
      customDict[customKey] = CustomComponents[customKey](
        props,
        bonoboContextGlobal
      );
    });

    const tag = '[CREATE_ELEMENT]';
    if (type === 'Button') {
      const { ctx } = bonoboContextGlobal;
      ctx.canvas.addEventListener(
        'click',
        (event) => {
          props.onClick(event);
        },
        false
      );
    }
    /**
     *  Handling click button event
     * @param {*} event
     */
    // const onClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    //   const rect = {
    //     x,
    //     y,
    //     height,
    //     width,
    //   };
    //   const mousePosition = trackMousePosition(ctx.canvas, event);
    //   if (isMouseInside(mousePosition, rect)) {
    //     // redrawButton(ctx);
    //     if (props.onClick && typeof props.onClick === 'function') {
    //       props.onClick(event);
    //     }
    //   }
    // };

    const COMPONENTS = {
      ...customDict,
      Image: Image(props),
      Text: Text(props),
      View: new View(props),
      Button: Button(props),
    };

    if (!COMPONENTS[type]) {
      throw new Error(
        `React Bonobo could not identify "${type}" as ReactBonoboComponent. More details: website.com`
      );
    }

    console.log('COMPONENTS[type]', COMPONENTS[type]);

    return COMPONENTS[type];
  },

  createTextNode(text, rootContainerElement) {
    return text;
  },

  diffProperties(
    element,
    tag,
    lastRawProps,
    nextRawProps,
    rootContainerElement
  ) {
    let updatePayload = null;

    const lastProps = lastRawProps;
    const nextProps = nextRawProps;

    let propKey;
    let styleName;
    let styleUpdates = null;
    for (propKey in lastProps) {
      if (
        nextProps.hasOwnProperty(propKey) ||
        !lastProps.hasOwnProperty(propKey) ||
        lastProps[propKey] == null
      ) {
        continue;
      }
      if (propKey === STYLE) {
        const lastStyle = lastProps[propKey];
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = '';
          }
        }
      } else {
        // For all other deleted properties we add it to the queue. We use
        // the whitelist in the commit phase instead.
        (updatePayload = updatePayload || []).push(propKey, null);
      }
    }
    for (propKey in nextProps) {
      const nextProp = nextProps[propKey];
      const lastProp = lastProps != null ? lastProps[propKey] : undefined;
      if (
        !nextProps.hasOwnProperty(propKey) ||
        nextProp === lastProp ||
        (nextProp == null && lastProp == null)
      ) {
        continue;
      }
      if (propKey === STYLE) {
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (
              lastProp.hasOwnProperty(styleName) &&
              (!nextProp || !nextProp.hasOwnProperty(styleName))
            ) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (
              nextProp.hasOwnProperty(styleName) &&
              lastProp[styleName] !== nextProp[styleName]
            ) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          if (!styleUpdates) {
            if (!updatePayload) {
              updatePayload = [];
            }
            updatePayload.push(propKey, styleUpdates);
          }
          styleUpdates = nextProp;
        }
      } else if (propKey === CHILDREN) {
        if (
          lastProp !== nextProp &&
          (typeof nextProp === 'string' || typeof nextProp === 'number')
        ) {
          (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
      } else {
        // For any other property we always add it to the queue and then we
        // filter it out using the whitelist during the commit.
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }
    if (styleUpdates) {
      (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
    }

    return updatePayload;
  },
};

export default ReactBonoboComponent;
