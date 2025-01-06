"use client";
import { ProductWithRelations } from "@/@types/prisma";
import { ChooseProductForm, ChoosePizzaForm } from "@/shared/components/shared";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { useCartStore } from "@/store";

type Props = {
  className?: string;
  product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onSubmit = ({ productItemId, ingredients }: any) => {
    if (isPizzaForm) {
      addCartItem({
        productItemId,
        ingredients,
      });
    } else {
      addCartItem({
        productItemId: firstItem.id,
      });
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle className="display-none">Выбор продукта</DialogTitle>
      <DialogContent
        className={cn(
          "p-0 w-[1060] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
