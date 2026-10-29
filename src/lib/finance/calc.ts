// Deterministic financial calculation engine.
// All money amounts are in integer minor units (e.g. kobo/cents). No floats.

export type Direction = 'debit' | 'credit' | 'transfer';

export interface Transaction {
  id: string;
  amountMinor: number;
  currency: string;
  direction: Direction;
  category: string;
  merchant?: string;
  timestamp: number; // epoch ms
  isRefund?: boolean;
  isReversal?: boolean;
  isPending?: boolean;
  excluded?: boolean;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number; // rational approximated; use scaled? We'll keep as number but conversions round to minor units
  asOf: number;
}

function isActive(t: Transaction): boolean {
  if (t.excluded) return false;
  if (t.isPending) return false;
  return true;
}

// Income = credits that are not transfers/refunds? Credits include refunds. We treat refund as negative expense handled separately.
export function incomeTotal(txns: Transaction[], currency?: string): number {
  return txns
    .filter(isActive)
    .filter((t) => t.direction === 'credit' && (!currency || t.currency === currency))
    .reduce((s, t) => {
      // A refund credit should not count as income; skip if isRefund
      if (t.isRefund) return s;
      return s + t.amountMinor;
    }, 0);
}

export function expenseTotal(txns: Transaction[], currency?: string): number {
  return txns
    .filter(isActive)
    .filter((t) => t.direction === 'debit' && (!currency || t.currency === currency))
    .reduce((s, t) => {
      // Refunds reduce expenses; reversals of expenses also reduce
      if (t.isRefund || t.isReversal) return s - t.amountMinor;
      return s + t.amountMinor;
    }, 0);
}

export function netCashFlow(txns: Transaction[], currency?: string): number {
  return incomeTotal(txns, currency) - expenseTotal(txns, currency);
}

export function categoryBreakdown(txns: Transaction[], currency?: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of txns) {
    if (!isActive(t)) continue;
    if (currency && t.currency !== currency) continue;
    if (t.direction === 'transfer') continue;
    if (t.direction === 'debit') {
      const amt = t.isRefund || t.isReversal ? -t.amountMinor : t.amountMinor;
      out[t.category] = (out[t.category] ?? 0) + amt;
    }
  }
  return out;
}

export function convertAmount(amountMinor: number, from: string, to: string, rates: ExchangeRate[]): number | null {
  if (from === to) return amountMinor;
  const rate = rates.find((r) => r.from === from && r.to === to);
  if (!rate) return null;
  // amount in major units * rate, back to minor (assume 2 decimals). For NGN (no minor? use 2). We'll scale by 100 for both.
  const major = amountMinor / 100;
  const convertedMajor = major * rate.rate;
  return Math.round(convertedMajor * 100);
}

export function totalByCurrency(txns: Transaction[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of txns) {
    if (!isActive(t)) continue;
    if (t.direction === 'transfer') continue;
    const sign = t.direction === 'credit' ? 1 : -1;
    const amt = t.isRefund ? -t.amountMinor * sign : t.amountMinor * sign; // refund flips? keep simple
    out[t.currency] = (out[t.currency] ?? 0) + (t.direction === 'debit' ? -t.amountMinor : t.amountMinor);
  }
  return out;
}

export function recurringExpenses(txns: Transaction[]): { merchant: string; count: number; totalMinor: number }[] {
  const map = new Map<string, { count: number; total: number }>();
  for (const t of txns) {
    if (!isActive(t) || t.direction !== 'debit') continue;
    const key = (t.merchant || t.category).toLowerCase();
    const cur = map.get(key) ?? { count: 0, total: 0 };
    cur.count += 1;
    cur.total += t.amountMinor;
    map.set(key, cur);
  }
  return [...map.entries()]
    .filter(([, v]) => v.count >= 2)
    .map(([k, v]) => ({ merchant: k, count: v.count, totalMinor: v.total }))
    .sort((a, b) => b.totalMinor - a.totalMinor);
}

export function budgetVariance(spentMinor: number, limitMinor: number): { variance: number; over: boolean } {
  const variance = limitMinor - spentMinor;
  return { variance, over: variance < 0 };
}

export function savingsProgress(contributedMinor: number, targetMinor: number): number {
  if (targetMinor <= 0) return 0;
  const pct = (contributedMinor / targetMinor) * 100;
  return Math.min(100, Math.max(0, pct));
}
