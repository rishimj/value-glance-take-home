import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartComponentProps {
  data: { [key: string]: any }[];
  selectedField: string; // Field to graph (e.g., "revenue", "netIncome")
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  selectedField,
}) => {
  console.log("Chart Data:", data);
  console.log("Selected Field:", selectedField);
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={selectedField} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
