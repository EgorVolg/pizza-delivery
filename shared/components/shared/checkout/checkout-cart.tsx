import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/shared/my-lib"; 
import { CartStateItem } from "@/shared/my-lib/get-cart-details"; 
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { PizzaSize, PizzaType } from "@/app/constans/pizza";

type Props = {
  className?: string;
  loading?: boolean;
  items: CartStateItem[];
  onClickCountButton: (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => void;
  onClickRemoveItem: (id: number) => void;
};

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  onClickCountButton,
  onClickRemoveItem,
  loading,
}) => {
  return (
    <WhiteBlock className={className} title="1. Корзина">
      <div className="flex flex-col gap-5 mb-5 pb-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.pizzaSize as PizzaSize,
                  item.pizzaType as PizzaType,
                  item.ingredients
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
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
