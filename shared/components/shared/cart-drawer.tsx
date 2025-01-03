"use client";

import React from "react";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Title } from "./title";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center justify-center w-72 mx-auto">
          <Title
            size="sm"
            text="Корзина пустая"
            className="text-center font-bold my-2"
          />
          <p className="text-center text-neutral-500 mb-5">
            Добавьте хотя бы одну пиццу, чтобы совершить заказ
          </p>

          <SheetClose>
            <Button className="w-56 h-12 text-base" size="lg">
              <ArrowLeft className="w-5 mr-2" />
              Вернуться назад
            </Button>
          </SheetClose>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">400 ₽</span>
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
