"use client";
import { ActionIcon, Box, Group, rem, Stack, Text } from "@mantine/core";
import {
  Dropzone,
  DropzoneAccept,
  DropzoneIdle,
  DropzoneProps,
  DropzoneReject,
  FileWithPath,
} from "@mantine/dropzone";
import { IconFileCode, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import styles from "./DropzoneInput.module.css";
import { useMemo, useState } from "react";

interface DropzoneInputProps {
  id?: string;
  accept: DropzoneProps["accept"];
  maxSize: number;
  multiple: boolean;
  typePlaceholder: "code" | "image";
  onFilesChange?: (files: FileWithPath[]) => void;
}

const DropzoneInput: React.FC<DropzoneInputProps> = (props) => {
  const { id, accept, maxSize, multiple, typePlaceholder, onFilesChange } = props;
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const extensionsFiles = useMemo(() => {
    if (!accept || Array.isArray(accept)) {
      return "";
    }
    return Object.values(accept).flat().join(", ");
  }, [accept]);

  const IconPlaceholder = typePlaceholder === "code" ? IconFileCode : IconPhoto;

  const handleDrop = (droppedFiles: FileWithPath[]) => {
    const nextFiles = multiple ? [...files, ...droppedFiles] : droppedFiles.slice(0, 1);
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const handleReject = () => {
    // noop
  };

  const handleRemoveFile = (id: string) => {
    const nextFiles = files.filter(
      (file) => `${file.name}${file.size}${file.type}${file.lastModified}` !== id,
    );
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  return (
    <Stack gap={5}>
      <Dropzone
        onDrop={handleDrop}
        onReject={handleReject}
        accept={accept}
        maxSize={maxSize}
        multiple={multiple}
        inputProps={id ? { id } : undefined}
        className={styles.dropzone}
      >
        <Stack justify="center" align="center" gap="xs" style={{ pointerEvents: "none" }}>
          <DropzoneAccept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }}
              stroke={1.5}
            />
          </DropzoneAccept>
          <DropzoneReject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }}
              stroke={1.5}
            />
          </DropzoneReject>
          <DropzoneIdle>
            <IconPlaceholder
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }}
              stroke={1.5}
            />
          </DropzoneIdle>

          <Stack gap={10}>
            <Text fz={{ base: 16, md: 14 }} c="dimmed" ta="center" inline>
              Перетащите файл сюда или кликните, чтобы выбрать
            </Text>
            <Text fz={{ base: 12, md: 10 }} c="dimmed" ta="center" inline>
              {extensionsFiles}
            </Text>
          </Stack>
        </Stack>
      </Dropzone>
      {files.length > 0 && (
        <Box mt="md">
          <Text fw={500} size="sm">
            Выбранный файл:
          </Text>
          <Stack gap={1}>
            {files.map((file, index) => (
              <Group justify="space-between" key={index}>
                <Text fz="xs" c="dimmed" style={{ overflow: "hidden" }} maw="90%">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </Text>
                <ActionIcon
                  onClick={() =>
                    handleRemoveFile(`${file.name}${file.size}${file.type}${file.lastModified}`)
                  }
                  size="xs"
                  radius="xs"
                  variant="light"
                  color="red"
                >
                  <IconX size={15} color="red" />
                </ActionIcon>
              </Group>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default DropzoneInput;
