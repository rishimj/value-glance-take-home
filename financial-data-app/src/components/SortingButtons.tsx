import React from "react";
import { IncomeStatement } from "../types"; // if you have a separate type definition

interface SortingButtonsProps {
  onSort: (key: keyof IncomeStatement, order: "asc" | "desc") => void;
}

const SortingButtons: React.FC<SortingButtonsProps> = ({ onSort }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => onSort("date", "asc")}
        >
          Sort by Date Asc
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => onSort("date", "desc")}
        >
          Sort by Date Desc
        </button>
      </div>

      <div>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => onSort("revenue", "asc")}
        >
          Sort by Revenue Asc
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => onSort("revenue", "desc")}
        >
          Sort by Revenue Desc
        </button>
      </div>

      <div>
        <button
          className="bg-purple-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => onSort("netIncome", "asc")}
        >
          Sort by Net Income Asc
        </button>
        <button
          className="bg-purple-500 text-white px-3 py-1 rounded"
          onClick={() => onSort("netIncome", "desc")}
        >
          Sort by Net Income Desc
        </button>
      </div>
    </div>
  );
};

export default SortingButtons;
