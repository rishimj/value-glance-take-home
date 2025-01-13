import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ChartData {
  date: string;
  dateObj?: Date; // Added for parsed dates
  revenue?: number;
  netIncome?: number;
  grossProfit?: number;
  eps?: number;
  operatingIncome?: number;
  [key: string]: any; // Dynamic keys for additional fields
}

interface ChartComponentProps {
  data: ChartData[];
  selectedField:
    | "revenue"
    | "netIncome"
    | "grossProfit"
    | "eps"
    | "operatingIncome"; // Expanded fields
  width?: number;
  height?: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  selectedField,
  width = 800,
  height = 400,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear existing SVG
    d3.select(chartRef.current).select("svg").remove();

    // Margins and dimensions
    const margin = { top: 40, right: 40, bottom: 60, left: 120 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse and enrich data
    const parseDate = d3.timeParse("%Y-%m-%d");
    const chartData = data.map((d) => ({
      ...d,
      dateObj: parseDate(d.date) || new Date(d.date), // Fallback if parsing fails
    }));

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.dateObj) as [Date, Date])
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d[selectedField] as number) || 0])
      .range([innerHeight, 0])
      .nice();

    // Colors
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const lineColor = color(selectedField);

    // Axes
    const xAxis = d3.axisBottom<Date>(xScale).ticks(6);
    const yAxis = d3.axisLeft<number>(yScale).ticks(6);

    // Draw X-axis
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .call((g) =>
        g
          .append("text")
          .attr("x", innerWidth / 2)
          .attr("y", 40)
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
          .attr("font-size", "14")
          .text("Date")
      );

    // Draw Y-axis
    g.append("g")
      .call(yAxis)
      .call((g) =>
        g
          .append("text")
          .attr("x", -innerHeight / 2)
          .attr("y", -110)
          .attr("transform", "rotate(-90)")
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
          .attr("font-size", "14")
          .text(selectedField)
      );

    // Line generator
    const lineGen = d3
      .line<ChartData>()
      .x((d) => xScale(d.dateObj as Date))
      .y((d) => yScale(d[selectedField] as number))
      .curve(d3.curveMonotoneX);

    // Draw line
    g.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", lineColor || "#8884d8")
      .attr("stroke-width", 2)
      .attr("d", lineGen);

    // Tooltip
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background-color", "#FFF")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Data points
    g.selectAll(".dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.dateObj as Date))
      .attr("cy", (d) => yScale(d[selectedField] as number))
      .attr("r", 3)
      .attr("fill", lineColor || "#8884d8")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr("r", 5)
          .attr("fill", "red");

        tooltip
          .style("opacity", 1)
          .html(
            `
            <strong>Date:</strong> ${d.date}<br/>
            <strong>${selectedField}:</strong> ${d[selectedField]}
          `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(100)
          .attr("r", 3)
          .attr("fill", lineColor || "#8884d8");

        tooltip.style("opacity", 0);
      });
  }, [data, selectedField, width, height]);

  return (
    <div
      ref={chartRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
      }}
    />
  );
};

export default ChartComponent;
