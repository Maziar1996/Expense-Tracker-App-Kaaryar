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
