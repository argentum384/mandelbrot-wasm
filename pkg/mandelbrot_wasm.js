import { plot } from './snippets/mandelbrot-wasm-07bef05e950f119e/js/plot.js';

let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachegetUint8ClampedMemory0 = null;
function getUint8ClampedMemory0() {
    if (cachegetUint8ClampedMemory0 === null || cachegetUint8ClampedMemory0.buffer !== wasm.memory.buffer) {
        cachegetUint8ClampedMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachegetUint8ClampedMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    return getUint8ClampedMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
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
export function draw(x0_h, x0_l, y0_h, y0_l, w_h, w_l, h_h, h_l, cw, ch, worker_id, n_workers, img_data_id, n_iterations) {
    var ptr0 = passStringToWasm0(img_data_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.draw(x0_h, x0_l, y0_h, y0_l, w_h, w_l, h_h, h_l, cw, ch, worker_id, n_workers, ptr0, len0, n_iterations);
}

/**
*/
export class Quad {

    static __wrap(ptr) {
        const obj = Object.create(Quad.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_quad_free(ptr);
    }
    /**
    * @returns {number}
    */
    get high() {
        var ret = wasm.__wbg_get_quad_high(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set high(arg0) {
        wasm.__wbg_set_quad_high(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get low() {
        var ret = wasm.__wbg_get_quad_low(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set low(arg0) {
        wasm.__wbg_set_quad_low(this.ptr, arg0);
    }
    /**
    * @param {number} high
    * @param {number} low
    * @returns {Quad}
    */
    static new(high, low) {
        var ret = wasm.quad_new(high, low);
        return Quad.__wrap(ret);
    }
    /**
    * @param {number} value
    * @returns {Quad}
    */
    static from_f64(value) {
        var ret = wasm.quad_from_f64(value);
        return Quad.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    to_f64() {
        const ptr = this.__destroy_into_raw();
        var ret = wasm.quad_to_f64(ptr);
        return ret;
    }
}
/**
*/
export class View {

    static __wrap(ptr) {
        const obj = Object.create(View.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_view_free(ptr);
    }
    /**
    * @returns {Quad}
    */
    get x0() {
        var ret = wasm.__wbg_get_view_x0(this.ptr);
        return Quad.__wrap(ret);
    }
    /**
    * @param {Quad} arg0
    */
    set x0(arg0) {
        _assertClass(arg0, Quad);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_view_x0(this.ptr, ptr0);
    }
    /**
    * @returns {Quad}
    */
    get y0() {
        var ret = wasm.__wbg_get_view_y0(this.ptr);
        return Quad.__wrap(ret);
    }
    /**
    * @param {Quad} arg0
    */
    set y0(arg0) {
        _assertClass(arg0, Quad);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_view_y0(this.ptr, ptr0);
    }
    /**
    * @returns {Quad}
    */
    get w() {
        var ret = wasm.__wbg_get_view_w(this.ptr);
        return Quad.__wrap(ret);
    }
    /**
    * @param {Quad} arg0
    */
    set w(arg0) {
        _assertClass(arg0, Quad);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_view_w(this.ptr, ptr0);
    }
    /**
    * @returns {Quad}
    */
    get h() {
        var ret = wasm.__wbg_get_view_h(this.ptr);
        return Quad.__wrap(ret);
    }
    /**
    * @param {Quad} arg0
    */
    set h(arg0) {
        _assertClass(arg0, Quad);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_view_h(this.ptr, ptr0);
    }
    /**
    * @param {Quad} x0
    * @param {Quad} y0
    * @param {Quad} w
    * @param {Quad} h
    * @returns {View}
    */
    static new(x0, y0, w, h) {
        _assertClass(x0, Quad);
        var ptr0 = x0.ptr;
        x0.ptr = 0;
        _assertClass(y0, Quad);
        var ptr1 = y0.ptr;
        y0.ptr = 0;
        _assertClass(w, Quad);
        var ptr2 = w.ptr;
        w.ptr = 0;
        _assertClass(h, Quad);
        var ptr3 = h.ptr;
        h.ptr = 0;
        var ret = wasm.view_new(ptr0, ptr1, ptr2, ptr3);
        return View.__wrap(ret);
    }
    /**
    * @param {number} cx
    * @param {number} cy
    * @param {number} cw
    * @param {number} ch
    * @param {number} mul
    */
    zoom(cx, cy, cw, ch, mul) {
        wasm.view_zoom(this.ptr, cx, cy, cw, ch, mul);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('mandelbrot_wasm_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_plot_f908d5d0e7e0a3a4 = function(arg0, arg1, arg2, arg3) {
        var v0 = getClampedArrayU8FromWasm0(arg2, arg3).slice();
        wasm.__wbindgen_free(arg2, arg3 * 1);
        plot(getStringFromWasm0(arg0, arg1), v0);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

