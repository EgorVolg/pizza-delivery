
import { Ingredient, ProductItem } from '@prisma/client';
import { priceCounter } from './price-counter';
import { mapPizzaType, PizzaSize, PizzaType } from '@/app/constans/pizza';


export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = priceCounter(type, size, items, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetails };
};