export const dateToNumber = dateString => {
  if (!dateString) return 0;
  return parseInt(dateString.replace(/\//g, ""));
};

export const filterTransactions = (transactions, filters) => {
  return transactions.filter(transaction => {
    const transactionDate = dateToNumber(transaction.date);
    const fromDate = dateToNumber(filters.fromDate);
    const toDate = dateToNumber(filters.toDate);

    if (fromDate && transactionDate < fromDate) return false;

    if (toDate && transactionDate > toDate) return false;

    if (
      filters.type &&
      filters.type !== "all" &&
      transaction.type !== filters.type
    ) {
      return false;
    }

    return true;
  });
};

export const sortTransactions = (transactions, sortBy) => {
  const sorted = [...transactions];

  switch (sortBy) {
    case "date-desc":
      return sorted.sort((a, b) => dateToNumber(b.date) - dateToNumber(a.date));

    case "date-asc":
      return sorted.sort((a, b) => dateToNumber(a.date) - dateToNumber(b.date));

    case "amount-desc":
      return sorted.sort((a, b) => Number(b.amount) - Number(a.amount));

    case "amount-asc":
      return sorted.sort((a, b) => Number(a.amount) - Number(b.amount));

    default:
      return sorted;
  }
};

export const processTransactions = (transactions, filters, sortBy) => {
  const filtered = filterTransactions(transactions, filters);
  return sortTransactions(filtered, sortBy);
};
