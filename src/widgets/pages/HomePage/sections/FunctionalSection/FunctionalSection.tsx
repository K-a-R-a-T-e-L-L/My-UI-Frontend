import { Locale } from "@/shared/lib/i18n/routing";
import styles from "./FunctionalSection.module.css";
import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import {
  IconCode,
  IconCopy,
  IconSearch,
  IconSettingsCode,
} from "@tabler/icons-react";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import FunctionCard from "@/entities/home/ui/FunctionCard/FunctionCard";

interface FunctionalSectionProps {
  locale: Locale;
  t: (key: string) => string;
}

const listFunctions = [
  {
    icon: IconSearch,
    title: "Найдите",
    description:
      "Изучите коллекцию из множества компонентов, разбитых по категориям.",
  },
  {
    icon: IconSettingsCode,
    title: "Настройте",
    description: "Меняйте цвета, размеры и состояния через понятные пропсы.",
  },
  {
    icon: IconCopy,
    title: "Скопируйте",
    description: "Готовый JSX код попадает в буфер обмена одним кликом.",
  },
  {
    icon: IconCode,
    title: "Используйте",
    description:
      "Просто вставьте код или файл в ваш проект и пользуйтесь им в любом месте.",
  },
];

const FunctionalSection = ({ locale, t }: FunctionalSectionProps) => {
  return (
    <Section ariaLabelledby="">
      <NumberSection tilt="left" number="02" />
      <Stack>
        <Title order={2} fz={{ base: 36, md: 64 }} ta="center">
          Как это работает ?
        </Title>
        <Text fz={{ base: 18, md: 24 }} ta="center">
          Начните за минуту — просто выберите, настройте и скопируйте.
        </Text>
        <Flex mt={30} gap={20} wrap="wrap" justify="center">
          {listFunctions.map((func, index) => {
            const IconComponent = func.icon;
            return (
              <FunctionCard
                w={{ base: 220, md: 280 }}
                py={{ base: 20, md: 40 }}
                radius="xl"
                key={index + Date.now()}
              >
                <Box>
                  <IconComponent
                    className={styles.card_func__icon}
                    size={60}
                    stroke={2}
                  />
                </Box>
                <Title order={3} fz={{ base: 28, md: 36 }}>{func.title}</Title>
                <Text ta="center" fz={{ base: 14, md: 16 }}>
                  {func.description}
                </Text>
              </FunctionCard>
            );
          })}
        </Flex>
      </Stack>
    </Section>
  );
};

export default FunctionalSection;
