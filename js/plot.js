"use strict";

const COLOR_TABLE_SIZE = 48;
const COLOR_TABLE = (() => {
  const f = x => {
    if (x > 0.5) {
      x = (x + 0.5) % 1.0 - 0.5;
    }
    if (x < 0.5) {
      x = (x - 0.5) % 1.0 + 0.5;
    }
    return Math.floor(
      x >= -(2.0 / 6.0) && x < -(1.0 / 6.0) ?
        255.0 * (6.0 * x + 2.0)
      :
      x >= -(1.0 / 6.0) && x < 1.0 / 6.0 ?
        255.0
      :
      x >= 1.0 / 6.0 && x < 2.0 / 6.0 ?
        255.0 * (2.0 - 6.0 * x)
      :
        0.0
    )
  };
  
  const colorTable = Array(COLOR_TABLE_SIZE);
  for (let i = 0; i < COLOR_TABLE_SIZE; i++) {
    const x = i / COLOR_TABLE_SIZE;
    const r = f(x);
    const g = f(x - 1.0 / 3.0);
    const b = f(x - 2.0 / 3.0);
    colorTable[i] = [r, g, b];
  }
  return colorTable;
})();

const getColor = k => k < 0 ? [0, 0, 0] : COLOR_TABLE[k % COLOR_TABLE.length];

export const plot = (imgDataId, offset, k) => {
  const data = self.imgDataAry[imgDataId].data;
  const [r, g, b] = getColor(k);
  data[offset    ] = r;
  data[offset + 1] = g;
  data[offset + 2] = b;
  data[offset + 3] = 255;
};

export const plot64 = (
  imgDataId, offset,
  k01, k02, k03, k04, k05, k06, k07, k08,
  k09, k10, k11, k12, k13, k14, k15, k16,
  k17, k18, k19, k20, k21, k22, k23, k24,
  k25, k26, k27, k28, k29, k30, k31, k32,
  k33, k34, k35, k36, k37, k38, k39, k40,
  k41, k42, k43, k44, k45, k46, k47, k48,
  k49, k50, k51, k52, k53, k54, k55, k56,
  k57, k58, k59, k60, k61, k62, k63, k64
) => {
  const data = self.imgDataAry[imgDataId].data;
  const k = [
    k01, k02, k03, k04, k05, k06, k07, k08,
    k09, k10, k11, k12, k13, k14, k15, k16,
    k17, k18, k19, k20, k21, k22, k23, k24,
    k25, k26, k27, k28, k29, k30, k31, k32,
    k33, k34, k35, k36, k37, k38, k39, k40,
    k41, k42, k43, k44, k45, k46, k47, k48,
    k49, k50, k51, k52, k53, k54, k55, k56,
    k57, k58, k59, k60, k61, k62, k63, k64
  ];
  for (let i = 0; i < 64; i++) {
    const [r, g, b] = getColor(k[i]);
    const o = offset + i * 4;
    data[o    ] = r;
    data[o + 1] = g;
    data[o + 2] = b;
    data[o + 3] = 255;
  }
};
