const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "GBP",
});

export function Currency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
