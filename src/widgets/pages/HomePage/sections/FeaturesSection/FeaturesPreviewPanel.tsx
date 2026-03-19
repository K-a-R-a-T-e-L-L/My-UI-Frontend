import { Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import LoadingDots from "@/shared/ui/LoadingDots/LoadingDots";
import styles from "./FeaturesSection.module.css";

type FeaturesPreviewPanelProps = {
  t: (key: string) => string;
};

const FeaturesPreviewPanel = ({ t }: FeaturesPreviewPanelProps) => (
  <Paper className={styles.preview_panel} radius="xl" p="lg" withBorder>
    <Stack gap="md">
      <Group gap="xs" align="center">
        <ThemeIcon radius="xl" variant="light" color="brandSecondaryB">
          <IconSparkles size={14} />
        </ThemeIcon>
        <Text fw={600}>{t("panel.title")}</Text>
      </Group>

      <Stack gap="sm">
        <Paper radius="lg" p="sm" withBorder>
          <Title fz={18} order={3} fw={600}>
            Кнопки и инпуты
          </Title>
          <Text size="sm" c="dimmed">
            Большой выбор пользовательских UI компонентов (лоадеры, чекбоксы, поля ввода, формы,
            карточки товаров)
          </Text>
        </Paper>

        <Paper radius="lg" p="sm" withBorder>
          <Title fz={18} order={3} fw={600}>
            Функции и хуки
          </Title>
          <Text size="sm" c="dimmed">
            Утилиты, управляющие логикой приложения (фунции для валидаций, хуки для работы с
            браузерными хранилищами)
          </Text>
        </Paper>

        <Paper radius="lg" p="sm" withBorder>
          <Title fz={18} order={3} fw={600}>
            CSS эффекты и анимации
          </Title>
          <Text size="sm" c="dimmed">
            Способы стилизации (градиенты, анимированные фоны, неоновая подсветка)
          </Text>
        </Paper>

        <Paper radius="lg" p="sm" withBorder>
          <LoadingDots />
        </Paper>
      </Stack>
    </Stack>
  </Paper>
);

export default FeaturesPreviewPanel;

