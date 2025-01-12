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
    <div className="bg-white text-black min-h-screen">
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Financial Data Filtering & Visualization (AAPL)
        </h1>

        {/* Filters & Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
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
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Sorting</h2>
            {/* SortingButtons now includes green button styling */}
            <SortingButtons onSort={handleSort} />
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-center mb-4">
            <label className="mr-2 font-medium">Select Metric:</label>
            <select
              value={selectedField}
              onChange={handleFieldChange}
              className="border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="revenue">Revenue</option>
              <option value="netIncome">Net Income</option>
              <option value="grossProfit">Gross Profit</option>
              <option value="eps">EPS</option>
              <option value="operatingIncome">Operating Income</option>
            </select>
          </div>

          <ChartComponent data={filteredData} selectedField={selectedField} />
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Filtered Results</h2>
          <Table data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default App;
