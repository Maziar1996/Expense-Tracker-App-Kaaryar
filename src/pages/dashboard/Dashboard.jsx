import { useMemo } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import ExclamationIcon from "../../components/Icons/ExclamationIcon";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import styled from "./dashboard.module.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function Dashboard() {
  const { transactions } = useTransactions();

  const totalIncome = useMemo(
    () =>
      transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  const pieChartData = useMemo(
    () => ({
      labels: ["درآمد", "هزینه"],
      datasets: [
        {
          data: [totalIncome, totalExpense],
          backgroundColor: ["#22c55e", "#ef4444"],
          borderColor: ["#ffffff", "#ffffff"],
          borderWidth: 2,
        },
      ],
    }),
    [totalIncome, totalExpense]
  );

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          font: {
            family: "Vazirmatn",
            size: 14,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
      tooltip: {
        rtl: true,
        textDirection: "rtl",
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const total = totalIncome + totalExpense;
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${value.toLocaleString("fa-IR")} تومان (${percent}%)`;
          },
        },
      },
    },
  };

  const monthlyData = useMemo(() => {
    const groups = {};

    transactions.forEach(t => {
      const [year, month] = t.date.split("/").slice(0, 2);
      const key = `${year}/${month}`;

      if (!groups[key]) {
        groups[key] = {
          name: key,
          income: 0,
          expense: 0,
          sortKey: Number(year) * 100 + Number(month),
        };
      }

      if (t.type === "income") {
        groups[key].income += Number(t.amount);
      } else {
        groups[key].expense += Number(t.amount);
      }
    });

    return Object.values(groups).sort((a, b) => a.sortKey - b.sortKey);
  }, [transactions]);

  const barChartData = useMemo(
    () => ({
      labels: monthlyData.map(item => item.name),
      datasets: [
        {
          label: "درآمد",
          data: monthlyData.map(item => item.income),
          backgroundColor: "#22c55e",
          borderRadius: 6,
        },
        {
          label: "هزینه",
          data: monthlyData.map(item => item.expense),
          backgroundColor: "#ef4444",
          borderRadius: 6,
        },
      ],
    }),
    [monthlyData]
  );

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          font: {
            family: "Vazirmatn",
            size: 14,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
      tooltip: {
        rtl: true,
        textDirection: "rtl",
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString("fa-IR")} تومان`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Vazirmatn",
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "Vazirmatn",
            size: 12,
          },
          callback: function (value) {
            return value.toLocaleString("fa-IR");
          },
        },
      },
    },
  };

  const hasData = transactions.length > 0;

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>داشبورد</h1>

      {/* کارت‌های خلاصه */}
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
        <>
          {/* نمودار Pie */}
          <div className={styled.chartSection}>
            <h2>نسبت درآمد به هزینه</h2>
            <div className={styled.chartWrapper} style={{ height: "400px" }}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>

          {/* نمودار Bar */}
          <div className={styled.chartSection}>
            <h2>خلاصه ماهانه</h2>
            <div className={styled.chartWrapper} style={{ height: "350px" }}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </>
      ) : (
        <div className={styled.emptyMessage}>
          <span>
            <ExclamationIcon />
          </span>
          شما هنوز هیچ تراکنشی وارد نکرده اید.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
