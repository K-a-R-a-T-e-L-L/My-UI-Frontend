import * as d3 from "d3";
import { ParsedData } from "../types";

interface rendreLineProps {
  parsedData: ParsedData;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export const rendreLine = (props: rendreLineProps) => {
  const { parsedData, xScale, yScale, g } = props;

  const line = d3
    .line<(typeof parsedData)[number]>()
    .x((d) => xScale(d.dateObj))
    .y((d) => yScale(d.copies))
    .curve(d3.curveMonotoneX);

  const linePath = g
    .append("path")
    .datum(parsedData)
    .attr("fill", `none`)
    .attr("stroke", "var(--mantine-color-brandSecondaryA-5)")
    .attr("stroke-width", 2)
    .attr("d", line);

  const totalLength = (linePath.node() as SVGPathElement).getTotalLength();

  linePath
    .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(1500)
    .ease(d3.easeCubicOut)
    .attr("stroke-dashoffset", 0);

  return linePath;
};
