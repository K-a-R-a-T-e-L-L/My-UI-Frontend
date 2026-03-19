import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import { Flex, Stack, Text, Title } from "@mantine/core";
import { Locale } from "@/shared/lib/i18n/routing";
import { MEDIA } from "@/shared/lib/media";
import PreviewCard from "@/entities/home/ui/PreviewCard/PreviewCard";
import { HomeShowcaseTemplate } from "../../model/home.server";

interface ShowcaseSectionProps {
  locale: Locale;
  t: (key: string) => string;
  templates: HomeShowcaseTemplate[];
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ locale: _locale, t: _t, templates }) => {
  void _locale;
  void _t;

  return (
    <Section ariaLabelledby="">
      <NumberSection tilt="left" number="04" />
      <Stack align="center">
        <Title order={2} fz={{ base: 36, md: 64 }}>
          Все в одном месте
        </Title>
        <Text fz={{ base: 18, md: 24 }} ta="center">
          Примеры компонентов, которые можно скопировать за секунду.
        </Text>
        {templates.length === 0 ? (
          <Text mt={24} c="dimmed">
            Пока нет шаблонов для витрины.
          </Text>
        ) : (
          <Flex mt={30} gap={20} wrap="wrap" justify="center">
            {templates.map((template) => (
              <PreviewCard
                w={{ base: 220, md: 300 }}
                radius="xl"
                key={template.id}
                img={template.preview ?? MEDIA.images.preview.src}
              >
                <Title order={3} fz={{ base: 28, md: 34 }}>
                  {template.name}
                </Title>
                <Text fz={{ base: 14, md: 16 }}>
                  {template.description}
                </Text>
              </PreviewCard>
            ))}
          </Flex>
        )}
      </Stack>
    </Section>
  );
};

export default ShowcaseSection;

