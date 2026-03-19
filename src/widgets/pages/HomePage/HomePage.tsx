import { Stack } from "@mantine/core";
import { Locale } from "../../../shared/lib/i18n/routing";
import FeaturesSection from "./sections/FeaturesSection/FeaturesSection";
import HeroSection from "./sections/HeroSection/HeroSection";
import FunctionalSection from "./sections/FunctionalSection/FunctionalSection";
import ShowcaseSection from "./sections/ShowcaseSection/ShowcaseSection";
import CommunitySection from "./sections/CommunitySection/CommunitySection";
import StatisticsSection from "./sections/StatisticsSection/StatisticsSection";
import CtaSection from "./sections/CtaSection/CtaSection";
import { getCurrentUserServer } from "@/shared/lib/auth/get-current-user.server";
import {
  getHomeMetricsServer,
  getHomeShowcaseTemplatesServer,
  getHomeTopTemplatesServer,
} from "./model/home.server";

type HomePageProps = {
  locale: Locale;
  t: (key: string) => string;
};

const HomePage = async ({ locale, t }: HomePageProps) => {
  const [currentUser, topTemplates, showcaseTemplates, metrics] = await Promise.all([
    getCurrentUserServer(),
    getHomeTopTemplatesServer(),
    getHomeShowcaseTemplatesServer(),
    getHomeMetricsServer(),
  ]);
  const isAuthorized = Boolean(currentUser?.id);

  return (
    <Stack gap={120}>
      <HeroSection locale={locale} t={t} isAuthorized={isAuthorized} />
      <FunctionalSection locale={locale} t={t} />
      <FeaturesSection locale={locale} t={t} isAuthorized={isAuthorized} />
      <ShowcaseSection locale={locale} t={t} templates={showcaseTemplates} />
      <CommunitySection
        locale={locale}
        t={t}
        isAuthorized={isAuthorized}
        topTemplates={topTemplates}
      />
      <StatisticsSection locale={locale} t={t} metrics={metrics} />
      <CtaSection locale={locale} isAuthorized={isAuthorized} />
    </Stack>
  );
};

export default HomePage;
