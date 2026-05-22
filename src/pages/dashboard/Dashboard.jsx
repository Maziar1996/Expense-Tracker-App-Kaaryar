import { useMemo, useState } from "react";
import { useTransactions } from "../../Context/TransactionContext";
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
import Icon from "../../assets/svgs/Icon";
import FilterToolbar from "../../components/FilterToolbar/FilterToolbar";
import styled from "./Dashboard.module.css";

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

  const pieChartData = useMemo(
    () => ({
      labels: ["درآمد", "هزینه"],
      datasets: [
        {
          data: [totalIncome, totalExpense],
          backgroundColor: ["#22c55e", "#ef4444"],
          borderColor: ["#ffffff", "#ffffff"],
          borderWidth: 2,
          hoverOffset: 3,
        },
      ],
    }),
    [totalIncome, totalExpense]
  );

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    radius: "75%",
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

    filteredTransactions.forEach(t => {
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
  }, [filteredTransactions]);

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

  const hasData = filteredTransactions.length > 0;

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
          <div className={styled.chartSection}>
            <h2>نسبت درآمد به هزینه</h2>
            <div className={styled.chartWrapper}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>

          <div className={styled.chartSection}>
            <h2>خلاصه ماهانه</h2>
            <div className={styled.chartWrapper}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styled.emptyMessage}>
          <span>
            <Icon name="ExclamationIcon" />
          </span>
          شما هنوز هیچ تراکنشی وارد نکرده اید.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
