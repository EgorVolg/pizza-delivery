'use client'
import React, { useState } from 'react'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input } from '../ui'

type Item = FilterCheckboxProps

type Props = {
    title: string,
    items: Item[],
    defaultItem: Item[],
    limit?: number,
    searchInpputPlaceholder?: string,
    onChange?: (values: string[]) => void,
    defaultValue: string[],
    className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItem,
    limit = 5,
    searchInpputPlaceholder = "Поиск",
    onChange,
    defaultValue,
    className
}) => {
    const [showAll, setShowAll] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : defaultItem?.slice(0, limit)
    const onChangeSearchInput = (value: string) => {
        setSearchValue(value)
    }

    return <div className={className}>
        <p className='font-bold mb-3'>
            {title}
        </p>

        {showAll && (
            <div className='mb-5'>
                <Input onChange={e => onChangeSearchInput(e.target.value)} placeholder={searchInpputPlaceholder} className="bg-gray-50 border-none" />
            </div>
        )}

        <div className="flex flex-col gap-4 max-h-96 pr-2 owerflow-auto scrollbar">
            {list.map((item, index) => (
                <FilterCheckbox
                    key={String(item.value)}
                    // onCheckedChange={() => onChackedChange(item.value)}
                    onCheckedChange={() => console.log("onChackedChange")}
                    name={item.name}
                    text={item.text}
                    value={item.value}
                    // checked={selected.has(item.value)}
                    checked={false}
                    endAdornment={item.endAdornment}
                />
            ))}
        </div>
        {items.length > limit && (
            <div className={showAll ? 'border-t border-t-neutral-100 nt-4' : ''}>
                <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                    {showAll ? 'Скрыть' : '+ Показать все'}
                </button>
            </div>
        )}
    </div>
}