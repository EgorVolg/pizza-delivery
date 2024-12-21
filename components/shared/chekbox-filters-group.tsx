'use client'
import React, { useState } from 'react'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input, Skeleton } from '../ui'

type Item = FilterCheckboxProps

type Props = {
    title: string,
    items: Item[],
    defaultItem: Item[],
    limit?: number,
    searchInpputPlaceholder?: string,
    loading?: boolean,
    onClickCheckbox?: (id: string) => void,
    selectedIds?: Set<string>,
    className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItem,
    limit = 5,
    loading,
    searchInpputPlaceholder = "Поиск",
    selectedIds,
    onClickCheckbox,
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

    if (loading) {
        return (
            <div className={className}>
                <p className='font-bold mb-3'>
                    {title}
                </p>
                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} className='mb-4 h-6 rounded-[8px]' />
                    ))}
                <Skeleton className='w-28 mb-4 h-6 rounded-[8px]' />
            </div>
        )
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

        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item) => (
                <FilterCheckbox
                    key={String(item.value)}
                    onCheckedChange={() => onClickCheckbox?.(item.value)}
                    name={item.name}
                    text={item.text}
                    value={item.value}
                    checked={selectedIds?.has(item.value)}
                    endAdornment={item.endAdornment}
                />
            ))}
        </div>
        {items.length > limit && (
            <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                    {showAll ? 'Скрыть' : '+ Показать все'}
                </button>
            </div>
        )}
    </div>
}