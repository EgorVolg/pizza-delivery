'use client'
import React, { useEffect, useRef } from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/store/category'

type item = { id: number; name: string; imageUrl: string; price: number; categoryID: number }

type Props = {
  title: string,
  items: item[],
  categoryID: number,
  listClassName?: string,
  className?: string
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryID, listClassName, className }) => {
  const setActiveCategoryID = useCategoryStore((state) => state.setActiveID)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryID(categoryID)
    }
  }, [intersection?.isIntersecting, title, categoryID])



  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((item, index) => (
          <ProductCard key={index} id={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} />
        ))}
      </div>
    </div>
  )
}