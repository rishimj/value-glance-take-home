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
    <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
      {/* Date Range */}
      <div className="flex gap-2 items-center">
        <label className="block">Start Year:</label>
        <input
          type="number"
          className="border rounded p-1 w-20"
          value={startYear}
          onChange={(e) => setStartYear(Number(e.target.value))}
        />
      </div>

      <div className="flex gap-2 items-center">
        <label className="block">End Year:</label>
        <input
          type="number"
          className="border rounded p-1 w-20"
          value={endYear}
          onChange={(e) => setEndYear(Number(e.target.value))}
        />
      </div>

      {/* Revenue Range */}
      <div className="flex gap-2 items-center">
        <label className="block">Min Revenue:</label>
        <input
          type="number"
          className="border rounded p-1 w-24"
          placeholder="e.g. 50000"
          value={minRevenue ?? ""}
          onChange={(e) =>
            setMinRevenue(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>
      <div className="flex gap-2 items-center">
        <label className="block">Max Revenue:</label>
        <input
          type="number"
          className="border rounded p-1 w-24"
          placeholder="e.g. 100000"
          value={maxRevenue ?? ""}
          onChange={(e) =>
            setMaxRevenue(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>

      {/* Net Income Range */}
      <div className="flex gap-2 items-center">
        <label className="block">Min Net Income:</label>
        <input
          type="number"
          className="border rounded p-1 w-24"
          placeholder="e.g. 10000"
          value={minNetIncome ?? ""}
          onChange={(e) =>
            setMinNetIncome(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>
      <div className="flex gap-2 items-center">
        <label className="block">Max Net Income:</label>
        <input
          type="number"
          className="border rounded p-1 w-24"
          placeholder="e.g. 50000"
          value={maxNetIncome ?? ""}
          onChange={(e) =>
            setMaxNetIncome(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>
    </div>
  );
};

export default FilterBar;
