import {
  Container,
  Filters,
  ProductsGroupList,
  TopBar,
} from "@/shared/components/shared";

import { findPizzas, GetSearchParams } from "@/shared/my-lib/find-pizzas";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas({
    ...searchParams,
  });
  return (
    <>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  categoryID={category.id}
                  items={category.products}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
