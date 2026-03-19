import { Badge, Group } from "@mantine/core";
import { IconArchive, IconCalendar, IconCloudUpload } from "@tabler/icons-react";
import styles from "./CardMyComponent.module.css";

type CardMyComponentMetaProps = {
  createdAt: string;
  isPublished: boolean;
};

const CardMyComponentMeta = ({ createdAt, isPublished }: CardMyComponentMetaProps) => (
  <Group gap={5} align="center" justify="space-between">
    <Group gap={3} opacity={0.5}>
      <IconCalendar size={14} />
      {createdAt}
    </Group>

    <Badge
      size="md"
      tt="lowercase"
      variant="light"
      fz={11}
      color={isPublished ? "green" : "violet"}
      className={isPublished ? styles.status_published : styles.status_archived}
      leftSection={isPublished ? <IconCloudUpload size={12} /> : <IconArchive size={12} />}
    >
      {isPublished ? "Опубликовано" : "В архиве"}
    </Badge>
  </Group>
);

export default CardMyComponentMeta;

