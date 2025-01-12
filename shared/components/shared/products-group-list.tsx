"use client";
import React, { useEffect, useRef } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "@/@types/prisma";

type Props = {
  title: string;
  items: ProductWithRelations[];
  categoryID: number;
  listClassName?: string;
  className?: string;
};

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryID,
  listClassName,
  className,
}) => {
  const setActiveCategoryID = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryID(categoryID);
    }
  }, [intersection?.isIntersecting, title, categoryID]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, index: number) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
