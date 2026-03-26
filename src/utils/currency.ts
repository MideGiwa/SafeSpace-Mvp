/**
 * Currency formatting utility.
 * Defaults to Nigerian Naira (NGN). Override locale/currency for localization.
 */

const DEFAULT_LOCALE = 'en-NG';
const DEFAULT_CURRENCY = 'NGN';

export function formatCurrency(
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
