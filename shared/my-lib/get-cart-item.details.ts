import { mapPizzaType, PizzaSize, PizzaType } from "@/app/constans/pizza"
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  pizzaSize: PizzaSize,
  pizzaType: PizzaType,
  ingredients: CartStateItem["ingredients"]
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }
  return details.join(", ");
}