import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import { Locale } from "@/shared/lib/i18n/routing";
import { Stack, Title } from "@mantine/core";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import RequestsHistoryList from "@/entities/offers/ui/RequestsHistoryList/RequestsHistoryList";

interface HistorySectionProps {
  locale: Locale;
  t: (key: string) => string;
  templates: TemplateCardData[];
  currentPage: number;
  totalPages: number;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  locale: _locale,
  t: _t,
  templates,
  currentPage,
  totalPages,
}) => {
  void _locale;
  void _t;

  return (
    <Section ariaLabelledby="" id="requests-history-section">
      <NumberSection number="03" tilt="right" />
      <Stack w="100%" gap={30}>
        <Title order={2} fz={{ base: 36, md: 64 }}>
          История заявок
        </Title>

        <RequestsHistoryList
          templates={templates}
          emptyText="Пока нет заявок. Отправьте первый шаблон через форму выше."
          currentPage={currentPage}
          totalPages={totalPages}
          pageParam="requestsPage"
        />
      </Stack>
    </Section>
  );
};

export default HistorySection;
