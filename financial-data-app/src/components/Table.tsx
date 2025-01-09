import React from "react";

interface TableProps {
  data: {
    date: string;
    revenue: number;
    netIncome: number;
    grossProfit: number;
    eps: number;
    operatingIncome: number;
  }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border-r">Date</th>
            <th className="px-4 py-2 border-r">Revenue</th>
            <th className="px-4 py-2 border-r">Net Income</th>
            <th className="px-4 py-2 border-r">Gross Profit</th>
            <th className="px-4 py-2 border-r">EPS</th>
            <th className="px-4 py-2">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2 border-r">{row.date}</td>
              <td className="px-4 py-2 border-r">
                {row.revenue.toLocaleString()}
              </td>
              <td className="px-4 py-2 border-r">
                {row.netIncome.toLocaleString()}
              </td>
              <td className="px-4 py-2 border-r">
                {row.grossProfit.toLocaleString()}
              </td>
              <td className="px-4 py-2 border-r">{row.eps}</td>
              <td className="px-4 py-2">
                {row.operatingIncome.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
