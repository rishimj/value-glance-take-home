import React from "react";

interface FilterBarProps {
  startYear: number;
  endYear: number;
  setStartYear: React.Dispatch<React.SetStateAction<number>>;
  setEndYear: React.Dispatch<React.SetStateAction<number>>;
  minRevenue: number | null;
  maxRevenue: number | null;
  setMinRevenue: React.Dispatch<React.SetStateAction<number | null>>;
  setMaxRevenue: React.Dispatch<React.SetStateAction<number | null>>;
  minNetIncome: number | null;
  maxNetIncome: number | null;
  setMinNetIncome: React.Dispatch<React.SetStateAction<number | null>>;
  setMaxNetIncome: React.Dispatch<React.SetStateAction<number | null>>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  startYear,
  endYear,
  setStartYear,
  setEndYear,
  minRevenue,
  maxRevenue,
  setMinRevenue,
  setMaxRevenue,
  minNetIncome,
  maxNetIncome,
  setMinNetIncome,
  setMaxNetIncome,
}) => {
  return (
    <div className="flex flex-col gap-6 mb-4">
      <div className="flex gap-4 items-center">
        <label className="text-gray-700 font-medium">Date Range:</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="border rounded p-1 w-24"
            placeholder="Start Year"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            className="border rounded p-1 w-24"
            placeholder="End Year"
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <label className="text-gray-700 font-medium">Revenue Range:</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="border rounded p-1 w-24"
            placeholder="Min Revenue"
            value={minRevenue ?? ""}
            onChange={(e) =>
              setMinRevenue(e.target.value ? Number(e.target.value) : null)
            }
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            className="border rounded p-1 w-24"
            placeholder="Max Revenue"
            value={maxRevenue ?? ""}
            onChange={(e) =>
              setMaxRevenue(e.target.value ? Number(e.target.value) : null)
            }
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <label className="text-gray-700 font-medium">Net Income Range:</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="border rounded p-1 w-24"
            placeholder="Min Net Income"
            value={minNetIncome ?? ""}
            onChange={(e) =>
              setMinNetIncome(e.target.value ? Number(e.target.value) : null)
            }
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            className="border rounded p-1 w-24"
            placeholder="Max Net Income"
            value={maxNetIncome ?? ""}
            onChange={(e) => {
              setMaxNetIncome(e.target.value ? Number(e.target.value) : null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
