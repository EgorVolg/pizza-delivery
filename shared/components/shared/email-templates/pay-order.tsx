import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate = ({ orderId, totalAmount, paymentUrl }:Props) => (
  <div>
    <h1>Заказ #{orderId}</h1>

    <p>
      Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Перейдите&nbsp;
      <a href={paymentUrl}>по этой ссылке</a>&nbsp;для оплаты заказа.
    </p>
  </div>
);
