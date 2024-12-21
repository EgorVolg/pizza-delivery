import React, { useState } from 'react';
import { Api } from '@/servises/api-client';
import { Ingredient } from '@prisma/client';
import { useSet } from 'react-use';

interface Props {
  ingredients: Ingredient[];
  loading: boolean;
  selectedPizzaParams: Set<string>;
  onAddId: (id: string) => void;
}

export const useIngredients = (): Props => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPizzaParams, { toggle }] = useSet<string>(new Set([]));


  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
    onAddId: toggle,
    selectedPizzaParams
  };
};