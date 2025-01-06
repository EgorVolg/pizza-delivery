import { pizzaSizes, PizzaType } from "@/app/constans/pizza";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";


interface Item {
  items: ProductItem[];
  type: PizzaType
}

export const getAvaiblePizzaSizes = ({ items, type }: Item): Variant[] => {
  const filteredPizzaByType = items.filter((item) => item.pizzaType === type);
  const avaiblePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzaByType.find((pizza) => Number(pizza.size) === Number(item.value)),
  }));
  return avaiblePizzaSizes;
}