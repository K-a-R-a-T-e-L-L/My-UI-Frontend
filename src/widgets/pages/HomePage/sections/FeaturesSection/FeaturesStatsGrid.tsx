import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconClick, IconColorSwatch, IconForms } from "@tabler/icons-react";

type FeaturesStatsGridProps = {
  t: (key: string) => string;
};

const itemStyle = { display: "grid", placeItems: "center" } as const;

const FeaturesStatsGrid = ({ t }: FeaturesStatsGridProps) => (
  <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="sm">
    <Paper radius="lg" p="sm" withBorder style={itemStyle}>
      <Group gap={8} wrap="nowrap" justify="center">
        <IconClick size={25} />
        <Text style={{ wordBreak: "break-all" }} fw={700}>
          {t("stats.components")}
        </Text>
      </Group>
    </Paper>

    <Paper radius="lg" p="sm" withBorder style={itemStyle}>
      <Group gap={8} wrap="nowrap" justify="center">
        <IconForms size={25} />
        <Text style={{ wordBreak: "break-all" }} fw={700}>
          {t("stats.categories")}
        </Text>
      </Group>
    </Paper>

    <Paper radius="lg" p="sm" withBorder style={itemStyle}>
      <Group gap={8} wrap="nowrap" justify="center">
        <IconColorSwatch size={25} />
        <Text style={{ wordBreak: "break-all" }} fw={700}>
          Фильтры по #
        </Text>
      </Group>
    </Paper>
  </SimpleGrid>
);

export default FeaturesStatsGrid;

