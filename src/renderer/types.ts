// @ts-nocheck
export type CustomCanvasRenderingContext2D = CanvasRenderingContext2D & {
  webkitBackingStorePixelRatio?: number;
  mozBackingStorePixelRatio?: number;
  msBackingStorePixelRatio?: number;
  oBackingStorePixelRatio?: number;
  backingStorePixelRatio?: number;
};

export type CanvasRect = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type SpatialGeometry = {
  x: number;
  y: number;
};

export type BonoboElement = {
  render: (CanvasComponentContext, Layout) => void;
  clear?: () => void;
  parentLayout?: Layout;
};

export type Layout = {
  style?: {
    backgroundColor: string;
    borderColor: string;
  };
  spatialGeometry: SpatialGeometry;
};

export type CanvasComponentContext = {
  // render queue for update operations
  renderQueue: Array<BonoboElement>;
  type: 'canvas';
  ctx: CustomCanvasRenderingContext2D;
};
