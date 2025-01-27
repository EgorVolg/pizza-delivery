"use server";

import { log } from "console";
import { CheckoutFormValues } from "./constans/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";

export async function createOrder(data: CheckoutFormValues) {
    log(data)
    // await prisma.order.create({
    //     data: data
    // })
}
