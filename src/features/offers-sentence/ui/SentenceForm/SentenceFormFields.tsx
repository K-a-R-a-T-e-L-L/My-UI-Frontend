"use client";

import {
  Paper,
  Select,
  Stack,
  TagsInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import DropzoneInput from "@/shared/ui/DropzoneInput/DropzoneInput";
import { SentenceFormValues, TAG_SUGGESTIONS } from "./sentence-form.types";
import CodeInputModeField from "./CodeInputModeField";

type SentenceFormFieldsProps = {
  form: UseFormReturnType<SentenceFormValues>;
  categories: Array<{ value: string; label: string }>;
  codeFileContent: string;
  previewDataUrl: string;
  onCodeFilesChange: (files: FileWithPath[]) => Promise<void>;
  onPreviewFilesChange: (files: FileWithPath[]) => Promise<void>;
};

const SentenceFormFields = ({
  form,
  categories,
  codeFileContent,
  previewDataUrl,
  onCodeFilesChange,
  onPreviewFilesChange,
}: SentenceFormFieldsProps) => {
  return (
    <Stack gap="sm">
      <Paper radius="lg" p="sm" withBorder>
        <TextInput
          label="Название компонента *"
          placeholder="Например: Gradient background"
          {...form.getInputProps("name")}
        />
      </Paper>

      <Paper radius="lg" p="sm" withBorder>
        <Select
          label="Категория *"
          data={categories}
          placeholder="Выберите категорию"
          {...form.getInputProps("categoryId")}
        />
      </Paper>

      <Paper radius="lg" p="sm" withBorder>
        <Textarea
          label="Описание *"
          resize="vertical"
          placeholder="Кратко опишите, что делает шаблон"
          {...form.getInputProps("description")}
        />
      </Paper>

      <CodeInputModeField
        form={form}
        codeFileContent={codeFileContent}
        onCodeFilesChange={onCodeFilesChange}
      />

      <Paper radius="lg" p="sm" withBorder>
        <TagsInput
          label="Теги *"
          placeholder="Добавьте теги и нажмите Enter"
          data={TAG_SUGGESTIONS}
          {...form.getInputProps("tags")}
          splitChars={[",", " "]}
          clearable
        />
      </Paper>

      <Paper radius="lg" p="sm" withBorder>
        <Text fw={500}>Превью файлом</Text>
        <DropzoneInput
          id="preview-component"
          typePlaceholder="image"
          accept={{ "image/*": [".png", ".jpeg", ".jpg", ".gif", ".webp"] }}
          maxSize={10 * 1024 * 1024}
          multiple={false}
          onFilesChange={onPreviewFilesChange}
        />

        {previewDataUrl && (
          <Text size="sm" c="dimmed" mt={6}>
            Превью загружено
          </Text>
        )}
      </Paper>
    </Stack>
  );
};

export default SentenceFormFields;

