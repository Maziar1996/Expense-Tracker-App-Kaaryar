const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function getMonthlySummary(transactions, year) {
  const months = Array(12)
    .fill(0)
    .map(() => ({
      income: 0,
      expense: 0,
    }));

  transactions.forEach(t => {
    const [y, m] = String(t.date).split("/");

    if (String(y) !== String(year)) return;

    const monthIndex = Number(m) - 1;

    if (monthIndex < 0 || monthIndex > 11) return;

    if (t.type === "income") {
      months[monthIndex].income += Number(t.amount);
    }

    if (t.type === "expense") {
      months[monthIndex].expense += Number(t.amount);
    }
  });

  return months;
}

export function getAvailableYears(transactions) {
  const years = new Set();

  transactions.forEach(t => {
    const [year] = String(t.date).split("/");
    if (year) years.add(year);
  });

  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

export function getMonthlyLabels() {
  return PERSIAN_MONTHS;
}

export function getBalanceTrendData(transactions, year) {
  const monthlySummary = getMonthlySummary(transactions, year);

  return monthlySummary.map(item => item.income - item.expense);
}

export function getTransactionTypeSummary(transactions) {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === "income") income += Number(t.amount);
    if (t.type === "expense") expense += Number(t.amount);
  });

  return { income, expense };
}
