import React from "react";
import { Container, GroupVariants, Title } from "@/components/shared";
import { ProductImage } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={40} />
      </div>
      <div className="w-[490px] bg-[#ebebeb4a] p-7">
        <Title text={product.name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
          molestiae officia assumenda, voluptates labore iure sapiente
          laboriosam, neque dolore non repellat asperiores unde eos voluptas
          tenetur aliquam illum atque saepe!
        </p>
        <GroupVariants
          value="1"
          items={[
            { name: "Маленькая", value: "1" },
            { name: "Средняя", value: "2" },
            { name: "Большая", value: "3" },
          ]}
        />
      </div>
    </Container>
  );
}
