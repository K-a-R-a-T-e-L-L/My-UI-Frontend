import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import { Locale } from "@/shared/lib/i18n/routing";
import { Button, Stack, Text, Title } from "@mantine/core";
import { Link } from "@/shared/lib/i18n/navigation";

interface CtaSectionProps {
  locale: Locale;
  isAuthorized: boolean;
}

const CtaSection: React.FC<CtaSectionProps> = ({ locale, isAuthorized }) => {
  return (
    <Section ariaLabelledby="home-cta-title" styles={{ minHeight: "clamp(540px, 74vh, 620px)" }}>
      <NumberSection number="07" tilt="right" />
      <Stack align="center">
        <Title id="home-cta-title" order={2} fz={{ base: 36, md: 64 }} ta="center">
          Начинайте собирать интерфейсы быстрее с My UI
        </Title>
        <Text fz={{ base: 18, md: 24 }} ta="center">
          Присоединяйтесь к сообществу разработчиков, используйте готовые компоненты и делитесь своими решениями.
        </Text>

        <Link
          href={isAuthorized ? "/templates" : "/profile"}
          locale={locale}
          style={{ textDecoration: "none" }}
        >
          <Button
            size="xl"
            radius="xl"
            variant="gradient"
            gradient={{
              from: "brandPrimary.5",
              to: "brandSecondaryA.5",
              deg: 120,
            }}
            mt={30}
          >
            {isAuthorized ? "Перейти к шаблонам" : "Зарегистрироваться"}
          </Button>
        </Link>
      </Stack>
    </Section>
  );
};

export default CtaSection;
