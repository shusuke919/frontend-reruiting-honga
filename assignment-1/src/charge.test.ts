import { charge, Invoice, Payment, Receipt } from './charge';

describe('charge 関数のテスト', () => {
  test('正常ケース: 現金のみの支払い', () => {
    const invoice: Invoice = { total: 1000 };
    const payments: Payment[] = [{ type: 'CASH', amount: 1500 }];
    const expectedReceipt: Receipt = { total: 1000, deposit: 1500, change: 500 };

    const result = charge(invoice, payments);
    expect(result).toEqual(expectedReceipt);
  });

  test('正常ケース: 商品券のみの支払い', () => {
    const invoice: Invoice = { total: 1000 };
    const payments: Payment[] = [{ type: 'COUPON', percentage: 100 }];
    const expectedReceipt: Receipt = { total: 1000, deposit: 1000, change: 0 };

    const result = charge(invoice, payments);
    expect(result).toEqual(expectedReceipt);
  });

  test('正常ケース: 現金と商品券の混合支払い', () => {
    const invoice: Invoice = { total: 1000 };
    const payments: Payment[] = [
      { type: 'COUPON', percentage: 50 },
      { type: 'CASH', amount: 600 },
    ];
    const expectedReceipt: Receipt = { total: 1000, deposit: 1100, change: 100 };

    const result = charge(invoice, payments);
    expect(result).toEqual(expectedReceipt);
  });

  test('エラーケース: 支払い金額が不足している場合', () => {
    const invoice: Invoice = { total: 1000 };
    const payments: Payment[] = [{ type: 'CASH', amount: 500 }];

    expect(() => charge(invoice, payments)).toThrowError('Shortage');
  });

  test('エラーケース: 支払い金額が超過している場合', () => {
    const invoice: Invoice = { total: 1000 };
    const payments: Payment[] = [
      { type: 'COUPON', percentage: 50 },
      { type: 'CASH', amount: 600 },
      { type: 'CASH', amount: 500 },
    ];

    expect(() => charge(invoice, payments)).toThrowError('OverCharge');
  });

  test('正常ケース: 支払いがすべて商品券で、余りがない場合', () => {
    const invoice: Invoice = { total: 1200 };
    const payments: Payment[] = [
      { type: 'COUPON', percentage: 50 },
      { type: 'COUPON', percentage: 50 },
    ];
    const expectedReceipt: Receipt = { total: 1200, deposit: 1200, change: 0 };

    const result = charge(invoice, payments);
    expect(result).toEqual(expectedReceipt);
  });
});
