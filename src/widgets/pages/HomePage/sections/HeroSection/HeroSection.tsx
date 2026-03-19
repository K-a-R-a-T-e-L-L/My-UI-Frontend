import { Locale } from "@/shared/lib/i18n/routing";
import styles from "./HeroSection.module.css";
import {
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import { Link } from "@/shared/lib/i18n/navigation";

interface HeroSectionProps {
  locale: Locale;
  t: (key: string) => string;
  isAuthorized: boolean;
}

const HeroSection = ({ locale, isAuthorized }: HeroSectionProps) => {
  return (
    <Section ariaLabelledby="">
      <NumberSection tilt="right" number={"01"} />
      <Grid justify="space-between">
        <GridCol span={{ base: 12, md: 7.5 }}>
          <Stack gap="xl" className={styles.first_col}>
            <Title order={1} fz={{ base: 48, md: 96 }}>
              Максимум результата
            </Title>
            <Text fz={{ base: 19, md: 24 }}>
              My UI — библиотека React-компонентов для тех, кто ценит время.
            </Text>
            <Group gap="xl" className={styles.box_buttons}>
              <Link href="/templates" locale={locale} style={{ textDecoration: "none" }}>
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{
                    to: "brandPrimary.3",
                    from: "brandSecondaryA.5",
                    deg: 120,
                  }}
                  radius="xl"
                >
                  Открыть шаблоны
                </Button>
              </Link>
              <Link
                href={isAuthorized ? "/offers" : "/profile"}
                locale={locale}
                style={{ textDecoration: "none" }}
              >
                <Button size="xl" variant="light" radius="xl">
                  {isAuthorized ? "Предложить решение" : "Войти"}
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
          <Box className={styles.decor_object}></Box>
        </GridCol>
      </Grid>
    </Section>
  );
};

export default HeroSection;
