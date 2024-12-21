import { Ingredient } from "@prisma/client"
import { ApiRoutes } from "./constance"
import { instance } from "./instance"

export const getAll = async () => {
  const { data } = await instance.get<Ingredient[]>(ApiRoutes.ingredients)
  return data 
}