import Link from "next/link";
import React from "react";
import { Title } from "./title";

type Props = {
  name: string;
  imageUrl: string;
  price: number;
  id: number;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  id,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="h-[215px] w-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">{name}</p>

        {/* <div className='flex justify-between items-center mt-4'>
          <span className='text-[20px]'>
            от <b>{price? price : "price"}</b> руб.
          </span>
          <Button variant="secondary" className='text-base font-bold'>
            <Plus size={20} className='w-5 h-5 mr-1' />
            Добавить
          </Button>
        </div> */}
      </Link>
    </div>
  );
};
