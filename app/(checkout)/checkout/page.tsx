"use client";
import {
  CheckoutItem,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { CheckoutsItemDetails } from "@/shared/components/shared/checkouts-item-details";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/my-lib";
import { PizzaSize, PizzaType } from "@/app/constans/pizza";
import { removeCartItem, updateItemQuantity } from "@/servises/cart";
import { useState } from "react";

export default function Chekout() {
  const { totalAmount, items, fetchCartItems } = useCart();
  const [redirect, setRedirect] = useState(false);

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    fetchCartItems();
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        <div className="flex flex-col flex-1 gap-10 mb-20">
          <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5 mb-5 pb-5">
              {items.map((item, index) => (
                <CheckoutItem
                  key={index}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.pizzaSize as PizzaSize,
                    item.pizzaType as PizzaType,
                    item.ingredients
                  )}
                  disabled={item.disabled}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) =>
                    onClickCountButton(type, item.id, item.quantity)
                  }
                  onClickRemoveItem={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="Имя" className="text-base" placeholder="Имя" />
              <Input
                name="Фамилия"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="Email" className="text-base" placeholder="Email" />
              <Input
                name="Телефон"
                className="text-base"
                placeholder="Телефон"
              />
            </div>
          </WhiteBlock>

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
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="h-11 text-[34px] font-bold">
                {totalAmount} ₽
              </span>
            </div>

            <CheckoutsItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Стоимость
                </div>
              }
              value={totalAmount}
            />
            <CheckoutsItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Налог
                </div>
              }
              value="5%"
            />
            <CheckoutsItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Доставка
                </div>
              }
              value="300 ₽"
            />
            <Button
              type="submit"
              disabled={redirect}
              onClick={() => setRedirect(true)}
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Оплатить
              <ArrowRight className="ml-2 w-5" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
