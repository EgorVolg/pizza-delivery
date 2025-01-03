"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { ChooseProductForm, ChoosePizzaForm } from "@/shared/components/shared";

import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";


type Props = {
  className?: string;
  product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);
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
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
