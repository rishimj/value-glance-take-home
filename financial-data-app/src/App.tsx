import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import Table from "./components/Table";
import SortingButtons from "./components/SortingButtons";
import ChartComponent from "./components/ChartComponent";

interface IncomeStatement {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
  // ... other fields from the API if needed
}

const sampleData = [
  { date: "2024-09-28", revenue: 391035000000 },
  { date: "2023-09-30", revenue: 383285000000 },
  { date: "2022-09-24", revenue: 394328000000 },
];

const App: React.FC = () => {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [filteredData, setFilteredData] = useState<IncomeStatement[]>([]);
  const [selectedField, setSelectedField] = useState<string>("revenue"); // Default field for charting

  // Filter states
  const [startYear, setStartYear] = useState<number>(2020);
  const [endYear, setEndYear] = useState<number>(2025);
  const [minRevenue, setMinRevenue] = useState<number | null>(null);
  const [maxRevenue, setMaxRevenue] = useState<number | null>(null);
  const [minNetIncome, setMinNetIncome] = useState<number | null>(null);
  const [maxNetIncome, setMaxNetIncome] = useState<number | null>(null);

  // Fetch data from API on mount
  useEffect(() => {
    fetch(
      "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=AK7ehNsAb4qCAO31DlXVIbmXxMM5Soge"
    )
      .then((res) => res.json())
      .then((resData) => {
        const transformed: IncomeStatement[] = resData.map((item: any) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));
        setData(transformed);
        setFilteredData(transformed);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Filtering logic
  useEffect(() => {
    const newFilteredData = data.filter((row) => {
      const year = new Date(row.date).getFullYear();

      if (year < startYear || year > endYear) return false;
      if (minRevenue !== null && row.revenue < minRevenue) return false;
      if (maxRevenue !== null && row.revenue > maxRevenue) return false;
      if (minNetIncome !== null && row.netIncome < minNetIncome) return false;
      if (maxNetIncome !== null && row.netIncome > maxNetIncome) return false;

      return true;
    });
    setFilteredData(newFilteredData);
  }, [
    data,
    startYear,
    endYear,
    minRevenue,
    maxRevenue,
    minNetIncome,
    maxNetIncome,
  ]);

  // Sorting function
  const handleSort = (key: keyof IncomeStatement, order: "asc" | "desc") => {
    const sorted = [...filteredData].sort((a, b) => {
      if (key === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        const valA = a[key] as number;
        const valB = b[key] as number;
        return order === "asc" ? valA - valB : valB - valA;
      }
    });
    setFilteredData(sorted);
  };

  // Handle changing the charted field
  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(event.target.value);
  };

  return (
    // Overall page container with white bg & black text, and full viewport height
    <div className="h-screen">
      <h1 className="text-3xl text-center mb-6">
        Financial Data Filtering & Visualization (AAPL)
      </h1>
    </div>
  );
};

export default App;
