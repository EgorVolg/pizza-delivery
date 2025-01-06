"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { useCartStore } from "@/store";
import { PizzaSize, PizzaType } from "@/app/constans/pizza";
import { getCartItemDetails } from "@/shared/my-lib";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [
    fetchCartItems,
    totalAmount,
    updateItemQuantity,
    removeCartItem,
    items,
  ] = useCartStore((state) => [
    state.fetchCartItems,
    state.totalAmount,
    state.updateItemQuantity,
    state.removeCartItem,
    state.items,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className=" -mx-6 mt-5 overflow-y-auto scrollbar flex-1">
          {items.map((item) => (
            <div className="mb-2">
              <CartDrawerItem
                id={item.id}
                quantity={item.quantity}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onClickCountButton={(type) =>
                  onClickCountButton(type, item.id, item.quantity)
                }
                onClickRemoveItem={() => removeCartItem(item.id)}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.pizzaSize as PizzaSize,
                        item.pizzaType as PizzaType,
                        item.ingredients
                      )
                    : ""
                }
              />
            </div>
          ))}
        </div>

        {/* <div className="flex flex-col items-center justify-center w-72 mx-auto">
          <Title
            size="sm"
            text="Корзина пустая"
            className="text-center font-bold my-2"
          />
          <p className="text-center text-neutral-500 mb-5">
            Добавьте хотя бы одну пиццу, чтобы совершить заказ
          </p> */}

        {/* <SheetClose>
            <Button className="w-56 h-12 text-base" size="lg">
              <ArrowLeft className="w-5 mr-2" />
              Вернуться назад
            </Button>
          </SheetClose>
        </div> */}

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/checkout">
              <Button className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
