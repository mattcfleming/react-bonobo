// https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactNativeFrameScheduling.js
// TODO: make this hardware relevant/aware
// @ts-nocheck
const hasNativePerformanceNow =
  typeof performance === 'object' &&
  // $FlowFixMe[method-unbinding]
  typeof performance.now === 'function';

// $FlowFixMe[signature-verification-failure]
export const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

let scheduledCallback: (() => {}) | null = null;
let frameDeadline: number = 0;

function setTimeoutCallback() {
  // React API probably changing to boolean rather than time remaining.
  // Longer-term plan is to rewrite this using shared memory,
  // And just return the value of the bit as the boolean.
  frameDeadline = now();

  const callback = scheduledCallback;
  scheduledCallback = null;
  if (callback !== null) {
    callback();
  }
}

// RN has a poor polyfill for requestIdleCallback so we aren't using it.
// This implementation is only intended for short-term use anyway.
// We also don't implement cancel functionality b'c Fiber doesn't currently need it.
export function scheduleDeferredCallback(
  callback: () => {},
  options?: { timeout: number }
): any {
  console.log(options);
  // We assume only one callback is scheduled at a time b'c that's how Fiber works.
  scheduledCallback = callback;
  const timeoutId = setTimeout(setTimeoutCallback, 1);
  // $FlowFixMe[unclear-type]
  return timeoutId; // Timeouts are always numbers on RN
}

export function cancelDeferredCallback(callbackID: number): void {
  scheduledCallback = null;
  // $FlowFixMe[unclear-type]
  clearTimeout(callbackID); // Timeouts are always numbers on RN
}

export function shouldYield(): boolean {
  return frameDeadline <= now();
}
