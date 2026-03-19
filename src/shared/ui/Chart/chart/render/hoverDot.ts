interface renderHoverDotProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export const renderHoverDot = (props: renderHoverDotProps) => {
  const { g } = props;

  return g
    .append("circle")
    .attr("r", 5)
    .attr("fill", "var(--chart-dot-fill)")
    .attr("stroke", "var(--chart-dot-stroke)")
    .attr("stroke-width", 2)
    .style("opacity", "0")
    .style("transition", "all 0.3s ease-in-out");
};
