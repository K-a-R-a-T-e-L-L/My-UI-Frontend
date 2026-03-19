import { Locale } from "@/shared/lib/i18n/routing";
import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import { Flex, Stack, Text, Title } from "@mantine/core";
import CopyChart from "@/shared/ui/Chart/Chart";
import { HomeMetrics } from "../../model/home.server";

interface StatisticsSectionProps {
  locale: Locale;
  t: (key: string) => string;
  metrics: HomeMetrics;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ metrics }) => {
  return (
    <Section ariaLabelledby="">
      <NumberSection tilt="left" number="06" />
      <Stack w='100%' gap='60px'>
        <Flex gap="xl" wrap='wrap' align="center" justify="space-evenly">
          <Stack align="center">
            <Title fw={700} fz={{base: 40, md: 52}}>
              {metrics.registeredUsers}
            </Title>
            <Text ta="center" fz={{base: 16, md: 18}}>
              Зарегистрированных <br /> пользователей
            </Text>
          </Stack>
          <Stack align="center">
            <Title fw={700} fz={{base: 40, md: 52}}>
              {metrics.totalTemplates}
            </Title>
            <Text ta="center" fz={{base: 16, md: 18}}>
              Компонентов <br /> опубликовано
            </Text>
          </Stack>
          <Stack align="center">
            <Title fw={700} fz={{base: 40, md: 52}}>
              {metrics.activeAuthors}
            </Title>
            <Text ta="center" fz={{base: 16, md: 18}}>
              Активных <br /> авторов
            </Text>
          </Stack>
          <Stack align="center">
            <Title fw={700} fz={{base: 40, md: 52}}>
              {metrics.copiesToday}
            </Title>
            <Text ta="center" fz={{base: 16, md: 18}}>
              Копирований <br /> кода
            </Text>
          </Stack>
        </Flex>
        <CopyChart data={metrics.copiesDaily} />
      </Stack>
    </Section>
  );
};

export default StatisticsSection;
