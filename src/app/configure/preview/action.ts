"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { FINISHES, MATERIALS } from "@/validators/option-validator"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Order } from "@prisma/client"

const getTotal = (finish: string, material: string, totalPrice: number) => {
  if (finish === FINISHES.options[0].value) totalPrice += PRODUCT_PRICES.finish.smooth
  if (finish === FINISHES.options[1].value) totalPrice += PRODUCT_PRICES.finish.textured
  if (material === MATERIALS.options[0].value) totalPrice += PRODUCT_PRICES.material.silicone
  if (material === MATERIALS.options[1].value) totalPrice += PRODUCT_PRICES.material.polycarbonate
  if (material === MATERIALS.options[2].value) totalPrice += PRODUCT_PRICES.material.leather
  return totalPrice
}

export const createCheckoutSession = async ({ configId }: { configId: string }) => {
  const config = await db.configuration.findUnique({
    where: { id: configId },
  })
  if (!config) throw new Error('No such configuration found')
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) throw new Error('You need to be logged in to create a checkout session')
  const { finish, material } = config
  let totalPrice: number = BASE_PRICE
  totalPrice = getTotal(finish!, material!, totalPrice)

  let order: (Order | undefined) = undefined
  const isOrdered = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: config.id,
    }
  })

  console.log(user.id, config.id);

  if (isOrdered) order = isOrdered
  else order = await db.order.create({
    data: {
      userId: user.id,
      amount: totalPrice / 100,
      configurationId: config.id,
    }
  })

  // $ it's amazing but Stripe has a way to do it similar to Prisma
  const product = await stripe.products.create({
    name: 'Custom iPhone Case',
    images: [config.imageUrl],
    default_price_data: {
      currency: 'usd',
      unit_amount: totalPrice,
    }
  })

  // TODO Let's create our actual payment session
  // * Very important to store the order id and user id into metadata
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${config.id}`,
    payment_method_types: ['card', 'alipay', 'amazon_pay', 'us_bank_account'],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'DE'],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{
      price: product.default_price as string, quantity: 1
    }]
  })

  // ? The URL to the Checkout Session. Redirect customers to this URL to take them to Checkout
  return {
    url: stripeSession.url
  }
}