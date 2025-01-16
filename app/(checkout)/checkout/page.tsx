"use client";
import {
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { useCart } from "@/shared/hooks";
import { updateItemQuantity } from "@/servises/cart";
import { CheckoutSidebar } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckoutCart } from "@/shared/components/shared/checkout/checkout-cart";
import { CheckoutPersonalInfo } from "@/shared/components/shared/checkout/checkout-personal-info";

export default function Chekout() {
  const { totalAmount, items, fetchCartItems, removeCartItem } = useCart();

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    fetchCartItems();
    updateItemQuantity(id, newQuantity);
  };

  // const form = useForm({
  //   resolver: zodResolver(),
  //   defaultValues: {
  //     name: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     comment: "",
  //   },
  // });

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        <div className="flex flex-col flex-1 gap-10 mb-20">
          <CheckoutCart
            items={items}
            onClickCountButton={onClickCountButton}
            onClickRemoveItem={removeCartItem}
          />
          <CheckoutPersonalInfo />

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="Адрес" className="text-base" placeholder="Адрес" />
              <Textarea
                name="Комментарий"
                rows={5}
                className="text-base"
                placeholder="Комментарий"
              />
            </div>
          </WhiteBlock>
        </div>

        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
