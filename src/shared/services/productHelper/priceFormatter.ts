import {
  CURRENCY_DEFAULT,
  LOCALE_DEFAULT,
} from '../../constants/Environment';

export const getFormattedPrice = (
  value: number,
  currency: string = CURRENCY_DEFAULT,
  locale: string = LOCALE_DEFAULT
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });

  return formatter.format(value);
};
