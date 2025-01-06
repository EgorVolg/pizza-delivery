import { CartItemDTO } from "@/servises/dto/cart.dto";

export const calcCartItemsTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, curr) => acc + curr.price, 0)
  return (item.productItem.price + ingredientsPrice) * item.quantity
}