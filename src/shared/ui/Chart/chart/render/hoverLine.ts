import * as d3 from "d3";

interface renderHoverLineProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  innerHeight: number;
}

export const renderHoverLine = (props: renderHoverLineProps) => {
  const { g, innerHeight } = props;

  return g.append("line")
    .attr("y1", 0)
    .attr("y2", innerHeight)
    .attr("stroke", "var(--mantine-color-brandSecondaryA-2)")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "6 6")
    .style("opacity", "0")
    .style("transition", "all 0.3s ease-in-out");
};
