import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ChartData {
  [key: string]: any;
  date: string; // or date as a string, e.g. "2024-09-28"
}

interface ChartComponentProps {
  data: ChartData[];
  selectedField: string; // e.g. "revenue", "netIncome"
  width?: number; // optionally allow parent to specify width
  height?: number; // optionally allow parent to specify height
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

    // Remove any existing SVG to redraw from scratch
    d3.select(chartRef.current).select("svg").remove();

    // Margins for axes and labels
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create an SVG element
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Main chart group (account for margins)
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse date if needed
    const parseDate = d3.timeParse("%Y-%m-%d");
    const chartData = data.map((d) => {
      const parsed = parseDate(d.date);
      return {
        ...d,
        dateObj: parsed || new Date(d.date), // fallback if parse fails
      };
    });

    // Define scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.dateObj) as [Date, Date])
      .range([0, innerWidth])
      .nice(); // neatens domain

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => +d[selectedField]) || 0])
      .range([innerHeight, 0])
      .nice();

    // Color the line based on field (optional)
    // e.g. single color or category-based scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const lineColor = color(selectedField);

    // Axes
    const xAxis = d3.axisBottom<Date>(xScale).ticks(6); // ~6 ticks
    const yAxis = d3.axisLeft<number>(yScale).ticks(6); // ~6 ticks

    // Append X-axis
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .call(
        (g) =>
          g
            .append("text")
            .attr("x", innerWidth / 2)
            .attr("y", 40) // move label below axis
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .attr("font-size", "14")
            .text("Date") // X-axis label
      );

    // Append Y-axis
    g.append("g")
      .call(yAxis)
      .call(
        (g) =>
          g
            .append("text")
            .attr("x", -innerHeight / 2)
            .attr("y", -50) // move label to the left of axis
            .attr("transform", "rotate(-90)")
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .attr("font-size", "14")
            .text(selectedField) // Y-axis label
      );

    // Line generator
    const lineGen = d3
      .line<any>()
      .x((d) => xScale(d.dateObj))
      .y((d) => yScale(+d[selectedField]))
      .curve(d3.curveMonotoneX); // smooth line

    // Append the path for the line
    g.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", lineColor || "#8884d8")
      .attr("stroke-width", 2)
      .attr("d", lineGen);

    // --- Tooltip Setup ---
    // We create a tooltip DIV outside the SVG,
    // so we can position it absolutely over the chart.
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background-color", "#000")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("pointer-events", "none") // let mouse pass through
      .style("opacity", 0); // initially hidden

    // Circles for each data point + mouse events for tooltip
    g.selectAll(".dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.dateObj))
      .attr("cy", (d) => yScale(+d[selectedField]))
      .attr("r", 3)
      .attr("fill", lineColor || "#8884d8")
      // Mouse events
      .on("mouseover", function (event, d) {
        // highlight circle
        d3.select(this)
          .transition()
          .duration(100)
          .attr("r", 5)
          .attr("fill", "red");

        // show tooltip
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
        // update tooltip position as mouse moves
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        // reset circle
        d3.select(this)
          .transition()
          .duration(100)
          .attr("r", 3)
          .attr("fill", lineColor || "#8884d8");

        // hide tooltip
        tooltip.style("opacity", 0);
      });
  }, [data, selectedField, width, height]);

  return (
    <div
      ref={chartRef}
      style={{
        width: width + "px",
        height: height + "px",
        position: "relative",
      }}
    />
  );
};

export default ChartComponent;
