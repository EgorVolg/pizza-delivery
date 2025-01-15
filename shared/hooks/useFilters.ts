'use client'
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceProps {
  min?: number;
  max?: number;
}

interface QueryFilters extends PriceProps {
  types: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  types: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [types, { toggle: toggletypes }] = useSet(
    new Set<string>(
      searchParams.has("types") ? searchParams.get("types")?.split(",") : []
    )
  );

  const [prices, setPrices] = useState<PriceProps>({
    min: Number(searchParams.get("min")) || undefined,
    max: Number(searchParams.get("max")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      sizes,
      types,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setTypes: toggletypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, types, selectedIngredients, prices]
  );
};
