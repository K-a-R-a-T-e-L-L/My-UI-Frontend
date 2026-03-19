"use client";

import { useState } from "react";
import {
  archiveTemplate,
  copyTemplateCode,
  deleteTemplate,
  likeTemplate,
  publishRequest,
  unlikeTemplate,
} from "@/shared/api/generated/clients";
import { getUserFriendlyErrorMessage } from "@/shared/lib/api/user-friendly-error";
import { TemplateCardData } from "./template.types";

export type TemplateAction = "delete" | "archive" | "publish";

type UseTemplateCardInteractionsParams = {
  template: TemplateCardData;
  onTemplateChanged?: () => void;
};

export const useTemplateCardInteractions = ({
  template,
  onTemplateChanged,
}: UseTemplateCardInteractionsParams) => {
  const [isLiked, setIsLiked] = useState(Boolean(template.isLiked));
  const [likesCount, setLikesCount] = useState(template.likesCount);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    setError(null);

    try {
      await navigator.clipboard.writeText(template.code || "");
    } catch {
      // ignore clipboard errors in unsupported browsers
    }

    try {
      await copyTemplateCode(template.id);
    } catch (apiError: unknown) {
      setError(
        getUserFriendlyErrorMessage(apiError, {
          fallback: "Не удалось обновить метрику копирования.",
        })
      );
    }
  };

  const handleLikeToggle = async () => {
    setError(null);
    try {
      const nextLiked = !isLiked;
      if (nextLiked) {
        await likeTemplate(template.id);
      } else {
        await unlikeTemplate(template.id);
      }

      setIsLiked(nextLiked);
      setLikesCount((prev) => Math.max(0, prev + (nextLiked ? 1 : -1)));
    } catch (apiError: unknown) {
      setError(
        getUserFriendlyErrorMessage(apiError, {
          fallback: "Не удалось обновить избранное. Попробуйте еще раз.",
        })
      );
    }
  };

  const callTemplateAction = async (action: TemplateAction) => {
    if (isActionLoading) {
      return false;
    }

    setError(null);
    setIsActionLoading(true);

    try {
      if (action === "delete") {
        await deleteTemplate(template.id);
      } else if (action === "archive") {
        await archiveTemplate(template.id);
      } else if (action === "publish") {
        await publishRequest(template.id);
      }

      onTemplateChanged?.();
      return true;
    } catch (apiError: unknown) {
      setError(
        getUserFriendlyErrorMessage(apiError, {
          fallback: "Не удалось выполнить действие. Попробуйте позже.",
        })
      );
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  return {
    isLiked,
    likesCount,
    handleCopy,
    handleLikeToggle,
    callTemplateAction,
    isActionLoading,
    error,
  };
};
