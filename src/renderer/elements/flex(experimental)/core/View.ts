import type Layer from './Layer';
import type Text from './Text';
import Node from './Node';
import type { IViewLayout, IViewStyle } from './types';

export default class View extends Node {
  layer!: Layer;
  layout = {} as IViewLayout;
  type = 'View' as 'View';
  children: Array<View | Text> = [];

  constructor(protected style: IViewStyle) {
    super(style);
  }

  update(nextProps?: Partial<IViewStyle>) {
    this.style = { ...this.style, ...nextProps };
    const layer = this.getLayer();
    layer?.batchDraw();
  }

  handleSetLayout() {
    this.setLayout();
    this.children.forEach((child) => child.handleSetLayout());
  }

  draw() {
    this.calcLayout();
    this.drawCanvas();
  }

  // canvas
  drawCanvas() {
    console.log('drawCanvas view', this.layout);
    const ctx = this.layer.context;
    ctx.beginPath();
    ctx.fillStyle = this.layout.fillStyle;
    ctx.fillRect(
      this.layout.x,
      this.layout.y,
      this.layout.width,
      this.layout.height
    );
    ctx.stroke();
    this.children.forEach((child) => child.draw());
  }

  add(child: View | Text) {
    child.parent = this;
    child.layer = this.layer;
    this.children.push(child);
    this.node.insertChild(child.node, this.children.length - 1);
    child.update();
  }

  getLayer() {
    return this.layer;
  }
}
