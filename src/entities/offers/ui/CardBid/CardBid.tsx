import { ActionIcon, Badge, Box, Card, Group, Image, Loader, Stack, Text, Title } from "@mantine/core";
import { IconCalendar, IconTrash } from "@tabler/icons-react";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import { MEDIA } from "@/shared/lib/media";
import QuickAction from "@/shared/ui/QuickAction/QuickAction";
import styles from "./CardBid.module.css";

interface CardBidProps {
  template: TemplateCardData;
  onDelete?: (templateId: string) => void;
  isDeleting?: boolean;
}

const STATUS_META: Record<TemplateCardData["status"], { label: string; color: string }> = {
  pending: { label: "На рассмотрении", color: "yellow" },
  published: { label: "Опубликован", color: "green" },
  denied: { label: "Отклонен", color: "red" },
  archived: { label: "В архиве", color: "gray" },
};

const CardBid: React.FC<CardBidProps> = ({ template, onDelete, isDeleting = false }) => {
  const statusMeta = STATUS_META[template.status];

  return (
    <Card w={{ base: 240, md: 320 }} radius="lg" className={styles.card} padding="0" pos="relative">
      {onDelete && (
        <QuickAction
          type="delete"
          title="Удалить заявку?"
          content="Заявка будет удалена из истории без возможности восстановления."
          confirmLabel="Удалить"
          cancelLabel="Отмена"
          disabled={isDeleting}
          onConfirm={() => onDelete(template.id)}
          trigger={
            <ActionIcon
              className={styles.delete_button}
              variant="filled"
              color="red"
              radius="xl"
              aria-label="Удалить заявку"
              disabled={isDeleting}
            >
              {isDeleting ? <Loader size={14} color="white" /> : <IconTrash size={14} />}
            </ActionIcon>
          }
        />
      )}

      <Stack gap={8}>
        <Box className={styles.image_box}>
          <Image
            src={template.preview ?? MEDIA.images.preview.src}
            alt="Превью заявки"
            fit="cover"
            w="100%"
            h="100%"
          />
        </Box>

        <Stack className={styles.box_content} gap={6} style={{ padding: "14px" }}>
          <Group justify="space-between" align="center">
            <Group gap={4} opacity={0.7}>
              <IconCalendar size={14} />
              <Text fz={12}>{template.createdAt}</Text>
            </Group>
            <Badge color={statusMeta.color} variant="light" size="sm">
              {statusMeta.label}
            </Badge>
          </Group>

          <Title order={3} fz={{ base: 17, md: 19 }} className={styles.template_title}>
            {template.name}
          </Title>

          <Text className={styles.description} fz={{ base: 12, md: 13 }}>
            {template.description}
          </Text>

          {template.status === "denied" && template.message && (
            <Group justify="space-between" align="center">
              <Text c="red" fz={12}>
                Заявка отклонена
              </Text>
              <QuickAction type="info" title="Причина отклонения" content={template.message} />
            </Group>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardBid;
