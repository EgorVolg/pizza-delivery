import React from 'react';

type Props = {
  className?: string;
};

export const CartDrawerItem: React.FC<Props> = ({ className }) => {
  return (
   <div className={className}>CartDrawerItem</div>
  )
};
