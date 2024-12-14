'use client'
import { cn } from '@/lib/utils'
import { Api } from '@/servises/api-client'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

type Props = {
  className?: string

}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  const clickRef = useRef(null)
  useClickAway(clickRef, () => {
    setFocused(false)
  });

  useEffect(() => {
    Api.products.search(searchQuery)
      .then(items => setProducts(items))
  }, [searchQuery])


  return (
    <>
      {focused && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30 ' />}

      <div ref={clickRef} className={cn('flex rounded-2xl flex-1 justify-beetween relative h-11 z-30', className)}>
        <Search className='absolute top-1/2 left-3 translate-y-[-50%] h-5  text-gray-400' />
        <input
          className="w-full rounded-2xl outline-none pl-11 bg-gray-100"
          type='text'
          placeholder="Поиск..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={cn('absolute w-full bg-white top-14 py-2 rounded-xl shadow-mn transition-all duration-200 invisible opacity-0 z-30',
          focused && 'visible opacity-100 top-12'
        )}>
          {
            products.map(product => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer'>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className='rounded-sm h-8 w-8' />
                <span>
                  {product.name}
                </span>
              </Link>
            ))
          }
        </div>
      </div>
    </>

  )
}