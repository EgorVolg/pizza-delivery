"use client";
import { Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { updateItemQuantity } from "@/servises/cart";
import { CheckoutSidebar } from "@/shared/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CheckoutCart } from "@/shared/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/shared/components/shared/checkout/checkout-personal-form";
import { CheckoutAddressForm } from "@/shared/components/shared/checkout/checkout-address-form";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/app/constans/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { prisma } from "@/prisma/prisma-client";
import { useState } from "react";

export default function Chekout() {
  const { totalAmount, items, fetchCartItems, removeCartItem, loading } =
    useCart();
  const [submitting, setSubmitting] = useState(false);

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
    fetchCartItems();
  };

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    const url = await createOrder(data);

    try {
      setSubmitting(true);
      toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    }
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col flex-1 gap-10 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                onClickRemoveItem={removeCartItem}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={loading ? "opacity-50 pointer-events-none" : ""}
              />
              <CheckoutAddressForm
                className={loading ? "opacity-50 pointer-events-none" : ""}
              />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
