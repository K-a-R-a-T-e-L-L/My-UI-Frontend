import { Button, Group } from "@mantine/core";
import { Link } from "@/shared/lib/i18n/navigation";
import { Locale } from "@/shared/lib/i18n/routing";

type FeaturesCtaProps = {
  locale: Locale;
  isAuthorized: boolean;
};

const FeaturesCta = ({ locale, isAuthorized }: FeaturesCtaProps) => (
  <Group gap="sm" wrap="wrap">
    <Link href={isAuthorized ? "/templates" : "/profile"} locale={locale} style={{ textDecoration: "none" }}>
      <Button
        size="md"
        radius="xl"
        variant="gradient"
        gradient={{ from: "brandPrimary.5", to: "brandSecondaryA.5", deg: 120 }}
      >
        {isAuthorized ? "Перейти к шаблонам" : "Зарегистрироваться"}
      </Button>
    </Link>
    <Link href={isAuthorized ? "/offers" : "/profile"} locale={locale} style={{ textDecoration: "none" }}>
      <Button size="md" radius="xl" variant="light" color="brandSecondaryB">
        {isAuthorized ? "Предложить компонент" : "Войти"}
      </Button>
    </Link>
  </Group>
);

export default FeaturesCta;

