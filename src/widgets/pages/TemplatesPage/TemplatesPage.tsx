import { Locale } from "@/shared/lib/i18n/routing";
import { Stack } from "@mantine/core";
import HeroSection from "./HeroSection/HeroSection";
import FiltersSection from "./FiltersSection/FiltersSection";
import { TemplatesFilterParams } from "./model/templates.server";

type TemplatesPageProps = {
  locale: Locale;
  t: (key: string) => string;
  currentPage: number;
  filters: TemplatesFilterParams;
};

const TemplatesPage: React.FC<TemplatesPageProps> = ({ locale, t, currentPage, filters }) => {
  return (
    <Stack gap={120}>
      <HeroSection locale={locale} t={t} />
      <FiltersSection locale={locale} t={t} currentPage={currentPage} filters={filters} />
    </Stack>
  );
};

export default TemplatesPage;
