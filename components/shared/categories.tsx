'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import Link from "next/link";


type Props = {
  className?: string;
};

const categories = [
  { id: 1, name: "Пиццы" },
  { id: 2, name: "Завтрак" },
  { id: 3, name: "Комбо" },
  { id: 4, name: "Закуски" },
  { id: 5, name: "Коктейли" },
  { id: 6, name: "Напитки" },
  { id: 7, name: "Кофе" },
  { id: 8, name: "Десерты" }
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveID = useCategoryStore((state) => state.activeID)
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((category, index) => (
        <Link
          className={cn("flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveID === category.id && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
          href={`/#${category.name} `}>
          <button>{category.name}</button>
        </Link>
      ))}
    </div>
  );
};