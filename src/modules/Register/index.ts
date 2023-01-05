// @ts-nocheck
export const CustomComponents = {};

function registerComponent(componentName, Component) {
  CustomComponents[componentName] = (props) => {
    const clearRender = (prevProps, parentLayout, apeContext) => {
      const clearProps = {
        ...prevProps,
        style: {
          ...prevProps.style,
          color: parentLayout.style.backgroundColor,
        },
        isResetPhase: true,
      };

      console.log('clearRender');
      Component.render(clearProps, apeContext, parentLayout);
    };

    return {
      type: componentName,
      render: Component.render.bind(this, props),
      clear: Component.unsafeClear || clearRender,
    };
  };

  return componentName;
}

export default registerComponent;
