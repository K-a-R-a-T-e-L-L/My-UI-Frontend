"use client";

import { useMemo, useState } from "react";
import { Avatar, Button, FileInput, Group, Text, Textarea, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import ProfilePanelLayout from "./ProfilePanelLayout";
import { ProfileUser } from "../../../model/profile.types";
import { useUpdateMe } from "@/shared/api/generated/hooks/authController/useUpdateMe";
import { uploadMeAvatar } from "@/shared/api/generated/clients";
import { getUserFriendlyErrorMessage } from "@/shared/lib/api/user-friendly-error";

interface ProfileSettingsPanelProps {
  user: ProfileUser;
}

const ProfileSettingsPanel = ({ user }: ProfileSettingsPanelProps) => {
  const [description, setDescription] = useState(user.bio);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const updateMeMutation = useUpdateMe();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const avatarPreviewUrl = useMemo(() => {
    if (!avatarFile) {
      return user.avatarUrl ?? undefined;
    }

    return URL.createObjectURL(avatarFile);
  }, [avatarFile, user.avatarUrl]);

  const handleSave = async () => {
    setError(null);

    try {
      await updateMeMutation.mutateAsync({
        data: {
          description,
          firstname,
          lastname,
        },
      });

      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        setIsUploadingAvatar(true);
        await uploadMeAvatar({ data: formData });
        setIsUploadingAvatar(false);
      }

      router.refresh();
    } catch (error: unknown) {
      setIsUploadingAvatar(false);
      setError(
        getUserFriendlyErrorMessage(error, {
          fallback: "Не удалось сохранить профиль. Попробуйте позже.",
        })
      );
    }
  };

  const handleReset = () => {
    setDescription(user.bio);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setAvatarFile(null);
  };

  return (
    <ProfilePanelLayout title="Настройки профиля">
      <Text c="dimmed">Изменяйте имя, фамилию, аватар и информацию о себе.</Text>

      <Group align="flex-end" gap="md">
        <Avatar src={avatarPreviewUrl} size={84} radius="xl" />
        <FileInput
          label="Аватар"
          placeholder="Выберите изображение"
          accept="image/*"
          value={avatarFile}
          onChange={setAvatarFile}
        />
      </Group>

      <TextInput
        label="Имя"
        value={firstname}
        onChange={(event) => setFirstname(event.currentTarget.value)}
      />

      <TextInput
        label="Фамилия"
        value={lastname}
        onChange={(event) => setLastname(event.currentTarget.value)}
      />

      <Textarea
        label="Информация о себе"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        minRows={4}
        autosize
      />

      {error && (
        <Text c="red" size="sm">
          {error}
        </Text>
      )}

      <Group justify="flex-end">
        <Button variant="light" onClick={handleReset}>
          Сбросить
        </Button>
        <Button
          variant="gradient"
          onClick={() => void handleSave()}
          loading={updateMeMutation.isPending || isUploadingAvatar}
          gradient={{
            from: "var(--mantine-color-brandSecondaryB-4)",
            to: "var(--mantine-color-brandSecondaryA-4)",
          }}
        >
          Сохранить
        </Button>
      </Group>
    </ProfilePanelLayout>
  );
};

export default ProfileSettingsPanel;
