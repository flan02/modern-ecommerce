import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return formatter.format(price)
}

type MetadataProps = {
  title?: string
  description?: string
  image?: string
  icons?: string
}

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://modern-ecommerce-two.vercel.app'

export default function constructMetadata({
  title = "starpurple | best phone cases",
  description = "Create your own phone case",
  image = "/thumbnail.png",
  icons = '/favicon.ico' }: MetadataProps): Metadata {
  return {
    metadataBase: new URL(url),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@flan02"
    },
    icons
  }
}