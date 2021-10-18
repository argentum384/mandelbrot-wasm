extern crate wasm_bindgen;

mod quad;

use wasm_bindgen::prelude::*;
use wasm_bindgen::throw_val;
use wasm_bindgen::memory;
use quad::Quad;

// const N_COEF: i32 = 48;

const K_ARY_SIZE: usize = 64;

#[wasm_bindgen]
pub struct View {
    pub x0: Quad,
    pub y0: Quad,
    pub w: Quad,
    pub h: Quad
}

#[wasm_bindgen]
impl View {
    pub fn new(x0: Quad, y0: Quad, w: Quad, h: Quad) -> View {
        View { x0, y0, w, h }
    }

    pub fn zoom(&mut self, cx: f64, cy: f64, cw: f64, ch: f64, mul: f64) {
        let x_center = self.w * (cx / cw) + self.x0;
        let y_center = self.h * (cy / ch) + self.y0;
        self.w = self.w / mul;
        self.h = self.h / mul;
        self.x0 = x_center - self.w * 0.5;
        self.y0 = y_center - self.h * 0.5;
    }
}

#[wasm_bindgen(module="/js/plot.js")]
extern {
    pub fn plot(img_data_id: &str, offset: i32, k: i32);
    pub fn plot64(
        img_data_id: &str, offset: i32,
        k01: i32, k02: i32, k03: i32, k04: i32, k05: i32, k06: i32, k07: i32, k08: i32,
        k09: i32, k10: i32, k11: i32, k12: i32, k13: i32, k14: i32, k15: i32, k16: i32,
        k17: i32, k18: i32, k19: i32, k20: i32, k21: i32, k22: i32, k23: i32, k24: i32,
        k25: i32, k26: i32, k27: i32, k28: i32, k29: i32, k30: i32, k31: i32, k32: i32,
        k33: i32, k34: i32, k35: i32, k36: i32, k37: i32, k38: i32, k39: i32, k40: i32,
        k41: i32, k42: i32, k43: i32, k44: i32, k45: i32, k46: i32, k47: i32, k48: i32,
        k49: i32, k50: i32, k51: i32, k52: i32, k53: i32, k54: i32, k55: i32, k56: i32,
        k57: i32, k58: i32, k59: i32, k60: i32, k61: i32, k62: i32, k63: i32, k64: i32
    );
}

#[wasm_bindgen]
pub fn draw(
    x0_h: f64, x0_l: f64,
    y0_h: f64, y0_l: f64,
    w_h: f64, w_l: f64,
    h_h: f64, h_l: f64,
    cw: i32,
    ch: i32,
    worker_id: f64,
    n_workers: f64,
    img_data_id: &str,
    n_iterations: i32
) {
    let x0 = Quad::new(x0_h, x0_l);
    let y0 = Quad::new(y0_h, y0_l) + Quad::new(h_h, h_l) * (worker_id / n_workers);
    let w = Quad::new(w_h, w_l);
    let h = Quad::new(h_h, h_l) / n_workers;

    // let n: i32 = std::cmp::max(
    //     N_COEF,
    //     N_COEF * ((4.0 * 1.0f64.exp() / w.to_f64()).ln().floor()) as i32
    // );

    let mut k_ary: [i32; K_ARY_SIZE] = [-1; K_ARY_SIZE];
    let mut k_ary_next: usize = 0;

    let mut cy: i32 = 0;
    while cy < ch {
        let y = h * (cy as f64 / ch as f64) + y0;
        let mut cx: i32 = 0;
        while cx < cw {
            let x = w * (cx as f64 / cw as f64) + x0;
            let mut a = Quad::from_f64(0.0);
            let mut b = Quad::from_f64(0.0);
            let mut k: i32 = 0;
            while k < n_iterations {
                let _a = a * a - b * b + x;
                let _b = 2.0 * a * b + y;
                a.high = _a.high;
                a.low = _a.low;
                b.high = _b.high;
                b.low = _b.low;
                let a_f64 = a.to_f64();
                let b_f64 = b.to_f64();
                if a_f64 * a_f64 + b_f64 * b_f64 > 4.0 {
                    k_ary[k_ary_next] = k;
                    k_ary_next += 1;
                    break;
                }
                k += 1;
            }
            if k >= n_iterations {
                k_ary[k_ary_next] = -1;
                k_ary_next += 1;
            }
            if k_ary_next >= K_ARY_SIZE {
                plot64(
                    img_data_id, 4 * (cx + cy * cw - (K_ARY_SIZE as i32 - 1)),
                    k_ary[ 0], k_ary[ 1], k_ary[ 2], k_ary[ 3], k_ary[ 4], k_ary[ 5], k_ary[ 6], k_ary[ 7],
                    k_ary[ 8], k_ary[ 9], k_ary[10], k_ary[11], k_ary[12], k_ary[13], k_ary[14], k_ary[15],
                    k_ary[16], k_ary[17], k_ary[18], k_ary[19], k_ary[20], k_ary[21], k_ary[22], k_ary[23],
                    k_ary[24], k_ary[25], k_ary[26], k_ary[27], k_ary[28], k_ary[29], k_ary[30], k_ary[31],
                    k_ary[32], k_ary[33], k_ary[34], k_ary[35], k_ary[36], k_ary[37], k_ary[38], k_ary[39],
                    k_ary[40], k_ary[41], k_ary[42], k_ary[43], k_ary[44], k_ary[45], k_ary[46], k_ary[47],
                    k_ary[48], k_ary[49], k_ary[50], k_ary[51], k_ary[52], k_ary[53], k_ary[54], k_ary[55],
                    k_ary[56], k_ary[57], k_ary[58], k_ary[59], k_ary[60], k_ary[61], k_ary[62], k_ary[63]
                );
                k_ary_next = 0;
            }
            cx += 1;
        }
        cy += 1;
    }
    if k_ary_next > 0 {
        let offset: i32 = 4 * (ch * cw / K_ARY_SIZE as i32) * K_ARY_SIZE as i32;
        let k_ary_last = k_ary_next;
        k_ary_next = 0;
        while k_ary_next < k_ary_last {
            plot(img_data_id, offset + 4 * k_ary_next as i32, k_ary[k_ary_next]);
            k_ary_next += 1;
        }
    }

    throw_val(memory());
}
