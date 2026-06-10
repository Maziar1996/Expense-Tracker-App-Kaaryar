import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import CustomSelect from "../CustomSelect/CustomSelect";
import {
  getAvailableYears,
  getMonthlyLabels,
  getMonthlySummary,
} from "../../utils/chartHelpers";
import styled from "./Charts.module.css";

function MonthlyBarChart({ transactions }) {
  const availableYears = useMemo(
    () => getAvailableYears(transactions),
    [transactions]
  );

  const [selectedYear, setSelectedYear] = useState(availableYears[0] || "1405");

  const monthlySummary = useMemo(
    () => getMonthlySummary(transactions, selectedYear),
    [transactions, selectedYear]
  );

  const data = useMemo(
    () => ({
      labels: getMonthlyLabels(),
      datasets: [
        {
          label: "درآمد",
          data: monthlySummary.map(item => item.income),
          backgroundColor: "#22c55e",
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 0.6,
        },
        {
          label: "هزینه",
          data: monthlySummary.map(item => item.expense),
          backgroundColor: "#ef4444",
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 0.6,
        },
      ],
    }),
    [monthlySummary]
  );

  const options = useMemo(
    () => ({
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
              return `${context.dataset.label}: ${context.parsed.y.toLocaleString("fa-IR")} تومان`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              family: "Vazirmatn",
              size: 12,
            },
            color: "#64748b",
          },
        },
        y: {
          grid: {
            color: "#f1f5f9",
          },
          ticks: {
            color: "#64748b",
            font: {
              family: "Vazirmatn",
              size: 12,
            },
            callback: function (value) {
              return Number(value).toLocaleString("fa-IR");
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className={styled.chartSection}>
      <div className={styled.chartHeader}>
        <h2>خلاصه ماهانه</h2>

        <CustomSelect
          value={selectedYear}
          onChange={setSelectedYear}
          options={availableYears.map(year => ({
            value: year,
            label: Number(year).toLocaleString("fa-IR", { useGrouping: false }),
          }))}
          placeholder="انتخاب سال"
          searchable={false}
          clearable={false}
        />
      </div>

      <div className={styled.chartWrapper}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default MonthlyBarChart;
