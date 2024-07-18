"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { db } from "@/db"
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

  if (isOrdered) order = isOrdered
  else order = await db.order.create({
    data: {
      userId: user.id,
      amount: totalPrice / 100,
      configurationId: config.id,
    }
  })

}