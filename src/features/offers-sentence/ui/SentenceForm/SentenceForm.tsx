"use client";

import { Alert, Button, Stack, Text } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { createTemplate, getCategories, uploadPreview } from "@/shared/api/generated/clients";
import { getUserFriendlyErrorMessage } from "@/shared/lib/api/user-friendly-error";
import SentenceFormFields from "./SentenceFormFields";
import { SentenceFormValues } from "./sentence-form.types";

const initialValues: SentenceFormValues = {
  name: "",
  categoryId: "",
  description: "",
  codeMode: "paste",
  codeLink: "",
  codePaste: "",
  tags: [],
};

const SentenceForm = () => {
  const [categories, setCategories] = useState<Array<{ value: string; label: string }>>([]);
  const [codeFileContent, setCodeFileContent] = useState("");
  const [previewFile, setPreviewFile] = useState<FileWithPath | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<SentenceFormValues>({ initialValues });

  useEffect(() => {
    void getCategories()
      .then((items: Array<{ id: string; nameRu: string }>) =>
        setCategories(items.map((item) => ({ value: item.id, label: item.nameRu })))
      )
      .catch(() => setCategories([]));
  }, []);

  const onCodeFilesChange = async (files: FileWithPath[]) => {
    const file = files[0];
    if (!file) return;
    setCodeFileContent(await file.text());
  };

  const onPreviewFilesChange = async (files: FileWithPath[]) => {
    setPreviewFile(files[0] ?? null);
  };

  const uploadPreviewFile = async (): Promise<string | null> => {
    if (!previewFile) return null;

    const formData = new FormData();
    formData.append("file", previewFile);
    const result = await uploadPreview({ data: formData });

    return result.url;
  };

  const onSubmit = async (values: SentenceFormValues) => {
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const code =
      values.codeMode === "link" ? values.codeLink : values.codeMode === "file" ? codeFileContent : values.codePaste;

    try {
      const previewUrl = await uploadPreviewFile();
      await createTemplate({
        name: values.name.trim(),
        categoryId: values.categoryId,
        description: values.description.trim(),
        tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
        preview: previewUrl as unknown as object | null,
        code: code.trim(),
      });

      setSuccess("Шаблон отправлен на модерацию.");
      setCodeFileContent("");
      setPreviewFile(null);
      form.reset();
    } catch (error: unknown) {
      setError(
        getUserFriendlyErrorMessage(error, {
          fallback: "Не удалось отправить шаблон. Проверьте поля и попробуйте снова.",
          overrides: {
            401: "Сначала авторизуйтесь через Telegram.",
          },
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="md">
        <SentenceFormFields
          form={form}
          categories={categories}
          codeFileContent={codeFileContent}
          previewDataUrl={previewFile?.name ?? ""}
          onCodeFilesChange={onCodeFilesChange}
          onPreviewFilesChange={onPreviewFilesChange}
        />

        {error && (
          <Alert color="red" icon={<IconInfoCircle size={14} />}>
            <Text size="sm">{error}</Text>
          </Alert>
        )}
        {success && (
          <Alert color="green" icon={<IconCheck size={14} />}>
            <Text size="sm">{success}</Text>
          </Alert>
        )}

        <Button type="submit" loading={isSubmitting} radius="md">
          Отправить на модерацию
        </Button>
      </Stack>
    </form>
  );
};

export default SentenceForm;
