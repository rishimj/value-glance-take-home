import React from "react";
import { IncomeStatement } from "../types.ts"; // Replace with your actual types file path

interface SortingDropdownProps {
  onSort: (key: keyof IncomeStatement, order: "asc" | "desc") => void;
}

const SortingDropdown: React.FC<SortingDropdownProps> = ({ onSort }) => {
  const handleSortChange = (
    field: keyof IncomeStatement,
    order: "asc" | "desc"
  ) => {
    onSort(field, order);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Dropdown for Date */}
      <div className="flex flex-col">
        <label htmlFor="date-sort" className="text-gray-700 font-medium mb-1">
          Sort by Date:
        </label>
        <select
          id="date-sort"
          onChange={(e) =>
            handleSortChange("date", e.target.value as "asc" | "desc")
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Dropdown for Revenue */}
      <div className="flex flex-col">
        <label
          htmlFor="revenue-sort"
          className="text-gray-700 font-medium mb-1"
        >
          Sort by Revenue:
        </label>
        <select
          id="revenue-sort"
          onChange={(e) =>
            handleSortChange("revenue", e.target.value as "asc" | "desc")
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">Select Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Dropdown for Net Income */}
      <div className="flex flex-col">
        <label
          htmlFor="net-income-sort"
          className="text-gray-700 font-medium mb-1"
        >
          Sort by Net Income:
        </label>
        <select
          id="net-income-sort"
          onChange={(e) =>
            handleSortChange("netIncome", e.target.value as "asc" | "desc")
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          <option value="">Select Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortingDropdown;
