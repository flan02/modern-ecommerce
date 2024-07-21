import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
import { db } from "@/db";
import { resend } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text() // ? Stripe sends the webhook payload as a string
    const signature = headers().get("stripe-signature")
    if (!signature) {
      return NextResponse.json({
        message: 'Invalid signature',
        status: 400
      })
    }
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    if (event.type === 'checkout.session.completed') {
      // ? Do something
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }
      const session = event.data.object as Stripe.Checkout.Session

      // ! Remember that metadata was defined when we create the stripe checkout session
      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }

      const billingAddress = session.customer_details!.address
      const shippingAddress = session.shipping_details!.address

      const updatedOrder = await db.order.update({
        where: {
          id: orderId
        },
        data: {
          isPaid: true,
          ShippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state!
            }
          },
          BillingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state!
            }
          }
        }
      })

      // TODO Send email to user
      await resend.emails.send({
        from: "starpurple <chanivetdan@hotmail.com>",
        to: [event.data.object.customer_details.email],
        subject: "Thanks for your order!",
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          // ! @ts-ignore
          shippingAddress: {
            id: orderId,
            phone: "",
            name: session.customer_details!.name!,
            city: shippingAddress!.city!,
            country: shippingAddress!.country!,
            postalCode: shippingAddress!.postal_code!,
            street: shippingAddress!.line1!,
            state: shippingAddress!.state!
          }
        })
      })
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (error) {
    console.log(error);
    // ! send this to sentry to monitoring errors. Only for enterprise context
    return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 })
  }
}