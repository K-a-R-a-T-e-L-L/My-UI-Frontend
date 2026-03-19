import type { ProfileUser } from "../../model/profile.types";
import styles from "./ProfileHeroSection.module.css";
import {
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import { IconPlus, IconShare } from "@tabler/icons-react";
import ProfileLogoutButton from "./ProfileLogoutButton";
import { Link } from "@/shared/lib/i18n/navigation";

interface ProfileHeroSectionProps {
  user: ProfileUser;
}

const ProfileHeroSection = ({ user }: ProfileHeroSectionProps) => {
  return (
    <Section ariaLabelledby="profile-title">
      <NumberSection tilt="left" number="01" />
      <Stack gap={50} w="100%">
        <Title id="profile-title" order={1} fz={{ base: 48, md: 96 }}>
          Профиль
        </Title>

        <Paper p="xl" radius="xl" className={styles.paper}>
          <Group gap="xl" wrap="nowrap" className={styles.main_group}>
            <Box w="100px" miw="100px">
              <Avatar
                src={user.avatarUrl ?? undefined}
                w="100%"
                h="100%"
                style={{ aspectRatio: "1/1" }}
              />
            </Box>

            <Stack>
              <Title order={2} fz={{ base: 36, md: 64 }} c="dimmed">
                {user.displayName}
              </Title>

              <Text opacity={0.8} fz={{ base: 18, md: 22 }}>
                {user.username} • Зарегистрирован {user.registeredAt}
              </Text>

              <Text opacity={0.6} fz={{ base: 16, md: 18 }}>
                {user.hasBio
                  ? user.bio
                  : "Добавьте информацию о себе в настройках профиля."}
              </Text>

              <Group gap={50} className={styles.group_statistics}>
                <Stack tt="uppercase" align="center" gap={5}>
                  <Title fz={{ base: 28, md: 32 }} ta="center">
                    {user.stats.templates}
                  </Title>
                  <Text fz={{ base: 18, md: 20 }}>шаблонов</Text>
                </Stack>

                <Stack tt="uppercase" align="center" gap={5}>
                  <Title fz={{ base: 28, md: 32 }} ta="center">
                    {user.stats.likes}
                  </Title>
                  <Text fz={{ base: 18, md: 20 }}>лайков</Text>
                </Stack>
              </Group>

              <Group mt={20}>
                <Link href="/profile" style={{ textDecoration: "none" }}>
                  <Button
                    variant="light"
                    size="xl"
                    leftSection={<IconShare />}
                    className={styles.button}
                  >
                    Поделиться
                  </Button>
                </Link>
                <Link href="/offers" style={{ textDecoration: "none" }}>
                  <Button
                    variant="gradient"
                    size="xl"
                    leftSection={<IconPlus />}
                    className={styles.button}
                    gradient={{
                      from: "var(--mantine-color-brandSecondaryB-4)",
                      to: "var(--mantine-color-brandSecondaryA-4)",
                    }}
                  >
                    Добавить шаблон
                  </Button>
                </Link>
                <ProfileLogoutButton className={styles.button} />
              </Group>
            </Stack>
          </Group>
        </Paper>
      </Stack>
    </Section>
  );
};

export default ProfileHeroSection;
