interface renderHoverLabelBottomProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export const renderHoverLabelBottom = (props: renderHoverLabelBottomProps) => {
  const { g } = props;

  const hoverLabelBottom = g
    .append("g")
    .style("opacity", 0)
    .style("pointer-events", "none")
     .attr("transform", `translate(0, 10)`)
    .style("transition", "all 0.3s ease-in-out");

  const hoverLabelBottomBg = hoverLabelBottom
    .append("rect")
    .attr("rx", 4)
    .attr("ry", 4)
    .attr(
      "fill",
      "color-mix(in srgb, var(--mantine-color-brandPrimary-5) 10%, transparent 90%)",
    )
    .attr(
      "stroke",
      "color-mix(in srgb, var(--mantine-color-brandPrimary-5) 40%, transparent 60%)",
    )
     .attr("transform", `translate(0, 10)`)
    .attr("stroke-width", 1);

  const hoverLabelBottomText = hoverLabelBottom
    .append("text")
    .attr("fill", "var(--mantine-color-text)")
    .attr("font-size", 10)
    .attr("font-weight", 500)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("transform", `translate(0, 12)`);

  return { hoverLabelBottom, hoverLabelBottomBg, hoverLabelBottomText };
};
