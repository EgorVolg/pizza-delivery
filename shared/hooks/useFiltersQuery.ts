'use client'
import { useEffect } from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "./useFilters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const queryStringParams = {
      ...filters.prices,
      types: Array.from(filters.types),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(queryStringParams, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, {
      scroll: false,
    });
  }, [filters]);
};
