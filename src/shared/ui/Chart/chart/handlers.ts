import * as d3 from "d3";
import { ParsedData } from "./types";

interface handlePointerMoveProps {
  e: any;
  parsedData: ParsedData;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
}

interface handlePointerLeaveProps {}

export const handlePointerMove = (props: handlePointerMoveProps) => {
  const { e, parsedData, xScale, yScale } = props;

  const bisectDate = d3.bisector<(typeof parsedData)[number], Date>(
    (d) => d.dateObj,
  ).left;

  const [mx, my] = d3.pointer(e);
  const xDate = xScale.invert(mx);

  const i = bisectDate(parsedData, xDate, 1);
  const d0 = parsedData[i - 1];
  const d1 = parsedData[i];
  const d = !d1
    ? d0
    : xDate.getTime() - d0.dateObj.getTime() >
        d1.dateObj.getTime() - xDate.getTime()
      ? d1
      : d0;

  const x = xScale(d.dateObj);
  const y = yScale(d.copies);

  return { x, y, d, mx, my };
};

export const handlePointerLeave = (props: handlePointerLeaveProps) => {
  const {} = props;

  return;
};
