import { Product } from "@prisma/client"
import { instance } from "./instance"
import { ApiRoutes } from "./constance"

export const search = async (query: string) => {
  const { data } = await instance.get<Product[]>(ApiRoutes.products, { params: { query } })
  return data
}