"use client";
import React, { useEffect } from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./chekbox-filters-group";
import { useIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import { search } from "@/servises/products";

type Props = {
  className?: string;
};

type PriceRange = {
  min?: number;
  max?: number;
};

interface FilterProps extends PriceRange {
  types?: string;
  sizes?: string;
  ingredients?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof FilterProps,
    string
  >;
  const [price, setPrice] = React.useState<PriceRange>({
    min: searchParams.get("min") ? Number(searchParams.get("min")) : 0,
    max: searchParams.get("max") ? Number(searchParams.get("max")) : 1000,
  });

  const { ingredients, loading, selectedPizzaParams, onAddId } = useIngredients(
    searchParams.get("ingredients")?.split(",")
  );

  const items = ingredients.map((item: { id: number; name: string }) => ({
    value: String(item.id),
    text: item.name,
  }));
  const [sizes, { toggle: onAddSizes }] = useSet<string>(
    searchParams.get("sizes")
      ? new Set(searchParams.get("sizes")?.split(","))
      : new Set([])
  );
  const [types, { toggle: onAddTypes }] = useSet(
    new Set<string>(
      searchParams.has("types") ? searchParams.get("types")?.split(",") : []
    )
  );

  useEffect(() => {
    const selectedQueryPizzaParams = {
      ...price,
      sizes: Array.from(sizes),
      types: Array.from(types),
      ingredients: Array.from(selectedPizzaParams),
    };
    const query = qs.stringify(selectedQueryPizzaParams, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, { scroll: false });
  }, [price, sizes, types, selectedPizzaParams, router]);

  const onChangePriceRange = (name: keyof PriceRange, values: number) => {
    setPrice({
      ...price,
      [name]: values,
    });
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <CheckboxFiltersGroup
        title="Тип Теста"
        name="types"
        className="mb-5"
        items={[
          { value: "1", text: "Тонкое" },
          { value: "2", text: "Традиционное" },
        ]}
        onClickCheckbox={onAddTypes}
        selectedPizzaParams={types}
      />
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        items={[
          { value: "20", text: "20 см" },
          { value: "30", text: "30 см" },
          { value: "40", text: "40 см" },
        ]}
        onClickCheckbox={onAddSizes}
        selectedPizzaParams={sizes}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            max={1000}
            min={0}
            value={price.min}
            onChange={(e) => onChangePriceRange("min", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            max={1000}
            min={0}
            value={price.max}
            onChange={(e) => onChangePriceRange("max", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.min || 0, price.max || 1000]}
          onValueChange={([min, max]) => setPrice({ min, max })}
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={5}
        defaultItem={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selectedPizzaParams={selectedPizzaParams}
      />
    </div>
  );
};
