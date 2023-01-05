// import { CanvasComponentContext } from './types';
import reconciler from 'react-reconciler';
import reactBonoboComponent from './reactBonoboComponent';
import { scaleDPI, clearCanvas } from './core/canvas';
import { renderElement, renderQueue } from './core/render';
import {
  precacheFiberNode,
  updateFiberProps,
} from './reactBonoboComponentTree';
import devToolsConfig from './config/devtools';
import {
  now as FrameSchedulingNow,
  cancelDeferredCallback as FrameSchedulingCancelDeferredCallback,
  scheduleDeferredCallback as FrameSchedulingScheduleDeferredCallback,
  shouldYield as FrameSchedulingShouldYield,
} from './reactBonoboFrameScheduling';

// TODO: Use Context.
let bonoboCtxGlobal: any = null;
let surfaceHeight = 0;

const ReactBonoboFiber = reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild && child.type !== 'View') {
      let layout = {};
      if (child.instructions && child.instructions.relative) {
        layout = {
          ...layout,
          ...parentInstance.getAndUpdateCurrentLayout(),
        };
      }
      parentInstance.appendChild({ ...child, layout });

      // TODO: Change it later
      child.getParentLayout = parentInstance.getLayoutDefinitions;
    }
  },

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    if (!bonoboCtxGlobal && rootContainerInstance.getContext) {
      const rootContainerInstanceContext =
        rootContainerInstance.getContext('2d');

      scaleDPI(rootContainerInstance, rootContainerInstanceContext);
      bonoboCtxGlobal = {
        type: 'canvas',
        getSurfaceHeight: () => surfaceHeight,
        setSurfaceHeight: (height) => {
          surfaceHeight = height;
        },
        ctx: rootContainerInstanceContext,
        // EXPERIMENTAL:
        // clear: function clear() {
        //   const width = rootContainerInstance.width;
        //   const height = rootContainerInstance.height;
        //   this.ctx.clearRect(0, 0, width, height);
        // },
        renderQueue: [],
      };
    }

    const apeElement = reactBonoboComponent.createElement(
      type,
      props,
      rootContainerInstance,
      bonoboCtxGlobal,
      internalInstanceHandle
    );

    precacheFiberNode(internalInstanceHandle, apeElement);
    updateFiberProps(apeElement, props);
    return apeElement;
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // let textNode = reactApeComponent.createTextNode(text, rootContainerInstance);
    // precacheFiberNode(internalInstanceHandle, textNode);
    return text;
  },

  finalizeInitialChildren(parentInstance, type, props) {
    if (type === 'View') {
      parentInstance.render(bonoboCtxGlobal);
    }
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit(rootContainerInstance) {},

  prepareUpdate(
    element,
    type,
    oldProps,
    newProps,
    rootContainerInstance
  ): null | undefined {
    if (newProps) {
      const diff = reactBonoboComponent.diffProperties(
        element,
        type,
        oldProps,
        newProps,
        rootContainerInstance
      );

      if (diff) {
        const parentLayout = element.parentLayout || element.getParentLayout();
        if (type === 'Text') {
          parentLayout.resetLayout(); // View needs to be reset on text updates
        }

        element.clear(oldProps, parentLayout, bonoboCtxGlobal);

        const apeElement = reactBonoboComponent.createElement(
          type,
          newProps,
          rootContainerInstance,
          bonoboCtxGlobal,
          null
        );

        apeElement.parentLayout = parentLayout;

        // If isn't a children update, should render with new props
        if (diff.length && diff.indexOf('children') === -1) {
          renderElement(bonoboCtxGlobal, apeElement, parentLayout);
          return null;
        }

        bonoboCtxGlobal.renderQueue.push(apeElement);
        return null;
      }

      if (type === 'Text' && newProps.children && newProps.children.join) {
        const parentLayout = element.parentLayout || element.getParentLayout();
        element.clear(oldProps, parentLayout, bonoboCtxGlobal);

        const apeElement = reactBonoboComponent.createElement(
          type,
          { ...newProps, children: newProps.children.join('') },
          rootContainerInstance,
          bonoboCtxGlobal,
          null
        );

        renderElement(bonoboCtxGlobal, apeElement, parentLayout);
      }
    }
  },

  clearContainer() {},

  resetAfterCommit(rootContainerInstance) {
    // resetAfterCommit happens only for children changes
    renderQueue(bonoboCtxGlobal, () => {
      bonoboCtxGlobal.setSurfaceHeight(0);
    });
  },

  resetTextContent(element) {
    // noop
  },

  getRootHostContext(rootInstance) {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  scheduleDeferredCallback: FrameSchedulingScheduleDeferredCallback,
  cancelDeferredCallback: FrameSchedulingCancelDeferredCallback,
  schedulePassiveEffects: FrameSchedulingScheduleDeferredCallback,
  cancelPassiveEffects: FrameSchedulingCancelDeferredCallback,
  noTimeout: -1,
  useSyncScheduling: false,
  now: FrameSchedulingNow,
  isPrimaryRenderer: true,
  supportsMutation: true,

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  appendChildToContainer(parentInstance, child) {
    // bonoboCtxGlobal.setSurfaceHeight(0);
    // if (child.render) {
    //   child.render(bonoboCtxGlobal);
    // }
  },

  appendChild(parentInstance, child) {
    // console.log(parentInstance, child);
    // if (parentInstance.appendChild) {
    //   parentInstance.appendChild(child);
    // }
  },

  removeChild(parentInstance, child) {
    // parentInstance.removeChild(child);
    if (child.type && child.type === 'View') {
      child.clear(bonoboCtxGlobal, parentInstance.getLayoutDefinitions());
    }
  },

  removeChildFromContainer(parentInstance, child) {
    // parentInstance.removeChild(child);
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    // noop
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    // noop
  },

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText) {
    // textInstance.children = newText;
    // console.log(111, textInstance, oldText, newText);
  },

  shouldSetTextContent(props) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  },
});

ReactBonoboFiber.injectIntoDevTools({
  ...devToolsConfig,
  findHostInstanceByFiber: ReactBonoboFiber.findHostInstance,
});

const defaultContainer = {};
// Using WeakMap avoids memory leak in case the container is garbage colected.
const roots = typeof WeakMap === 'function' ? new WeakMap() : new Map();

const ReactBonoboRenderer = {
  render(reactApeElement, canvasDOMElement, callback) {
    const containerKey =
      canvasDOMElement == null ? defaultContainer : canvasDOMElement;
    let root = roots.get(containerKey);
    if (!root) {
      root = ReactBonoboFiber.createContainer(containerKey);
      roots.set(canvasDOMElement, root);
      bonoboCtxGlobal = null;
    }

    ReactBonoboFiber.updateContainer(reactApeElement, root, null, callback);

    return ReactBonoboFiber.getPublicRootInstance(root);
  },
};

export default ReactBonoboRenderer;
