'use client'
import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./chekbox-filters-group";
import { useIngredients } from "@/hooks/useFilterIngredients";

type Props = {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading, selectedIds, onAddId } = useIngredients()
    const items = ingredients.map((item: { id: number, name: string }) => ({ value: String(item.id), text: item.name }))

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" max={1000} min={0} defaultValue={0} />
                    <Input type="number" placeholder="3000" max={1000} min={100} />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
            </div>
            <CheckboxFiltersGroup
                title="Ингредиенты"
                className="mt-5"
                limit={5}
                defaultItem={items.slice(1, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selectedIds={selectedIds}
            />
        </div>
    )
}