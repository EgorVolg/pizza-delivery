import { prisma } from "@/prisma/prisma-client";
import { CreateCartItemValues } from "@/servises/dto/cart.dto";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/my-lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) return NextResponse.json({ totalAmount: 0, items: [] })

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token
          }
        ]
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'asc'
          },
          include: {
            productItem: {
              include: {
                product: true
              }
            },
            ingredients: true
          }
        }
      }
    })
    return NextResponse.json(userCart)

  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const cart = await findOrCreateCart(token)
    const data = (await req.json()) as CreateCartItemValues
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients
            }
          }
        },
      },
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      })
      const updatedUserCart = await updateCartTotalAmount(token)

      return NextResponse.json(updatedUserCart)
    }
  } catch (error) {
    return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500 })
  }
}
