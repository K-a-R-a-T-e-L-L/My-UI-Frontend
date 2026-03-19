import { RefObject } from "react";
import { DataPoint } from "./types";
import * as d3 from "d3";

interface useCoreChartProps {
  data: DataPoint[];
  svgRef: RefObject<SVGSVGElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

const useCoreChart = (props: useCoreChartProps) => {
  const { data, svgRef, containerRef } = props;
  if (!svgRef.current || !containerRef.current) return;

  const parsedData = data.map((d) => ({
    ...d,
    dateObj: new Date(d.date),
  }));

  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove();

  const width = containerRef.current.clientWidth;
  const height = containerRef.current.clientHeight;
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const formatDate = d3.timeFormat("%d-%m-%Y");

  const g = svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "none")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(parsedData, (d) => d.dateObj) as [Date, Date])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(parsedData, (d) => d.copies) ?? 0])
    .range([innerHeight, 0]);

  const defs = svg.append("defs");

  return {
    parsedData,
    innerWidth,
    innerHeight,
    formatDate,
    g,
    xScale,
    yScale,
    defs
  };
};

export default useCoreChart;
