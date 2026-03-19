"use client";
import { ActionIcon, Group, Text } from "@mantine/core";
import {
  IconArchive,
  IconClock,
  IconCloudUpload,
  IconProps,
  IconX,
} from "@tabler/icons-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import styles from './StatusBadge.module.css'

interface StatusBadgeProps {
  status: "pending" | "success" | "error" | "publish";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const [IconComponent, setIconComponent] =
    useState<
      ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    >(IconClock);
  const [color, setColor] = useState("rgb(195, 175, 0)");
  const [text, setText] = useState("На рассмотрении");

  useEffect(() => {
    switch (status) {
      case "success":
        setIconComponent(IconCloudUpload);
        setColor("rgb(54, 203, 0)");
        setText("Опубликовать");
        break;
      case "pending":
        setIconComponent(IconClock);
        setColor("rgb(195, 175, 0)");
        setText("На рассмотрении");
        break;
      case "publish":
        setIconComponent(IconArchive);
        setColor("rgb(255, 0, 132)");
        setText("Снять");
        break;
      default:
        setIconComponent(IconX);
        setColor("rgb(255, 81, 0)");
        setText("Отказано");
        break;
    }
  }, [status]);

  return (
    <ActionIcon
      variant="transparent"
      className={styles.action}
      disabled={status !== "success" && status !== "publish"}
    >
      <Group gap={5}>
        <IconComponent color={color} size={20} />
        <Text c={color} fz={{ base: 14, md: 16 }}>
          {text}
        </Text>
      </Group>
    </ActionIcon>
  );
};

export default StatusBadge;
