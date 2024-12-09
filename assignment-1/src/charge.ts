export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type PaymentType = 'CASH' | 'COUPON';

export type Payment = {
  type:PaymentType;
  percentage?: number;
  amount?: number;
};



export function charge(invoice: Invoice, payments: Payment[]):Receipt {
  const total = invoice.total;
   //商品券から先に処理するために並び替え
   const sortedPayments = [...payments].sort((payment) => (payment.type === 'COUPON' ? -1 : 1));
   //お会計処理
    const deposit = sortedPayments.reduce((deposit, payment) => {
      if (payment.type === 'COUPON') {
        const couponValue = payment.percentage
          ? Math.floor(total * (payment.percentage / 100))
          : payment.amount || 0;
        return deposit + couponValue;
      }
      if (deposit >= total) {
        throw new Error('OverCharge');
      }
      return deposit + (payment.amount || 0);
    }, 0);
  if (total > deposit) {
    throw new Error('Shortage');
  }

  let isCoupon = payments.every(payment => payment.type === 'COUPON');
  return isCoupon
  ? { total, deposit, change: 0 }
  : { total, deposit, change: deposit - total };
}
