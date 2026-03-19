"use client";

import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { clearAccessSession } from "@/shared/lib/auth/session";
import { useLogout } from "@/shared/api/generated/hooks/authController/useLogout";

interface ProfileLogoutButtonProps {
  className?: string;
}

const ProfileLogoutButton = ({ className }: ProfileLogoutButtonProps) => {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      clearAccessSession();
      router.refresh();
    }
  };

  return (
    <Button
      variant="light"
      color="red"
      size="xl"
      className={className}
      leftSection={<IconLogout size={16} />}
      onClick={() => void handleLogout()}
      loading={logoutMutation.isPending}
    >
      Выйти
    </Button>
  );
};

export default ProfileLogoutButton;
