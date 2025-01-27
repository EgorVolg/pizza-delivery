"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "./constans/checkout-form-schema";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
  console.log(data);
  const token = "1111";
  await prisma.order.create({
    data: {
      token,
      totalAmount: 2334,
      status: OrderStatus.PENDING,
      items: [],
      fullName: data.name + "" + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
    },
  });
}
