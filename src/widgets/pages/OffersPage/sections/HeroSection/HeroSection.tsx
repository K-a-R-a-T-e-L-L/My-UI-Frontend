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
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import { Link } from "@/shared/lib/i18n/navigation";
import { getCurrentUserServer } from "@/shared/lib/auth/get-current-user.server";
import {
  IconChecks,
  IconClockHour4,
  IconFileDescription,
  IconShieldCheck,
} from "@tabler/icons-react";

interface HeroSectionProps {
  locale: Locale;
  t: (key: string) => string;
}

const HeroSection = async ({ locale }: HeroSectionProps) => {
  const currentUser = await getCurrentUserServer();
  const isAuthorized = Boolean(currentUser?.id);

  return (
    <Section ariaLabelledby="">
      <NumberSection tilt="right" number="01" />
      <Grid justify="space-between" align="center" w="100%">
        <GridCol span={{ base: 12, md: 7.5 }}>
          <Stack gap="lg" className={styles.first_col}>
            <Badge
              variant="light"
              color="brandSecondaryA"
              className={styles.hero_badge}
            >
              Отправка и модерация шаблонов
            </Badge>

            <Title order={1} fz={{ base: 44, md: 92 }} lh={0.98}>
              Предложения
            </Title>

            <Text fz={{ base: 18, md: 24 }} maw={740}>
              Публикуйте свои UI-решения: отправьте шаблон, пройдите модерацию и
              делитесь кодом с сообществом.
            </Text>

            <Group gap="md" className={styles.box_buttons}>
              <Link
                href={isAuthorized ? "/offers#proposal-section" : "/profile"}
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
                  leftSection={<IconFileDescription size={18} />}
                >
                  {isAuthorized ? "Отправить шаблон" : "Войти и отправить"}
                </Button>
              </Link>

              <Link
                href="/offers#requests-history-section"
                locale={locale}
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="xl"
                  variant="light"
                  radius="xl"
                  leftSection={<IconClockHour4 size={18} />}
                >
                  Мои заявки
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
          <Paper className={styles.steps_card} radius="xl" p="md" withBorder>
            <SimpleGrid cols={1} spacing="sm">
              <Group wrap="nowrap" gap={10}>
                <IconFileDescription size={18} />
                <Text fw={600}>1. Отправка шаблона</Text>
              </Group>
              <Group wrap="nowrap" gap={10}>
                <IconShieldCheck size={18} />
                <Text fw={600}>2. Проверка модератором</Text>
              </Group>
              <Group wrap="nowrap" gap={10}>
                <IconChecks size={18} />
                <Text fw={600}>3. Публикация в каталоге</Text>
              </Group>
            </SimpleGrid>
          </Paper>
        </GridCol>
      </Grid>
    </Section>
  );
};

export default HeroSection;
