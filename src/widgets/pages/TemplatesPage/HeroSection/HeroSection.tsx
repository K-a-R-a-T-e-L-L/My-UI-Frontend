import { Locale } from "@/shared/lib/i18n/routing";
import styles from "./HeroSection.module.css";
import {
  Badge,
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import { Link } from "@/shared/lib/i18n/navigation";
import { getCurrentUserServer } from "@/shared/lib/auth/get-current-user.server";
import {
  IconCategory,
  IconCopy,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";

interface HeroSectionProps {
  locale: Locale;
  t: (key: string) => string;
}

const quickTags = ["React", "UI", "Landing", "Dashboard", "Auth"];

const HeroSection = async ({ locale }: HeroSectionProps) => {
  const currentUser = await getCurrentUserServer();
  const isAuthorized = Boolean(currentUser?.id);

  return (
    <Section ariaLabelledby="">
      <NumberSection tilt="left" number="01" />
      <Grid justify="space-between" align="center" w='100%'>
        <GridCol span={{ base: 12, md: 7.5 }}>
          <Stack gap="lg" className={styles.first_col}>
            <Badge
              variant="light"
              tt="none"
              color="brandPrimary"
              leftSection={<IconSparkles size={12} />}
              className={styles.hero_badge}
            >
              Каталог готовых решений
            </Badge>

            <Title order={1} fz={{ base: 44, md: 92 }} lh={0.98}>
              Шаблоны
            </Title>

            <Text fz={{ base: 18, md: 24 }} maw={720}>
              Находите подходящие UI-компоненты, сравнивайте варианты и
              копируйте код за секунды.
            </Text>

            <Group gap={8} className={styles.tags_row}>
              {quickTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="dot"
                  radius="xl"
                  className={styles.tag_chip}
                  tt="lowercase"
                >
                  {tag}
                </Badge>
              ))}
            </Group>

            <Group gap="md" className={styles.box_buttons}>
              <Link
                href="/templates#filters-section"
                locale={locale}
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{
                    from: "brandSecondaryA.5",
                    to: "brandPrimary.3",
                    deg: 120,
                  }}
                  radius="xl"
                  leftSection={<IconSearch size={18} />}
                >
                  Найти шаблон
                </Button>
              </Link>
              <Link
                href={isAuthorized ? "/offers#proposal-section" : "/profile"}
                locale={locale}
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="xl"
                  variant="light"
                  radius="xl"
                  leftSection={<IconSparkles size={18} />}
                >
                  {isAuthorized ? "Предложить свой" : "Войти и предложить"}
                </Button>
              </Link>
            </Group>
          </Stack>
        </GridCol>

        <GridCol
          pos="relative"
          style={{ display: "grid", placeItems: "center" }}
          span={{ base: 12, md: 4 }}
        >
          <Box className={styles.decor_object} />
          <Paper className={styles.feature_card} radius="xl" p="md" withBorder>
            <Stack gap="sm">
              <Group gap={8} wrap="nowrap">
                <ThemeIcon size="sm" variant="light" color="brandPrimary">
                  <IconSearch size={14} />
                </ThemeIcon>
                <Text fw={600}>Поиск по названию и тегам</Text>
              </Group>
              <Group gap={8} wrap="nowrap">
                <ThemeIcon size="sm" variant="light" color="blue">
                  <IconCopy size={14} />
                </ThemeIcon>
                <Text fw={600}>Копирование кода без авторизации</Text>
              </Group>
              <Group gap={8} wrap="nowrap">
                <ThemeIcon size="sm" variant="light" color="grape">
                  <IconCategory size={14} />
                </ThemeIcon>
                <Text fw={600}>Фильтрация по категориям</Text>
              </Group>
            </Stack>
          </Paper>
        </GridCol>
      </Grid>
    </Section>
  );
};

export default HeroSection;
