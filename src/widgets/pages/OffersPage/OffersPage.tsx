import { Locale } from "@/shared/lib/i18n/routing";
import { Stack } from "@mantine/core";
import HeroSection from "./sections/HeroSection/HeroSection";
import ProposalSection from "./sections/ProposalSection/ProposalSection";
import HistorySection from "./sections/HistorySection/HistorySection";
import { TemplateCardData } from "@/entities/templates/model/template.types";

type OffersPageProps = {
  locale: Locale;
  t: (key: string) => string;
  historyTemplates: TemplateCardData[];
  historyCurrentPage: number;
  historyTotalPages: number;
};

const OffersPage: React.FC<OffersPageProps> = ({
  locale,
  t,
  historyTemplates,
  historyCurrentPage,
  historyTotalPages,
}) => {
  return (
    <Stack gap={120}>
      <HeroSection locale={locale} t={t} />
      <ProposalSection locale={locale} t={t} />
      <HistorySection
        locale={locale}
        t={t}
        templates={historyTemplates}
        currentPage={historyCurrentPage}
        totalPages={historyTotalPages}
      />
    </Stack>
  );
};

export default OffersPage;
