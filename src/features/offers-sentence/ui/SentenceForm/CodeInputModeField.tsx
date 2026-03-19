"use client";

import { Group, Paper, Radio, RadioGroup, Stack, Text, TextInput, Textarea } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import DropzoneInput from "@/shared/ui/DropzoneInput/DropzoneInput";
import { SentenceFormValues } from "./sentence-form.types";

type CodeInputModeFieldProps = {
  form: UseFormReturnType<SentenceFormValues>;
  codeFileContent: string;
  onCodeFilesChange: (files: FileWithPath[]) => Promise<void>;
};

const CodeInputModeField = ({ form, codeFileContent, onCodeFilesChange }: CodeInputModeFieldProps) => (
  <Paper radius="lg" p="sm" withBorder>
    <Text fw={500}>Код *</Text>

    <RadioGroup
      value={form.values.codeMode}
      onChange={(value) => form.setFieldValue("codeMode", value as SentenceFormValues["codeMode"])}
      mt={8}
    >
      <Group>
        <Radio value="link" label="По ссылке" />
        <Radio value="paste" label="Вставкой" />
        <Radio value="file" label="Файлом" />
      </Group>
    </RadioGroup>

    {form.values.codeMode === "link" && (
      <TextInput
        mt={10}
        placeholder="https://raw.githubusercontent.com/.../file.ts"
        {...form.getInputProps("codeLink")}
      />
    )}

    {form.values.codeMode === "paste" && (
      <Textarea mt={10} minRows={6} resize="vertical" placeholder="Вставьте код" {...form.getInputProps("codePaste")} />
    )}

    {form.values.codeMode === "file" && (
      <Stack mt={10} gap={6}>
        <DropzoneInput
          typePlaceholder="code"
          accept={{
            "text/javascript": [".js", ".jsx"],
            "text/css": [".css", ".scss"],
            "text/html": [".html"],
            "text/typescript": [".ts", ".tsx"],
            "application/json": [".json"],
            "text/plain": [".txt"],
          }}
          maxSize={5 * 1024 * 1024}
          multiple={false}
          onFilesChange={onCodeFilesChange}
        />

        {codeFileContent && (
          <Text size="sm" c="dimmed">
            Файл прочитан: {codeFileContent.length} символов
          </Text>
        )}
      </Stack>
    )}
  </Paper>
);

export default CodeInputModeField;
