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
import toast from "react-hot-toast";

type Props = {
  className?: string;
  product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success("Товар добавлен в корзину");
      router.back();

      await addCartItem({
        productItemId: firstItem.id,
      });
      toast.success(product.name + "в корзине!");
      router.back();
    } catch (error) {
      toast.error("Произошла ошибка");
      console.error(error);
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
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
