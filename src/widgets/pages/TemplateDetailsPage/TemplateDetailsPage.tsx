import { Badge, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { Locale } from "@/shared/lib/i18n/routing";
import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import styles from "./TemplateDetailsPage.module.css";
import CopyTemplateCodeButton from "./ui/CopyTemplateCodeButton";

interface TemplateDetailsPageProps {
  template: TemplateCardData;
  locale: Locale;
}

const statusLabel: Record<TemplateCardData["status"], string> = {
  published: "Опубликован",
  archived: "В архиве",
  pending: "На модерации",
  denied: "Отклонен",
};

const statusColor: Record<TemplateCardData["status"], string> = {
  published: "green",
  archived: "gray",
  pending: "yellow",
  denied: "red",
};

const TemplateDetailsPage = ({
  template,
  locale,
}: TemplateDetailsPageProps) => {
  const authorName = template.author.username
    ? `@${template.author.username}`
    : `${template.author.firstname ?? ""} ${template.author.lastname ?? ""}`.trim() ||
      "Автор";

  const categoryName =
    locale === "en"
      ? (template.category?.nameEn ?? null)
      : (template.category?.nameRu ?? null);

  return (
    <Section ariaLabelledby="template-details-title">
      <NumberSection number="02" tilt="right" />
      <Stack w="100%" gap="md">
        <Paper
          p={{ base: "md", md: "xl" }}
          radius="xl"
          className={styles.paper}
        >
          <Stack gap={16}>
            <Group
              justify="space-between"
              align="flex-start"
              className={styles.header_row}
            >
              <Stack gap={2}>
                <Title
                  id="template-details-title"
                  order={1}
                  fz={{ base: 24, sm: 28, md: 44 }}
                >
                  {template.name}
                </Title>
                <Text c="dimmed" fz={{ base: 14, md: 16 }}>
                  Автор: {authorName}
                </Text>
              </Stack>
              <Badge
                color={statusColor[template.status]}
                variant="light"
                size="lg"
                className={styles.status_badge}
              >
                {statusLabel[template.status]}
              </Badge>
            </Group>

            {template.preview ? (
              <div className={styles.preview}>
                <Image
                  src={template.preview}
                  alt={template.name}
                  fit="contain"
                  w="auto"
                  h="auto"
                  mah={420}
                />
              </div>
            ) : null}

            <Text fz={{ base: 14, md: 16 }}>{template.description}</Text>

            <Group gap={8} className={styles.tags_row}>
              {template.tags.map((tag) => (
                <Badge key={`${template.id}-${tag}`} variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>

            <Group gap={12} className={styles.meta_row}>
              <Text size="sm" c="dimmed">
                Создан: {template.createdAt}
              </Text>
              {categoryName ? (
                <Text size="sm" c="dimmed">
                  Категория: {categoryName}
                </Text>
              ) : null}
              <Text size="sm" c="dimmed">
                Лайки: {template.likesCount}
              </Text>
              <Text size="sm" c="dimmed">
                Копирования: {template.copiesCount}
              </Text>
            </Group>

            {template.message ? (
              <Paper p="sm" radius="md" withBorder>
                <Text size="sm" fw={600}>
                  Комментарий модератора
                </Text>
                <Text size="sm" c="dimmed">
                  {template.message}
                </Text>
              </Paper>
            ) : null}
          </Stack>
        </Paper>

        <Paper
          p={{ base: "md", md: "xl" }}
          radius="xl"
          className={styles.paper}
        >
          <Stack gap={12}>
            <Group
              justify="space-between"
              align="center"
              className={styles.code_header}
            >
              <Title order={2} fz={{ base: 20, sm: 24, md: 34 }}>
                Код шаблона
              </Title>
              <CopyTemplateCodeButton
                templateId={template.id}
                code={template.code}
              />
            </Group>
            <pre className={styles.codeBlock}>
              <code>{template.code}</code>
            </pre>
          </Stack>
        </Paper>
      </Stack>
    </Section>
  );
};

export default TemplateDetailsPage;
