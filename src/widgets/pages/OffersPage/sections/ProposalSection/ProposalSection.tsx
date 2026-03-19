import Section from "@/shared/ui/Section/Section";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import { Locale } from "@/shared/lib/i18n/routing";
import styles from "./ProposalSection.module.css";
import {
  Badge,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconClipboard,
  IconFile,
  IconLink,
  IconSparkles,
} from "@tabler/icons-react";
import SentenceForm from "@/features/offers-sentence/ui/SentenceForm/SentenceForm";
import ModerationRules from "@/features/offers-sentence/ui/ModerationRules/ModerationRules";

interface ProposalSectionProps {
  locale: Locale;
  t: (key: string) => string;
}

const ProposalSection: React.FC<ProposalSectionProps> = ({ locale, t }) => {
  return (
    <Section ariaLabelledby="" id="proposal-section">
      <NumberSection tilt="left" number="02" />
      <Paper
        className={styles.shell}
        bg="transparent"
        radius="xl"
        p={{ base: "lg", sm: "xl", md: "2.25rem" }}
      >
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={{ base: "xl", md: "2rem" }}
        >
          <Stack gap="lg">
            <Badge
              variant="light"
              color="brandPrimary"
              w="fit-content"
              style={{ display: "grid", placeItems: "center" }}
            >
              <Group gap={6} wrap="nowrap">
                <IconSparkles size={14} />
                <span>My UI</span>
              </Group>
            </Badge>

            <Title order={2} fz={{ base: 36, md: 42 }} maw={620}>
              Предложить решение
            </Title>

            <Text size="lg" c="dimmed" maw={560}>
              Заполните форму для отправки вашей идеи на проверку. После
              прохождения модерации она станет доступна всему сообществу для
              переиспользования.
            </Text>

            <Title order={3} fz={18} mt={10}>
              Вы можете предоставить код:
            </Title>

            <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="sm">
              <Paper
                radius="lg"
                p="sm"
                withBorder
                style={{ display: "grid", placeItems: "center" }}
              >
                <Group gap={8} wrap="nowrap" justify="center">
                  <IconLink size={25} />
                  <Text style={{ wordBreak: "break-all" }} fw={700}>
                    По ссылке
                  </Text>
                </Group>
              </Paper>
              <Paper
                radius="lg"
                p="sm"
                withBorder
                style={{ display: "grid", placeItems: "center" }}
              >
                <Group gap={8} wrap="nowrap" justify="center">
                  <IconFile size={25} />
                  <Text style={{ wordBreak: "break-all" }} fw={700}>
                    Из файла
                  </Text>
                </Group>
              </Paper>
              <Paper
                radius="lg"
                p="sm"
                withBorder
                style={{ display: "grid", placeItems: "center" }}
              >
                <Group gap={8} wrap="nowrap" justify="center">
                  <IconClipboard size={25} />
                  <Text style={{ wordBreak: "break-all" }} fw={700}>
                    Из буфера
                  </Text>
                </Group>
              </Paper>
            </SimpleGrid>
            <ModerationRules />
          </Stack>

          <Paper className={styles.preview_panel} radius="xl" p="lg" withBorder>
            <SentenceForm />
          </Paper>
        </SimpleGrid>
      </Paper>
    </Section>
  );
};

export default ProposalSection;
