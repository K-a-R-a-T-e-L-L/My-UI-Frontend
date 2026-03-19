"use client";

import { useEffect } from "react";
import { DataPoint } from "./chart/types";
import coreChart from "./chart/core";
import { renderArea } from "./chart/render/area";
import { handlePointerMove } from "./chart/handlers";
import { renderHoverDot } from "./chart/render/hoverDot";
import { renderHoverLabelBottom } from "./chart/render/hoverLabelBottom";
import { renderHoverLine } from "./chart/render/hoverLine";
import { renderHoverValueTooltip } from "./chart/render/hoverValueTooltip";
import { rendreLine } from "./chart/render/line";

type UseChartRenderParams = {
  data: DataPoint[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
};

export const useChartRender = ({
  data,
  containerRef,
  svgRef,
}: UseChartRenderParams) => {
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const drawChart = () => {
      const chart = coreChart({ data, svgRef, containerRef });
      if (!chart) return;

      const { parsedData, innerWidth, innerHeight, formatDate, g, xScale, yScale, defs } = chart;

      renderArea({
        defs,
        parsedData,
        xScale,
        yScale,
        gradientId: "copy-shart-area-gradient",
        innerHeight,
        g,
      });

      rendreLine({ parsedData, xScale, yScale, g });

      const hoverLine = renderHoverLine({ g, innerHeight });
      const hoverDot = renderHoverDot({ g });
      const { hoverLabelBottom, hoverLabelBottomBg, hoverLabelBottomText } =
        renderHoverLabelBottom({ g });
      const { hoverValueTooltip, hoverValueTooltipBg, hoverValueTooltipText } =
        renderHoverValueTooltip({ g });

      const updateBottomDateLabel = (x: number, formattedDate: string) => {
        hoverLabelBottomText.text(formattedDate);
        const textNode = hoverLabelBottomText.node() as SVGTextElement;
        const { width: tw, height: th } = textNode.getBBox();
        const bw = tw + 20;
        const bh = th + 12;
        const by = innerHeight - bh - 2;
        const clampedX = Math.max(bw / 2, Math.min(innerWidth - bw / 2, x));

        hoverLabelBottom
          .style("opacity", 1)
          .attr("transform", `translate(${clampedX}, ${by + bh / 2})`);

        hoverLabelBottomBg
          .attr("x", -bw / 2)
          .attr("y", -bh / 2)
          .attr("width", bw)
          .attr("height", bh);
      };

      const updateValueTooltip = (mx: number, my: number, copies: number) => {
        hoverValueTooltipText.text(`${copies} copies`);
        const textNode = hoverValueTooltipText.node() as SVGTextElement;
        const { width: tw, height: th } = textNode.getBBox();
        const tooltipWidth = tw + 20;
        const tooltipHeight = th + 12;

        let tx = mx - 12 - tooltipWidth;
        let ty = my - 12 - tooltipHeight / 2;

        if (tx < 0) tx = mx + 12;
        if (ty < 0) ty = 0;
        if (ty + tooltipHeight > innerHeight) ty = innerHeight - tooltipHeight;
        if (tx + tooltipWidth > innerWidth) tx = innerWidth - tooltipWidth;

        hoverValueTooltip
          .style("opacity", 1)
          .attr("transform", `translate(${tx}, ${ty})`);

        hoverValueTooltipBg
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", tooltipWidth)
          .attr("height", tooltipHeight);

        hoverValueTooltipText.attr("x", 10).attr("y", tooltipHeight / 2);
      };

      const hideHoverElements = () => {
        hoverLine.style("opacity", "0.2");
        hoverDot.style("opacity", "0.2");
        hoverLabelBottom.style("opacity", "0");
        hoverValueTooltip.style("opacity", "0");
      };

      g.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "transparent")
        .style("pointer-events", "all")
        .on("mousemove", (e: MouseEvent) => {
          const { x, y, d, mx, my } = handlePointerMove({
            e,
            parsedData,
            xScale,
            yScale,
          });

          hoverLine.style("opacity", "1").attr("x1", x).attr("x2", x);
          hoverDot.style("opacity", "1").attr("cx", x).attr("cy", y);
          updateBottomDateLabel(x, formatDate(d.dateObj));
          updateValueTooltip(mx, my, d.copies);
        })
        .on("mouseleave", hideHoverElements);
    };

    drawChart();
    const resizeObserver = new ResizeObserver(drawChart);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, data, svgRef]);
};

