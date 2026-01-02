const persianDateFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

export function formatPersianDate(date) {
  if (!date) return "";

  return date
    .split("/")
    .map(part => persianDateFormatter.format(part))
    .join("/");
}

export function sanitizePersianDateTyping(value) {
  return value
    .replace(/[۰-۹]/g, d => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
    .replace(/[^0-9/]/g, "");
}
