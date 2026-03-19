"use client";

import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";

type QuickActionType = "info" | "delete" | "confirm";

interface QuickActionProps {
  type?: QuickActionType;
  title?: string;
  content?: ReactNode;
  onConfirm?: () => void | Promise<void>;
  confirmLabel?: string;
  cancelLabel?: string;
  trigger?: ReactNode;
  disabled?: boolean;
}

const META: Record<QuickActionType, { color: string; title: string; icon: typeof IconInfoCircle }> = {
  info: { color: "orange", title: "Подробнее", icon: IconInfoCircle },
  delete: { color: "red", title: "Удаление", icon: IconTrash },
  confirm: { color: "green", title: "Подтверждение", icon: IconCircleCheck },
};

const QuickAction: React.FC<QuickActionProps> = ({
  type = "info",
  title,
  content,
  onConfirm,
  confirmLabel = "Подтвердить",
  cancelLabel = "Отмена",
  trigger,
  disabled = false,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const meta = META[type];
  const IconComponent = meta.icon;
  const handleConfirm = async () => {
    await onConfirm?.();
    close();
  };

  return (
    <>
      {trigger ? (
        <span onClick={() => !disabled && open()} style={{ display: "inline-flex" }}>
          {trigger}
        </span>
      ) : (
        <ActionIcon
          onClick={open}
          variant="transparent"
          aria-label={title ?? meta.title}
          disabled={disabled}
        >
          <IconComponent size={22} color={meta.color} />
        </ActionIcon>
      )}

      <Modal opened={opened} onClose={close} title={title ?? meta.title}>
        {typeof content === "string" ? <Text style={{wordBreak: 'break-all'}}>{content}</Text> : content}

        {type !== "info" && (
          <Group mt={20} justify="space-between" gap={10} wrap="nowrap">
            <Button w="100%" variant="light" color="gray" onClick={close}>
              {cancelLabel}
            </Button>
            <Button
              w="100%"
              variant="filled"
              color={type === "confirm" ? "green" : "red"}
              onClick={() => void handleConfirm()}
            >
              {confirmLabel}
            </Button>
          </Group>
        )}
      </Modal>
    </>
  );
};

export default QuickAction;
