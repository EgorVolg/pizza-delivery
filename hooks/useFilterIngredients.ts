import React, { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { useSet } from "react-use";

interface Props {
  selectedPizzaParams: Set<string>;
  onAddId: (id: string) => void;
}

export const useIngredients = (values: string[] = []): Props => {
 

  return {
    onAddId: toggle,
    selectedPizzaParams,
  };
};
