import { useTransactions } from "../../Context/TransactionContext";
import { useMemo } from "react";
import styled from "./dashboard.module.css";

function Dashboard() {
  const { transactions } = useTransactions();

  const totalIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const balance = totalIncome - totalExpense;

  const monthlyData = useMemo(() => {
    const groups = {};

    transactions.forEach(t => {
      const [year, month] = t.date.split("/").slice(0, 2);
      const key = `${year}/${month}`;

      if (!groups[key]) {
        groups[key] = { income: 0, expense: 0 };
      }

      if (t.type === "income") {
        groups[key].income += Number(t.amount);
      } else {
        groups[key].expense += Number(t.amount);
      }
    });

    return Object.keys(groups)
      .map(key => ({
        month: key,
        income: groups[key].income,
        expense: groups[key].expense,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const totalAll = totalIncome + totalExpense;
  const incomePercent =
    totalAll > 0 ? Math.round((totalIncome / totalAll) * 100) : 0;
  const expensePercent = 100 - incomePercent;

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>داشبورد</h1>

      <div className={styled.cards}>
        <div className={styled.card} style={{ borderColor: "#22c55e" }}>
          <span>مجموع درآمد</span>
          <span className={styled.amount}>
            {totalIncome.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <div className={styled.card} style={{ borderColor: "#ef4444" }}>
          <span>مجموع هزینه</span>
          <span className={styled.amount}>
            {totalExpense.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <div
          className={styled.card}
          style={{ borderColor: balance >= 0 ? "#3b82f6" : "#ef4444" }}
        >
          <span>تراز نهایی</span>
          <span
            className={styled.amount}
            style={{ color: balance >= 0 ? "#22c55e" : "#ef4444" }}
          >
            {balance.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>

      <div className={styled.chartSection}>
        <h2>نسبت درآمد به هزینه</h2>
        <div className={styled.pieContainer}>
          <div
            className={styled.pie}
            style={{
              background: `conic-gradient(#22c55e 0% ${incomePercent}%, #ef4444 ${incomePercent}% 100%)`,
            }}
          />
          <div className={styled.pieCenter}>
            <div>کل: {totalAll.toLocaleString("fa-IR")}</div>
          </div>
        </div>
        <div className={styled.pieLegend}>
          <div>
            <span className={styled.legendIncome} /> درآمد {incomePercent}%
          </div>
          <div>
            <span className={styled.legendExpense} /> هزینه {expensePercent}%
          </div>
        </div>
      </div>

      <div className={styled.monthlySection}>
        <h2>خلاصه ماهانه</h2>
        {monthlyData.length > 0 ? (
          <div className={styled.bars}>
            {monthlyData.map((m, i) => {
              const max =
                Math.max(
                  ...monthlyData.map(d => Math.max(d.income, d.expense))
                ) || 1;
              const incomeH = (m.income / max) * 100;
              const expenseH = (m.expense / max) * 100;

              return (
                <div key={i} className={styled.barGroup}>
                  <div className={styled.barLabel}>{m.month}</div>
                  <div className={styled.barContainer}>
                    <div
                      className={styled.incomeBar}
                      style={{ height: `${incomeH}%` }}
                    />
                    <div
                      className={styled.expenseBar}
                      style={{ height: `${expenseH}%` }}
                    />
                  </div>
                  <div className={styled.barValues}>
                    <span>+{m.income.toLocaleString("fa-IR")}</span>
                    <span>-{m.expense.toLocaleString("fa-IR")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styled.empty}>هنوز تراکنشی ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
