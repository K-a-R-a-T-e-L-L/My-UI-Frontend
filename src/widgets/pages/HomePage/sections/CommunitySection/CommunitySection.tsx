import { Locale } from "@/shared/lib/i18n/routing";
import styles from "./CommunitySection.module.css";
import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import {
  Button,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import CommunityClider from "@/entities/home/ui/CommunitySlider/CommunitySlider";
import { Link } from "@/shared/lib/i18n/navigation";
import { HomeTopTemplate } from "../../model/home.server";

interface CommunitySectionProps {
  locale: Locale;
  t: (key: string) => string;
  isAuthorized: boolean;
  topTemplates: HomeTopTemplate[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  locale,
  isAuthorized,
  topTemplates,
}) => {
  return (
    <Section ariaLabelledby="">
      <NumberSection tilt="right" number="05" />
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <Title order={2} fz={{ base: 36, md: 64 }} className={styles.title}>
              Наш рост — вклад каждого
            </Title>
            <Text fz={{ base: 18, md: 24 }} className={styles.description}>
              Выкладывайте свои шаблоны в общий доступ для переиспользования
              другими пользователями (самые популярные попадают на главную).
            </Text>
            <Group gap="xl" className={styles.box_buttons} mt={30}>
              <Link
                href={isAuthorized ? "/offers" : "/profile"}
                locale={locale}
                style={{ textDecoration: "none" }}
              >
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
                  {isAuthorized ? "Предложить решение" : "Войти"}
                </Button>
              </Link>
              <Link href="/templates" locale={locale} style={{ textDecoration: "none" }}>
                <Button size="xl" variant="light" radius="xl">
                  Открыть шаблоны
                </Button>
              </Link>
            </Group>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }} className={styles.col_slider}>
          <CommunityClider templates={topTemplates} />
        </GridCol>
      </Grid>
    </Section>
  );
};

export default CommunitySection;
