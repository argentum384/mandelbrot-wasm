use wasm_bindgen::prelude::*;
use std::ops::{Add, Sub, Mul, Div, Neg};

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Quad {
    pub high: f64,
    pub low: f64
}

#[wasm_bindgen]
impl Quad {
    pub fn new(high: f64, low: f64) -> Quad {
        Quad { high, low }
    }

    pub fn from_f64(value: f64) -> Quad {
        Quad { high: value, low: 0.0 }
    }

    pub fn to_f64(self) -> f64 {
        self.high + self.low
    }
}

impl Add<Quad> for Quad {
    type Output = Self;
    fn add(self, other: Self) -> Quad {
        let sh = self.high + other.high;
        let v = sh - self.high;
        let mut eh = (self.high - (sh - v)) + (other.high - v);
        eh += self.low + other.low;
        let high = sh + eh;
        let low = eh - (high - sh);
        Quad { high, low }
    }
}

impl Add<f64> for Quad {
    type Output = Self;
    fn add(self, other: f64) -> Quad {
        Quad { high: self.high + other, low: self.low }
    }
}

impl Add<Quad> for f64 {
    type Output = Quad;
    fn add(self, other: Quad) -> Quad {
        Quad { high: self + other.high, low: other.low }
    }
}

impl Sub<Quad> for Quad {
    type Output = Self;
    fn sub(self, other: Self) -> Quad {
        self + (-other)
    }
}

impl Sub<f64> for Quad {
    type Output = Self;
    fn sub(self, other: f64) -> Quad {
        self + (-other)
    }
}

impl Sub<Quad> for f64 {
    type Output = Quad;
    fn sub(self, other: Quad) -> Quad {
        self + (-other)
    }
}

impl Mul<Quad> for Quad {
    type Output = Self;
    fn mul(self, other: Self) -> Quad {
        let mut high = self.high * other.high;
        let u1 = 134217729.0 * self.high;
        let p1 = u1 - (u1 - self.high);
        let p2 = self.high - p1;
        let u2 = 134217729.0 * other.high;
        let r1 = u2 - (u2 - other.high);
        let r2 = other.high - r1;
        let mut low = ((p1 * r1 - high) + p1 * r2 + p2 * r1) + p2 * r2;
        low += self.high * other.low + self.low * other.high;
        let s1 = high + low;
        low -= s1 - high;
        high = s1;
        Quad { high, low }
    }
}

impl Mul<f64> for Quad {
    type Output = Self;
    fn mul(self, other: f64) -> Quad {
        Quad { high: self.high * other, low: self.low * other }
    }
}

impl Mul<Quad> for f64 {
    type Output = Quad;
    fn mul(self, other: Quad) -> Quad {
        Quad { high: self * other.high, low: self * other.low }
    }
}

impl Div<f64> for Quad {
    type Output = Self;
    fn div(self, other: f64) -> Quad {
        Quad { high: self.high / other, low: self.low / other }
    }
}


impl Neg for Quad {
    type Output = Self;
    fn neg(self) -> Quad {
        Quad { high: -self.high, low: -self.low }
    }
}
