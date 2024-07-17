export const PRODUCT_PRICES = {
  material: {
    silicone: 0,
    polycarbonate: 5_00,
    leather: 10_00
  },
  finish: {
    smooth: 0,
    textured: 3_00
  }
} as const // ? readonly object

export const BASE_PRICE = 14_00