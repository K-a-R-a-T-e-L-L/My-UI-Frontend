"use client";

import { ActionIcon, Loader, Menu, MenuDropdown, MenuItem } from "@mantine/core";
import { IconArchive, IconCloudUpload, IconDots, IconTrash } from "@tabler/icons-react";
import { TemplateAction } from "@/entities/templates/model/useTemplateCardInteractions";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import QuickAction from "@/shared/ui/QuickAction/QuickAction";

type CardMyComponentActionsMenuProps = {
  status: TemplateCardData["status"];
  loading: boolean;
  onAction: (action: TemplateAction) => Promise<boolean>;
};

const CardMyComponentActionsMenu = ({
  status,
  loading,
  onAction,
}: CardMyComponentActionsMenuProps) => (
  <Menu shadow="md" width={220} position="bottom-end" withinPortal closeOnItemClick={false}>
    <Menu.Target>
      <ActionIcon variant="light" radius="sm" size={30} aria-label="Дополнительные действия">
        <IconDots size={16} />
      </ActionIcon>
    </Menu.Target>
    <MenuDropdown>
      <QuickAction
        type="delete"
        title="Удалить шаблон?"
        content="Шаблон будет удален без возможности восстановления."
        confirmLabel="Удалить"
        cancelLabel="Отмена"
        disabled={loading}
        onConfirm={async () => {
          await onAction("delete");
        }}
        trigger={
          <MenuItem
            color="red"
            leftSection={<IconTrash size={14} />}
            rightSection={loading ? <Loader size={12} /> : null}
            disabled={loading}
          >
            Удалить
          </MenuItem>
        }
      />

      {status === "published" && (
        <QuickAction
          type="confirm"
          title="Снять с публикации?"
          content="Шаблон перейдет в архив и перестанет быть публичным."
          confirmLabel="Снять"
          cancelLabel="Отмена"
          disabled={loading}
          onConfirm={async () => {
            await onAction("archive");
          }}
          trigger={
            <MenuItem
              leftSection={<IconArchive size={14} />}
              rightSection={loading ? <Loader size={12} /> : null}
              disabled={loading}
            >
              Снять с публикации
            </MenuItem>
          }
        />
      )}

      {(status === "archived" || status === "denied") && (
        <QuickAction
          type="confirm"
          title="Отправить на публикацию?"
          content="Шаблон будет отправлен на модерацию перед публикацией."
          confirmLabel="Отправить"
          cancelLabel="Отмена"
          disabled={loading}
          onConfirm={async () => {
            await onAction("publish");
          }}
          trigger={
            <MenuItem
              leftSection={<IconCloudUpload size={14} />}
              rightSection={loading ? <Loader size={12} /> : null}
              disabled={loading}
            >
              Опубликовать
            </MenuItem>
          }
        />
      )}

      {status === "pending" && (
        <MenuItem disabled leftSection={<IconCloudUpload size={14} />}>
          На модерации
        </MenuItem>
      )}
    </MenuDropdown>
  </Menu>
);

export default CardMyComponentActionsMenu;
