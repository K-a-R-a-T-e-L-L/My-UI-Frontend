"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Chart.module.css";
import { Button, Stack, Text } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { DataPoint } from "./chart/types";
import LoadingDots from "../LoadingDots/LoadingDots";
import { useChartRender } from "./useChartRender";
import { getDailyCopies } from "@/shared/api/generated/clients";

interface ChartProps {
  data: DataPoint[];
}

// const data: DataPoint[] = [];

const Chart: React.FC<ChartProps> = (props) => {
  const { data } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [chartData, setChartData] = useState<DataPoint[]>(data);
  const [isReloading, setIsReloading] = useState(false);
  const isLoading = chartData.length === 0;

  useEffect(() => {
    setChartData(data);
  }, [data]);

  useChartRender({ data: chartData, containerRef, svgRef });

  const handleReload = async () => {
    setIsReloading(true);
    try {
      const payload = await getDailyCopies({ days: "8" });
      setChartData(
        (payload.items ?? []).map((item: { date: string; count: number }) => ({
          date: item.date,
          copies: item.count,
        })),
      );
    } catch {
      // ignore reload errors
    } finally {
      setIsReloading(false);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {isLoading && (
        <Text fz={{ base: 36, md: 48 }} style={{ position: "absolute" }}>
          <Stack align="center">
            Загрузка <LoadingDots />
          </Stack>
        </Text>
      )}
      <svg className={styles.svg} ref={svgRef}></svg>
      <Button
        className={styles.reload_button}
        variant="light"
        size="lg"
        p={0}
        disabled={isReloading}
        loading={isReloading}
        onClick={() => void handleReload()}
      >
        <IconReload />
      </Button>
    </div>
  );
};

export default Chart;
