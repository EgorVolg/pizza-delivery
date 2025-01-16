import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/shared/my-lib";
import { PizzaSize, PizzaType } from "@/app/constans/pizza"; 
import { CartStateItem } from "@/shared/my-lib/get-cart-details";

type Props = {
  className?: string;
  items: CartStateItem[];
  onClickCountButton: (type: "plus" | "minus", id: number, quantity: number) => void;
  onClickRemoveItem: (id: number) => void;
};

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  onClickCountButton,
  onClickRemoveItem
}) => {
  return (
    <WhiteBlock className={className} title="1. Корзина">
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
            onClickRemoveItem={() => onClickRemoveItem(item.id)}
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
