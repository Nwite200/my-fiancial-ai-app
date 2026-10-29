import {
  incomeTotal,
  expenseTotal,
  netCashFlow,
  categoryBreakdown,
  budgetVariance,
  savingsProgress,
  recurringExpenses,
  convertAmount,
} from './calc';

describe('finance calc', () => {
  const txns = [
    { id: '1', amountMinor: 500000, currency: 'NGN', direction: 'credit' as const, category: 'salary', timestamp: 0 },
    { id: '2', amountMinor: 120000, currency: 'NGN', direction: 'debit' as const, category: 'food', merchant: 'Shoprite', timestamp: 0 },
    { id: '3', amountMinor: 30000, currency: 'NGN', direction: 'debit' as const, category: 'transport', merchant: 'Uber', timestamp: 0 },
    { id: '4', amountMinor: 200000, currency: 'NGN', direction: 'transfer' as const, category: 'transfer', timestamp: 0 },
    { id: '5', amountMinor: 10000, currency: 'NGN', direction: 'debit' as const, category: 'food', merchant: 'Shoprite', isRefund: true, timestamp: 0 },
  ];

  it('income total excludes transfers and refunds', () => {
    expect(incomeTotal(txns)).toBe(500000);
  });

  it('expense total handles refunds', () => {
    // 120000 + 30000 - 10000 = 140000
    expect(expenseTotal(txns)).toBe(140000);
  });

  it('net cash flow', () => {
    expect(netCashFlow(txns)).toBe(500000 - 140000);
  });

  it('category breakdown', () => {
    const b = categoryBreakdown(txns);
    expect(b.food).toBe(120000 - 10000);
    expect(b.transport).toBe(30000);
  });

  it('transfer not counted', () => {
    // total expenses should not include 200000 transfer
    expect(expenseTotal(txns)).toBeLessThan(200000);
  });

  it('budget variance', () => {
    expect(budgetVariance(140000, 100000)).toEqual({ variance: -40000, over: true });
    expect(budgetVariance(80000, 100000)).toEqual({ variance: 20000, over: false });
  });

  it('savings progress', () => {
    expect(savingsProgress(50000, 100000)).toBe(50);
    expect(savingsProgress(200000, 100000)).toBe(100);
  });

  it('recurring expenses', () => {
    const r = recurringExpenses(txns);
    expect(r.find((x) => x.merchant === 'shoprite')).toBeDefined();
  });

  it('currency conversion', () => {
    const rates = [{ from: 'NGN', to: 'USD', rate: 0.00065, asOf: 0 }];
    const res = convertAmount(100000, 'NGN', 'USD', rates);
    expect(res).not.toBeNull();
  });
});
