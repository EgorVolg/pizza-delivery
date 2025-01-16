"use client";
import React, { useState } from "react";
import { WhiteBlock } from "./white-block";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui";
import { cn } from "@/lib/utils";
import { CheckoutsItemDetails } from "./checkouts-item-details";

type Props = {
  className?: string;
  totalAmount: number;
};

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalAmount,
}) => {
  const [redirect, setRedirect] = useState(false);

  const VAT = 15;
  const DELIVERY_PRICE = 500;
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="h-11 text-[34px] font-bold">{totalPrice} ₽</span>
      </div>

      <CheckoutsItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины
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
        value={` ${vatPrice} ₽`}
      />
      <CheckoutsItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка
          </div>
        }
        value={` ${DELIVERY_PRICE} ₽`}
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
  );
};
