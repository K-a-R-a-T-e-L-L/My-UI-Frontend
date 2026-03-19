"use client";

import styles from "./CardComponent.module.css";
import {
  ActionIcon,
  Avatar,
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
import { IconCalendar, IconCopy, IconEye, IconHeart } from "@tabler/icons-react";
import LikesBadge from "@/shared/ui/LikesBadge/LikesBadge";
import { Link } from "@/shared/lib/i18n/navigation";
import { TemplateCardData } from "../../model/template.types";
import { useTemplateCardInteractions } from "../../model/useTemplateCardInteractions";

interface CardComponentProps {
  template: TemplateCardData;
}

const CardComponent = ({ template }: CardComponentProps) => {
  const { isLiked, likesCount, handleCopy, handleLikeToggle, error } =
    useTemplateCardInteractions({
      template,
    });

  const authorName =
    template.author.username
      ? `@${template.author.username}`
      : `${template.author.firstname ?? ""} ${template.author.lastname ?? ""}`.trim() ||
        "Автор";

  return (
    <Card
      w={{ base: 220, md: 320 }}
      radius={"20px"}
      className={styles.card}
      padding="0"
      pos="relative"
    >
      <Stack gap={0}>
        <Box className={styles.image_box}>
          <Image
            src={template.preview ?? MEDIA.images.preview.src}
            alt="Превью шаблона"
            fit="cover"
            w="100%"
            h="100%"
          />
        </Box>
        <Stack className={styles.box_content} gap={5} style={{ padding: "16px" }}>
          <Box opacity={0.5} fz={{ base: 11, md: 12 }}>
            <Group gap={3} align="center">
              <IconCalendar size={14} />
              {template.createdAt}
            </Group>
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
            <Group justify="space-between" wrap="nowrap" className={styles.meta_row}>
              <Group gap={10} wrap="nowrap" className={styles.author_group}>
                <Avatar src={template.author.avatarUrl ?? undefined} name={authorName} size={24} />
                <Title fz={{ base: 14, md: 16 }} order={4} className={styles.author_name}>
                  {authorName}
                </Title>
              </Group>
              <Group gap={8} wrap="nowrap" className={styles.likes_group}>
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
            <Group className={styles.group_button} wrap="nowrap" gap={5}>
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
                w={{ base: "100%", md: "50%" }}
                variant="light"
                leftSection={<IconCopy size={14} />}
              >
                Копировать
              </Button>
            </Group>
            {error ? (
              <Text c="red" size="xs">
                {error}
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardComponent;
