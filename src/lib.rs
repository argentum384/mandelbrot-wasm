extern crate wasm_bindgen;

mod quad;

use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use quad::Quad;

const COLOR_TABLE: [[u8; 3]; 48] = [
    [255,   0,   0], [255,  31,   0], [255,  63,   0], [255,  95,   0],
    [255, 127,   0], [255, 159,   0], [255, 191,   0], [255, 223,   0],
    [255, 255,   0], [223, 255,   0], [191, 255,   0], [159, 255,   0],
    [127, 255,   0], [ 95, 255,   0], [ 63, 255,   0], [ 31, 255,   0],
    [  0, 255,   0], [  0, 255,  31], [  0, 255,  63], [  0, 255,  95],
    [  0, 255, 127], [  0, 255, 159], [  0, 255, 191], [  0, 255, 223],
    [  0, 255, 255], [  0, 223, 255], [  0, 191, 255], [  0, 159, 255],
    [  0, 127, 255], [  0,  95, 255], [  0,  63, 255], [  0,  31, 255],
    [  0,   0, 255], [ 31,   0, 255], [ 63,   0, 255], [ 95,   0, 255],
    [127,   0, 255], [159,   0, 255], [191,   0, 255], [223,   0, 255],
    [255,   0, 254], [255,   0, 223], [255,   0, 191], [255,   0, 159],
    [255,   0, 127], [255,   0,  95], [255,   0,  63], [255,   0,  31]
];

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
    pub fn plot(img_data_id: &str, data: Clamped<Vec<u8>>);
}

#[wasm_bindgen]
pub fn draw(
    x0_h: f64, x0_l: f64,
    y0_h: f64, y0_l: f64,
    w_h: f64, w_l: f64,
    h_h: f64, h_l: f64,
    cw: u32,
    ch: u32,
    worker_id: f64,
    n_workers: f64,
    img_data_id: &str,
    n_iterations: u32
) {
    let x0 = Quad::new(x0_h, x0_l);
    let y0 = Quad::new(y0_h, y0_l) + Quad::new(h_h, h_l) * (worker_id / n_workers);
    let w = Quad::new(w_h, w_l);
    let h = Quad::new(h_h, h_l) / n_workers;

    // Pixel data array (r, g, b, a, r, g, b, a, ...)
    let mut data: Clamped<Vec<u8>> = Clamped(vec![255; 4 * (cw * ch) as usize]);

    let mut cy: u32 = 0;
    let mut o: usize = 0; // Offset of pixel data array
    while cy < ch {
        let y = h * (cy as f64 / ch as f64) + y0;
        let mut cx: u32 = 0;
        while cx < cw {
            let x = w * (cx as f64 / cw as f64) + x0;
            let mut a = Quad::from_f64(0.0);
            let mut b = Quad::from_f64(0.0);
            let mut k: u32 = 0;
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
                    break;
                }
                k += 1;
            }

            if k >= n_iterations {
                data[o    ] = 0;
                data[o + 1] = 0;
                data[o + 2] = 0;
            } else {
                data[o    ] = COLOR_TABLE[k as usize % COLOR_TABLE.len()][0];
                data[o + 1] = COLOR_TABLE[k as usize % COLOR_TABLE.len()][1];
                data[o + 2] = COLOR_TABLE[k as usize % COLOR_TABLE.len()][2];
            }
            o += 4;

            cx += 1;
        }
        cy += 1;
    }

    plot(img_data_id, data);
}
