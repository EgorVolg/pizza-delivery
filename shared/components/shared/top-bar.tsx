import React from "react";
import { cn } from "@/lib/utils";

import { Categories } from "./categories";
import { Container } from "./container";
import { Popup } from "./sort-popup";
import { Category } from "@prisma/client";

type Props = {
  className?: string;
  categories: Category[];
};

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories categories={categories} />
        <Popup />
      </Container>
    </div>
  );
};
