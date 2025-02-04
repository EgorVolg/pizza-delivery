import * as React from "react";

interface PayOrderTemplate {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate = (params: PayOrderTemplate) => (
  <div>
    <h1>
      Заказ №{params.orderId} на сумму {params.totalAmount} готов к оплате!
    </h1> 
    <a href={params.paymentUrl}>Оплатить</a>
  </div>
);
