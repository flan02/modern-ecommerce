"use server"
import { db } from "@/db"
import { OrderStatus } from "@prisma/client"

type Props = {
  id: string
  newOrderStatus: OrderStatus
}

export const changeOrderStatus = async ({ id, newOrderStatus }: Props) => {
  // console.log('running server...');
  await db.order.update({
    where: { id },
    data: { status: newOrderStatus }
  })
}