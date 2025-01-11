import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import Table from "./components/Table";
import SortingButtons from "./components/SortingButtons";
import ChartComponent from "./components/ChartComponent"; // Import the Chart component

interface IncomeStatement {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
  // ... other fields from the API if needed
}

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
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        Financial Data Filtering & Visualization (AAPL)
      </h1>
      {/* Filter Bar */}
      <FilterBar
        startYear={startYear}
        endYear={endYear}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
        minRevenue={minRevenue}
        maxRevenue={maxRevenue}
        setMinRevenue={setMinRevenue}
        setMaxRevenue={setMaxRevenue}
        minNetIncome={minNetIncome}
        maxNetIncome={maxNetIncome}
        setMinNetIncome={setMinNetIncome}
        setMaxNetIncome={setMaxNetIncome}
      />
      {/* Sorting Buttons */}
      <SortingButtons onSort={handleSort} />
      {/* Chart Field Selector */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedField}
          onChange={handleFieldChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="revenue">Revenue</option>
          <option value="netIncome">Net Income</option>
          <option value="grossProfit">Gross Profit</option>
          <option value="eps">EPS</option>
          <option value="operatingIncome">Operating Income</option>
        </select>
      </div>
      {/* Chart */}
      <ChartComponent data={filteredData} selectedField={selectedField} />
      {/* Data Table */}

      {/*<Table data={filteredData} />*/}
    </div>
  );
};

export default App;
