"use client";
import { cn } from "@/lib/utils";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  className?: string;
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemoveItem?: () => void;
}

export const CartDrawerItem: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  details,
  price,
  quantity,
  disabled,
  onClickCountButton,
  onClickRemoveItem,
}) => {
  return (
    <div
      className={cn(
        className,
        { "opacity-50 pointer-events-none": disabled },
        "flex bg-white p-5 gap-6"
      )}
    >
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="my-3" />
        <div className="flex justify-between items-center">
          <CountButton onClick={onClickCountButton} value={quantity} />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />

            <Trash2Icon
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              size={16}
              onClick={onClickRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
