import init, * as wasm from "../pkg/mandelbrot_wasm.js";
await init();

self.imgDataAry = [];

self.onmessage = e => {
  const imgDataId = Math.random().toString(32).substring(2);
  const imgData = self.imgDataAry[imgDataId] = e.data.imgData;

  wasm.draw(
    e.data.x0.high, e.data.x0.low,
    e.data.y0.high, e.data.y0.low,
    e.data.w.high, e.data.w.low,
    e.data.h.high, e.data.h.low,
    imgData.width,
    imgData.height,
    e.data.workerId,
    e.data.nWorkers,
    imgDataId,
    e.data.nIterations
  );

  postMessage({ type: "data", imgData }, [imgData.data.buffer]);
};

postMessage({ type: "ready" });
