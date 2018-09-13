
export const getFormattedPrice = (value: number, currency: string = 'EUR', locale: string = 'de-DE'): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });

  return formatter.format(value);
};
