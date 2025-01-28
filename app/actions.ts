"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "./constans/checkout-form-schema";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { sendEmail } from "@/shared/my-lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { createPayment } from "@/shared/my-lib/create-payment";
import { error } from "console";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) throw new Error("Cart token not found");

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.name + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      description: "Next Pizza / Оплатите заказ #" + order.id,
      orderId: order.id,
      amount: order.totalAmount,
    });

    if (!paymentData) throw new Error("Payment failed");

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentData.confirmation.confirmation_url,
      })
    );
  } catch (error) {
    console.log("[createOrder] error", error);
  }
}
