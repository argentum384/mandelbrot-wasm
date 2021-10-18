import init, * as wasm from "../pkg/mandelbrot_wasm.js";
await init();

const X0_DEFAULT = -2.0;
const Y0_DEFAULT = -2.0;
const W_DEFAULT = 4.0;
const H_DEFAULT = W_DEFAULT;

const N_WORKERS = 16;

const CANVAS_ID = "canvas";

const workers = [...Array(N_WORKERS).keys()].map(id => {
  const worker = new Worker("./js/worker.js", { type: "module" });
  worker.addEventListener("message", e => {
    if (e.data.type === "ready") {
      workers[id].ready = true;
    }
  }, false);
  return { worker, ready: false };
});

const view = wasm.View.new(
  wasm.Quad.from_f64(X0_DEFAULT),
  wasm.Quad.from_f64(Y0_DEFAULT),
  wasm.Quad.from_f64(W_DEFAULT),
  wasm.Quad.from_f64(H_DEFAULT)
);

const getAndCorrectInputUInt = (id) => {
  const input = document.getElementById(id);
  if (!input) {
    return null;
  }
  const value = parseInt(input.value);
  if (isNaN(value) || value < 0) {
    input.value = input.defaultValue; 
    return parseInt(input.defaultValue);
  }
  if (value < parseInt(input.min)) {
    input.value = input.min;
    return parseInt(input.min);
  }
  return value;
};

const onClickCanvas = e => {
  const rect = e.target.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  const cw = getAndCorrectInputUInt("inputCvWidth");
  const ch = getAndCorrectInputUInt("inputCvHeight");
  view.zoom(cx, cy, cw, ch, e.ctrlKey || e.shiftKey ? .5 : 2.0);
  draw();
}

const recreateCanvas = (width, height) => {
  const divCvContainer = document.getElementsByClassName("canvas-container")[0];
  if (!divCvContainer) {
    return;
  }
  let child;
  while ((child = divCvContainer.lastChild)) {
    divCvContainer.removeChild(child);
  }

  const cv = document.createElement("canvas");
  cv.id = CANVAS_ID;
  cv.onclick = onClickCanvas;
  cv.width = width;
  cv.height = height;
  divCvContainer.appendChild(cv);

  return cv;
};

const draw = () => {
  const cw = getAndCorrectInputUInt("inputCvWidth");
  const ch = getAndCorrectInputUInt("inputCvHeight");

  let cv = document.getElementById(CANVAS_ID);
  if (!cv || cv.width !== cw || cv.height !== ch) {
    cv = recreateCanvas(cw, ch);
  }

  const ctx = cv.getContext("2d");

  workers.forEach((worker, id) => {
    const imgData = ctx.createImageData(cw, Math.floor(ch / N_WORKERS));
    worker.worker.addEventListener("message", e => {
      if (e.data.type === "data") {
        ctx.putImageData(e.data.imgData, 0, id * Math.floor(ch / N_WORKERS));
      }
    }, false);
    worker.worker.postMessage(
      {
        imgData,
        x0: { high: view.x0.high, low: view.x0.low },
        y0: { high: view.y0.high, low: view.y0.low },
        w: { high: view.w.high, low: view.w.low },
        h: { high: view.h.high, low: view.h.low },
        workerId: id,
        nWorkers: N_WORKERS,
        nIterations: getAndCorrectInputUInt("inputNIterations")
      },
      [imgData.data.buffer]
    );
  });
  // console.log(`x0=${view.x0.to_f64()},y0=${view.y0.to_f64()},w=${view.w.to_f64()},h=${view.h.to_f64()}`);
};

const reset = () => {
  document.getElementById("formParams").reset();
  draw();
};

const tID = setInterval(() => {
  if (document.readyState === "loading" || workers.some(worker => !worker.ready)) {
    return;
  }
  clearInterval(tID);

  document.getElementById("btnDraw").onclick = draw;
  document.getElementById("btnReset").onclick = reset;
  draw();
}, 100);
