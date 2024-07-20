import { ShippingAddress } from "@prisma/client"


type Props = {
  shippingAddress: ShippingAddress
}

const OrderReceivedEmail = ({ shippingAddress }: Props) => {
  return (
    <div>OrderReceivedEmail</div>
  )
}

export default OrderReceivedEmail