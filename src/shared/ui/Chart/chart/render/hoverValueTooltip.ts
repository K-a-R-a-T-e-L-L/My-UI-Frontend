interface renderHoverValueTooltipProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export const renderHoverValueTooltip = (
  props: renderHoverValueTooltipProps,
) => {
  const { g } = props;

  const hoverValueTooltip = g
    .append("g")
    .style("opacity", 0)
    .style("pointer-events", "none");

  const hoverValueTooltipBg = hoverValueTooltip
    .append("rect")
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("fill", "var(--mantine-color-body)")
    .attr("stroke", "var(--mantine-color-default-border)")
    .attr("stroke-width", 1);

  const hoverValueTooltipText = hoverValueTooltip
    .append("text")
    .attr("fill", "var(--mantine-color-text)")
    .attr("font-size", 10)
    .attr("font-weight", 500)
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "middle")
    .attr("transform", "translate(0, 1)");

  return { hoverValueTooltip, hoverValueTooltipBg, hoverValueTooltipText };
};
