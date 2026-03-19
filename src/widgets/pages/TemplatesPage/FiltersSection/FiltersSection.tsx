import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import { Locale } from "@/shared/lib/i18n/routing";
import { Alert, Flex, Paper, Stack, Text, Title } from "@mantine/core";
import FiltersForm from "@/features/templates-filter/ui/FiltersForm/FiltersForm";
import CardComponent from "@/entities/templates/ui/CardComponent/CardComponent";
import {
  getPublishedTemplatesPageServer,
  getTemplateCategoriesServer,
  TemplatesFilterParams,
} from "../model/templates.server";
import UrlPagination from "@/shared/ui/UrlPagination/UrlPagination";

interface FiltersSectionProps {
  locale: Locale;
  t: (key: string) => string;
  currentPage: number;
  filters: TemplatesFilterParams;
}

const FiltersSection = async ({ locale, t: _t, currentPage, filters }: FiltersSectionProps) => {
  void _t;

  const templatesPage = await getPublishedTemplatesPageServer(currentPage, 12, filters);
  const categories = await getTemplateCategoriesServer(locale === "en" ? "en" : "ru");
  const templates = templatesPage.items;

  return (
    <Section ariaLabelledby="" id="filters-section">
      <NumberSection number="02" tilt="right" />
      <Stack align="center" w="100%">
        <Title order={2} fz={{ base: 36, md: 64 }} ta="center">
          Поиск шаблонов
        </Title>
        <Paper p={{ base: "sm", md: "lg" }} radius="lg" w="100%">
          <FiltersForm
            initialSearch={filters.search}
            initialCategoryId={filters.categoryId}
            initialSort={filters.sort}
            initialTags={filters.tags}
            initialOnlyFavorites={filters.onlyFavorites}
            categories={categories}
          />
        </Paper>
        {templates.length === 0 ? (
          <Alert color="blue" variant="light" mt={30} w="100%">
            <Text>Пока нет шаблонов. Станьте первым, кто отправит свой шаблон.</Text>
          </Alert>
        ) : (
          <Flex wrap="wrap" justify="center" gap={20} mt={30}>
            {templates.map((template) => (
              <CardComponent key={template.id} template={template} />
            ))}
          </Flex>
        )}
        <Stack align="center" mt={20}>
          <UrlPagination
            pageParam="templatesPage"
            currentPage={templatesPage.page}
            totalPages={templatesPage.totalPages}
          />
        </Stack>
      </Stack>
    </Section>
  );
};

export default FiltersSection;

