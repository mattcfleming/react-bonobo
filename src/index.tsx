import ReactBonoboRenderer from './renderer/reactBonoboRenderer';
import StyleSheetModule from './modules/StyleSheet';
import DimensionsModule from './modules/Dimensions';

import ListViewComponent from './renderer/components/ListView';
import RegisterComponentFn from './modules/Register';

import withFocusFn from './modules/Navigation/withFocus';
import withNavigationFn from './modules/Navigation/withNavigation';

export const ListView = ListViewComponent;
export const registerComponent = RegisterComponentFn;

export const render = ReactBonoboRenderer.render;
// export const unmountComponentAtNode = ReactBonoboRender.unmountComponentAtNode;

export const Image = 'Image';
export const View = 'View';
export const Text = 'Text';

export const StyleSheet = StyleSheetModule;
export const Dimensions = DimensionsModule;
export const withFocus = withFocusFn;
export const withNavigation = withNavigationFn;

export default ReactBonoboRenderer;
