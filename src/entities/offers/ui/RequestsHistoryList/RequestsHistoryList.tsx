"use client";

import { useMemo, useState } from "react";
import { Alert, Button, Flex, Group, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { deleteTemplate } from "@/shared/api/generated/clients";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import CardBid from "@/entities/offers/ui/CardBid/CardBid";
import UrlPagination from "@/shared/ui/UrlPagination/UrlPagination";
import QuickAction from "@/shared/ui/QuickAction/QuickAction";
import { getUserFriendlyErrorMessage } from "@/shared/lib/api/user-friendly-error";

interface RequestsHistoryListProps {
  templates: TemplateCardData[];
  emptyText: string;
  currentPage?: number;
  totalPages?: number;
  pageParam?: string;
}

const RequestsHistoryList = ({
  templates,
  emptyText,
  currentPage,
  totalPages,
  pageParam,
}: RequestsHistoryListProps) => {
  const router = useRouter();
  const [items, setItems] = useState<TemplateCardData[]>(templates);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  const removeOne = async (templateId: string) => {
    if (deletingId || isClearing) return;

    setDeletingId(templateId);
    setError(null);
    try {
      await deleteTemplate(templateId);
      setItems((prev) => prev.filter((item) => item.id !== templateId));
      router.refresh();
    } catch (apiError: unknown) {
      setError(
        getUserFriendlyErrorMessage(apiError, {
          fallback: "Не удалось удалить заявку. Попробуйте позже.",
        })
      );
    } finally {
      setDeletingId(null);
    }
  };

  const clearAll = async () => {
    if (isClearing || ids.length === 0) return;

    setIsClearing(true);
    setError(null);
    try {
      const results = await Promise.allSettled(ids.map((id) => deleteTemplate(id)));
      const hasRejected = results.some((result) => result.status === "rejected");
      if (hasRejected) {
        setError("Часть заявок не удалось удалить. Повторите попытку.");
      }
      setItems([]);
      router.refresh();
    } finally {
      setIsClearing(false);
    }
  };

  if (items.length === 0) {
    return (
      <Alert color="gray" variant="light">
        <Text>{emptyText}</Text>
      </Alert>
    );
  }

  return (
    <>
      <Group justify="flex-end">
        <QuickAction
          type="delete"
          title="Очистить историю заявок?"
          content="Все заявки из истории будут удалены без возможности восстановления."
          confirmLabel="Очистить"
          cancelLabel="Отмена"
          onConfirm={clearAll}
          disabled={isClearing}
          trigger={
            <Button variant="light" color="red" size="xs" loading={isClearing}>
              Очистить историю
            </Button>
          }
        />
      </Group>

      <Flex wrap="wrap" gap={12}>
        {items.map((template) => (
          <CardBid
            key={template.id}
            template={template}
            onDelete={(id) => void removeOne(id)}
            isDeleting={deletingId === template.id}
          />
        ))}
      </Flex>

      {error ? (
        <Alert color="red" variant="light">
          <Text>{error}</Text>
        </Alert>
      ) : null}

      {currentPage && totalPages && pageParam ? (
        <Group justify="center" mt={16}>
          <UrlPagination pageParam={pageParam} currentPage={currentPage} totalPages={totalPages} />
        </Group>
      ) : null}
    </>
  );
};

export default RequestsHistoryList;
