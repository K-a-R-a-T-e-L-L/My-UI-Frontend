"use client";

import styles from "./CardMyComponent.module.css";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MEDIA } from "@/shared/lib/media";
import {
  IconCopy,
  IconEye,
  IconHeart,
} from "@tabler/icons-react";
import LikesBadge from "@/shared/ui/LikesBadge/LikesBadge";
import { Link } from "@/shared/lib/i18n/navigation";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import { useRouter } from "next/navigation";
import { useTemplateCardInteractions } from "@/entities/templates/model/useTemplateCardInteractions";
import CardMyComponentActionsMenu from "./CardMyComponentActionsMenu";
import CardMyComponentMeta from "./CardMyComponentMeta";

interface CardMyComponentProps {
  template: TemplateCardData;
}

const CardMyComponent = ({ template }: CardMyComponentProps) => {
  const router = useRouter();
  const isPublished = template.status === "published";
  const { isLiked, likesCount, handleCopy, handleLikeToggle, callTemplateAction, isActionLoading } =
    useTemplateCardInteractions({
      template,
      onTemplateChanged: () => router.refresh(),
    });

  return (
    <Card
      w={{ base: 230, md: 320 }}
      radius="20px"
      className={styles.card}
      padding="0"
      pos="relative"
    >
      <Stack gap={0}>
        <Box className={styles.image_box}>
          <Image
            src={template.preview ?? MEDIA.images.preview.src}
            alt="Превью моего шаблона"
            fit="cover"
            w="100%"
            h="100%"
          />
        </Box>
        <Stack className={styles.box_content} gap={5} style={{ padding: "16px" }}>
          <Box fz={{ base: 11, md: 12 }}>
            <CardMyComponentMeta createdAt={template.createdAt} isPublished={isPublished} />
          </Box>

          <Title order={3} fz={{ base: 18, md: 20 }} className={styles.template_title}>
            {template.name}
          </Title>

          <Text className={styles.description} fz={{ base: 12, md: 14 }}>
            {template.description}
          </Text>

          <Group gap={5}>
            {template.tags.slice(0, 3).map((tag) => (
              <Badge
                key={`${template.id}-${tag}`}
                size="md"
                color="var(--mantine-color-brandPrimary-4)"
                tt="lowercase"
                variant="light"
                fz={{ base: 11, md: 12 }}
              >
                {tag}
              </Badge>
            ))}
          </Group>

          <Stack className={styles.bottom_group} mt={{ base: 5, md: 10 }} pt={{ base: 5, md: 10 }} gap={10}>
            <Group justify="flex-end">
              <Group gap={8}>
                <LikesBadge quantity={likesCount} fz={12} iconSize={20} />
                <ActionIcon
                  variant={isLiked ? "filled" : "light"}
                  color={isLiked ? "red" : "gray"}
                  onClick={() => void handleLikeToggle()}
                  aria-label="Лайк"
                >
                  <IconHeart size={14} />
                </ActionIcon>
              </Group>
            </Group>

            <Group className={styles.group_button} wrap="nowrap" gap={10} align="stretch">
              <Button
                component={Link}
                href={`/templates/${template.id}?title=${encodeURIComponent(template.name)}`}
                size="xs"
                radius="sm"
                w={{ base: "100%", md: "50%" }}
                variant="default"
                color="var(--mantine-color-brandPrimary-4)"
                leftSection={<IconEye size={14} />}
              >
                Открыть
              </Button>

              <Button
                onClick={() => void handleCopy()}
                size="xs"
                radius="sm"
                w={{ base: "80%", md: "50%" }}
                variant="light"
                leftSection={<IconCopy size={14} />}
              >
                Копировать
              </Button>

              <Box className={styles.more_action}>
                <CardMyComponentActionsMenu
                  status={template.status}
                  loading={isActionLoading}
                  onAction={callTemplateAction}
                />
              </Box>
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardMyComponent;
