import { useMemo, useState } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import FilterToolbar from "../../components/FilterToolbar/FilterToolbar";
import Spinner from "../../components/Spinner/Spinner";
import MonthlyBarChart from "../../components/charts/MonthlyBarChart";
import BalanceLineChart from "../../components/charts/BalanceLineChart";
import IncomeExpensePie from "../../components/charts/IncomeExpensePie";
import warningIcon from "../../assets/svgs/warningIcon.svg";
import styled from "./Dashboard.module.css";

function Dashboard() {
  const { transactions, isLoading } = useTransactions();

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    type: "all",
  });

  const [sortBy, setSortBy] = useState("date-desc");

  const handleFilterChange = (newFilters, newSortBy) => {
    setFilters(newFilters);
    setSortBy(newSortBy);
  };

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.type !== "all") {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.fromDate) {
      result = result.filter(t => t.date >= filters.fromDate);
    }

    if (filters.toDate) {
      result = result.filter(t => t.date <= filters.toDate);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return b.date.localeCompare(a.date);
        case "date-asc":
          return a.date.localeCompare(b.date);
        case "amount-desc":
          return Number(b.amount) - Number(a.amount);
        case "amount-asc":
          return Number(a.amount) - Number(b.amount);
        default:
          return b.date.localeCompare(a.date);
      }
    });

    return result;
  }, [transactions, filters, sortBy]);

  const totalIncome = useMemo(
    () =>
      filteredTransactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [filteredTransactions]
  );

  const totalExpense = useMemo(
    () =>
      filteredTransactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [filteredTransactions]
  );

  const balance = totalIncome - totalExpense;

  const hasData = filteredTransactions.length > 0;

  if (isLoading) {
    return (
      <div className={styled.container}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>داشبورد</h1>

      <div className={styled.toolbar}>
        <FilterToolbar onChange={handleFilterChange} showSort={false} />
      </div>

      <div className={styled.cards}>
        <div className={styled.card} data-type="income">
          <span>مجموع درآمد</span>
          <strong>{totalIncome.toLocaleString("fa-IR")} تومان</strong>
        </div>

        <div className={styled.card} data-type="expense">
          <span>مجموع هزینه</span>
          <strong>{totalExpense.toLocaleString("fa-IR")} تومان</strong>
        </div>

        <div
          className={styled.card}
          data-type={balance >= 0 ? "positive" : "negative"}
        >
          <span>تراز نهایی</span>
          <strong>{balance.toLocaleString("fa-IR")} تومان</strong>
        </div>
      </div>

      {hasData ? (
        <div className={styled.chartsGrid}>
          <IncomeExpensePie transactions={filteredTransactions} />
          <MonthlyBarChart transactions={filteredTransactions} />
          <BalanceLineChart transactions={filteredTransactions} />
        </div>
      ) : (
        <div className={styled.emptyMessage}>
          <span>
            <img src={warningIcon} alt="warning-icon" />
          </span>
          شما هنوز هیچ تراکنشی وارد نکرده اید
        </div>
      )}
    </div>
  );
}

export default Dashboard;
