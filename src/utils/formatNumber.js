const persianNumberFormatter = new Intl.NumberFormat("fa-IR");
export function formatNumber(value) {
  if (value === null || value === undefined) return "";
  return persianNumberFormatter.format(value);
}
