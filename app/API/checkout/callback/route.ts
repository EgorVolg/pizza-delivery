import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/servises/dto/cart.dto";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-templates/email-succeeded";
import { sendEmail } from "@/shared/my-lib/send-email";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json("Order not found", { status: 404 });
    }

    const isSuccess = body.object.status === "succeeded";
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSuccess ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];
    if (isSuccess) {
      await sendEmail(
        order.email,
        "Next Pizza / Ваш заказ успешно оформлен 🎉",
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    } else {
      await sendEmail(
        order.email,
        "Next Pizza / Ваш заказ не был оплачен",
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    }
  } catch (error) {
    console.log("[CHECKOUT CALLBACK] ERROR: ", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
