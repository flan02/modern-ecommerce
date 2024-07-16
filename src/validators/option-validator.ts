// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-purple-950 border-purple-950
// bg-green-950 border-green-950

import { PRODUCT_PRICES } from "@/config/products"

export const COLORS = [
  { label: "Black", value: "black", tw: 'zinc-900' },
  { label: "Blue", value: "blue", tw: 'blue-950' },
  { label: "Purple", value: "purple", tw: 'purple-950' },
  { label: "Green", value: "green", tw: 'green-950' },
] as const // ? readonly array of objects

export const MODELS = {
  name: "models",
  options: [
    { label: "iPhone 12", value: "iphone12" },
    { label: "iPhone 13", value: "iphone13" },
    { label: "iPhone 14", value: "iphone14" },
    { label: "iPhone 15", value: "iphone15" },
    { label: "iPhone X", value: "iphonex" }
  ]
} as const // ? readonly object

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      desc: undefined,
      price: PRODUCT_PRICES.material.silicone
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      desc: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate
    },
    {
      label: "Leather",
      value: "leather",
      desc: undefined,
      price: PRODUCT_PRICES.material.leather
    }
  ]
} as const // ? readonly object

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth",
      value: "smooth",
      desc: undefined,
      price: PRODUCT_PRICES.finish.smooth
    },
    {
      label: "Textured",
      value: "textured",
      desc: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.textured
    }
  ]
} as const // ? readonly object
