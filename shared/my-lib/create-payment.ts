import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface CreatePaymentProps {
  description: string;
  orderId: number;
  amount: number;
}

export const createPayment = async (details: CreatePaymentProps) => {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payment",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: "http://localhost:3000/",
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_API_KEY as string,
        password: "",
      },
      headers: {
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    }
  );
  return data;
};
