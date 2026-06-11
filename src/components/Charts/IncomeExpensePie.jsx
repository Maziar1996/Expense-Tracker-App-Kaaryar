import { useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { formatNumber } from "../../utils/formatNumber";
import CustomSelect from "../CustomSelect/CustomSelect";
import {
  getAvailableYears,
  getTransactionTypeSummary,
} from "../../utils/chartHelpers";
import styled from "./Charts.module.css";

function IncomeExpensePie({ transactions }) {
  const availableYears = useMemo(
    () => getAvailableYears(transactions),
    [transactions]
  );

  const [selectedYear, setSelectedYear] = useState(availableYears[0] || "");

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const [year] = String(t.date).split("/");
      return year === selectedYear;
    });
  }, [transactions, selectedYear]);

  const summary = useMemo(
    () => getTransactionTypeSummary(filteredTransactions),
    [filteredTransactions]
  );

  const total = summary.income + summary.expense;

  const data = {
    labels: ["درآمد", "هزینه"],
    datasets: [
      {
        data: [summary.income, summary.expense],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          font: {
            family: "Vazirmatn",
            size: 13,
          },
          padding: 18,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
        rtl: true,
        textDirection: "rtl",
        titleFont: {
          family: "Vazirmatn",
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          family: "Vazirmatn",
          size: 13,
        },
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

            return `${context.label}: ${formatNumber(
              value
            )} تومان (${formatNumber(percent)}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={styled.chartSection}>
      <div className={styled.chartHeader}>
        <h2>نسبت درآمد به هزینه</h2>

        <CustomSelect
          value={selectedYear}
          onChange={setSelectedYear}
          options={availableYears.map(year => ({
            value: year,
            label: Number(year).toLocaleString("fa-IR", { useGrouping: false }),
          }))}
          searchable={false}
          clearable={false}
        />
      </div>

      <div className={styled.chartWrapper}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default IncomeExpensePie;
