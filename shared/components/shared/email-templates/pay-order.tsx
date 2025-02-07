import * as React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate = ({
  orderId,
  totalAmount,
  paymentUrl,
}: Props) => (
  <div>
    <h1>
      Заказ №{orderId} на сумму {totalAmount} готов к оплате!
    </h1>
    <a href={paymentUrl}>Оплатить</a>
  </div>
);
