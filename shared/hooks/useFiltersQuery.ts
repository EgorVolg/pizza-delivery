"use client";
import { useEffect, useRef } from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "./useFilters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
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
    }
    
    isMounted.current = true;
  }, [filters]);
};
