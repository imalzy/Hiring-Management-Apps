export const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat("id-ID").format(Number(value));
};
