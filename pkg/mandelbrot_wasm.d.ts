/* tslint:disable */
/* eslint-disable */
/**
* @param {number} x0_h
* @param {number} x0_l
* @param {number} y0_h
* @param {number} y0_l
* @param {number} w_h
* @param {number} w_l
* @param {number} h_h
* @param {number} h_l
* @param {number} cw
* @param {number} ch
* @param {number} worker_id
* @param {number} n_workers
* @param {string} img_data_id
* @param {number} n_iterations
*/
export function draw(x0_h: number, x0_l: number, y0_h: number, y0_l: number, w_h: number, w_l: number, h_h: number, h_l: number, cw: number, ch: number, worker_id: number, n_workers: number, img_data_id: string, n_iterations: number): void;
/**
*/
export class Quad {
  free(): void;
/**
* @param {number} high
* @param {number} low
* @returns {Quad}
*/
  static new(high: number, low: number): Quad;
/**
* @param {number} value
* @returns {Quad}
*/
  static from_f64(value: number): Quad;
/**
* @returns {number}
*/
  to_f64(): number;
/**
* @returns {number}
*/
  high: number;
/**
* @returns {number}
*/
  low: number;
}
/**
*/
export class View {
  free(): void;
/**
* @param {Quad} x0
* @param {Quad} y0
* @param {Quad} w
* @param {Quad} h
* @returns {View}
*/
  static new(x0: Quad, y0: Quad, w: Quad, h: Quad): View;
/**
* @param {number} cx
* @param {number} cy
* @param {number} cw
* @param {number} ch
* @param {number} mul
*/
  zoom(cx: number, cy: number, cw: number, ch: number, mul: number): void;
/**
* @returns {Quad}
*/
  h: Quad;
/**
* @returns {Quad}
*/
  w: Quad;
/**
* @returns {Quad}
*/
  x0: Quad;
/**
* @returns {Quad}
*/
  y0: Quad;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_quad_free: (a: number) => void;
  readonly __wbg_get_quad_high: (a: number) => number;
  readonly __wbg_set_quad_high: (a: number, b: number) => void;
  readonly __wbg_get_quad_low: (a: number) => number;
  readonly __wbg_set_quad_low: (a: number, b: number) => void;
  readonly quad_from_f64: (a: number) => number;
  readonly quad_to_f64: (a: number) => number;
  readonly quad_new: (a: number, b: number) => number;
  readonly __wbg_view_free: (a: number) => void;
  readonly __wbg_get_view_x0: (a: number) => number;
  readonly __wbg_set_view_x0: (a: number, b: number) => void;
  readonly __wbg_get_view_y0: (a: number) => number;
  readonly __wbg_set_view_y0: (a: number, b: number) => void;
  readonly __wbg_get_view_w: (a: number) => number;
  readonly __wbg_set_view_w: (a: number, b: number) => void;
  readonly __wbg_get_view_h: (a: number) => number;
  readonly __wbg_set_view_h: (a: number, b: number) => void;
  readonly view_new: (a: number, b: number, c: number, d: number) => number;
  readonly view_zoom: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly draw: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
