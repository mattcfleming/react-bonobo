import type { CanvasComponentContext, BonoboElement } from '../types';

function renderBonoboElement(
  bonoboContextGlobal: CanvasComponentContext,
  element: BonoboElement
) {
  element.render(bonoboContextGlobal, element.parentLayout);
}

function renderBonoboQueue(
  bonoboContextGlobal: CanvasComponentContext,
  onFinish: () => void
) {
  if (bonoboContextGlobal && bonoboContextGlobal.renderQueue.length) {
    const queue = bonoboContextGlobal.renderQueue;

    let reqId;
    const frame = () => {
      if (queue.length) {
        const element = queue.shift();
        element?.render(bonoboContextGlobal, element.parentLayout);

        reqId = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(reqId);
        onFinish();
      }
    };
    frame();
  }
}

export const renderQueue = renderBonoboQueue;
export const renderElement = renderBonoboElement;
