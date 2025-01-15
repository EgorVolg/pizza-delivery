'use client'
import { PizzaSize, PizzaType } from "@/app/constans/pizza"
import { useEffect, useState } from "react"
import { useSet } from "react-use"
import { ProductItem } from "@prisma/client"
import { getAvaiblePizzaSizes } from "@/shared/my-lib/get-avaible-pizza-sizes"
import { Variant } from "@/shared/components/shared/group-variants"

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
  const availableSizes = getAvaiblePizzaSizes({ type, items });
  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    currentItemId,
    addIngredient,
    availableSizes,
  }
}