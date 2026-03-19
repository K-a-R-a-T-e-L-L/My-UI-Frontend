import { Badge, Group, Paper, SimpleGrid, Stack, Title } from "@mantine/core";
import { IconSettings, IconSparkles } from "@tabler/icons-react";
import styles from "./FeaturesSection.module.css";
import { Locale } from "@/shared/lib/i18n/routing";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import FeaturesCta from "./FeaturesCta";
import FeaturesStatsGrid from "./FeaturesStatsGrid";
import FeaturesPreviewPanel from "./FeaturesPreviewPanel";
import { Text } from "@mantine/core";

type FeaturesSectionProps = {
  locale: Locale;
  t: (key: string) => string;
  isAuthorized: boolean;
};

const FeaturesSection = ({ locale, t, isAuthorized }: FeaturesSectionProps) => {
  return (
    <Section
      ariaLabelledby="home-features-title"
      styles={{ minHeight: "clamp(540px, 74vh, 720px)", overflow: "hidden" }}
    >
      <NumberSection tilt="right" number="03" />
      <IconSettings className={styles.bg_icon} />

      <Paper className={styles.shell} bg="transparent" radius="xl" p={{ base: "lg", sm: "xl", md: "2.25rem" }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: "xl", md: "2rem" }}>
          <Stack gap="lg">
            <Badge variant="light" color="brandPrimary" w="fit-content" style={{ display: "grid", placeItems: "center" }}>
              <Group gap={6} wrap="nowrap">
                <IconSparkles size={14} />
                <span>My UI</span>
              </Group>
            </Badge>

            <Title id="home-features-title" order={2} fz={{ base: 36, md: 42 }} maw={620}>
              {t("title")}
            </Title>

            <Text size="lg" c="dimmed" maw={560}>
              Легко ищите по фильтрам, добавляйте в избранное, используйте готовые решения для
              быстрого прототипирования вашего MVP, а так же предлагайте свои.
            </Text>

            <FeaturesCta locale={locale} isAuthorized={isAuthorized} />
            <FeaturesStatsGrid t={t} />
          </Stack>

          <FeaturesPreviewPanel t={t} />
        </SimpleGrid>
      </Paper>
    </Section>
  );
};

export default FeaturesSection;

