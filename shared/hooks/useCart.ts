'use client'
import { useCartStore } from "@/store";
import { useEffect } from "react";
import { CartStateItem } from "../my-lib/get-cart-details";
import { CreateCartItemValues } from "@/servises/dto/cart.dto";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  fetchCartItems: () => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore();


  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
}