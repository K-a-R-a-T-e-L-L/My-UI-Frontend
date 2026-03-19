import * as d3 from "d3";
import { ParsedData } from "../types";

interface renderAreaProps {
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>;
  parsedData: ParsedData;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  gradientId: string;
  innerHeight: number;
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export const renderArea = (props: renderAreaProps) => {
  const { defs, parsedData, xScale, yScale, gradientId, innerHeight, g } =
    props;

  const areaGradient = defs
    .append("linearGradient")
    .attr("id", gradientId)
    .attr("x1", 0)
    .attr("y1", 1)
    .attr("x2", 0)
    .attr("y2", 0);

  areaGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "var(--mantine-color-brandSecondaryA-5)")
    .attr("stop-opacity", 0);

  areaGradient
    .append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "var(--mantine-color-brandSecondaryA-5)")
    .attr("stop-opacity", 0.1);

  const area = d3
    .area<(typeof parsedData)[number]>()
    .x((d) => xScale(d.dateObj))
    .y0(innerHeight)
    .y1((d) => yScale(d.copies))
    .curve(d3.curveMonotoneX);

  return g
    .append("path")
    .datum(parsedData)
    .attr("fill", `url(#${gradientId})`)
    .attr("d", area);
};
