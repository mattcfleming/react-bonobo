import type Stage from './Stage';
import type View from './View';
import type Text from './Text';
import type { ILayerProps } from './types';
import Yoga from 'yoga-layout';

export default class Layer {
  children: Array<View | Text> = [];
  parent?: Stage;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  node!: Yoga.YogaNode;
  isBatching = false;
  layout = { x: 0, y: 0 };

  constructor(private style: ILayerProps) {
    this.initDOM();
    this.initYoga();
    (window as any).layerNode = this.node;
  }

  // canvas
  initDOM() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.canvas.width = this.style.width;
    this.canvas.height = this.style.height;
  }

  initYoga() {
    this.node = Yoga.Node.create();
    this.node.setWidth(this.style.width);
    this.node.setHeight(this.style.height);
  }

  add(child: View | Text) {
    child.layer = this;
    this.children.push(child);
    this.node.insertChild(child.node, this.children.length - 1);

    this.batchDraw();
  }

  batchDraw() {
    if (!this.isBatching) {
      this.isBatching = true;
      window.requestAnimationFrame(() => {
        this.context.clearRect(0, 0, this.style.width, this.style.height);
        this.setLayout();
        this.draw();
        this.isBatching = false;
      });
    }
  }

  setLayout() {
    this.children.forEach((child) => child.handleSetLayout());
    this.node.calculateLayout(
      Yoga.UNIT_UNDEFINED,
      Yoga.UNIT_UNDEFINED,
      Yoga.DIRECTION_LTR
    );
  }

  draw() {
    this.children.forEach((child) => child.draw());
  }

  getLayer() {
    return this;
  }
}
