import { Alert, List, ListItem, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconShieldCheck, IconX } from "@tabler/icons-react";

const ModerationRules = () => {
  return (
    <Alert color="pink" variant="light" radius="md">
      <Stack gap={8}>
        <Title order={4} fz={16}>
          Правила модерации
        </Title>
        <Text size="sm" c="dimmed">
          Перед отправкой убедитесь, что шаблон полезный и безопасный.
        </Text>
        <List
          spacing={6}
          size="sm"
          icon={
            <ThemeIcon color="red" size={18} radius="xl">
              <IconX size={12} />
            </ThemeIcon>
          }
        >
          <ListItem>Запрещён вредоносный код, обфускация и скрытые действия.</ListItem>
          <ListItem>Запрещены пустые или бесполезные шаблоны (например, просто один div).</ListItem>
          <ListItem>Описание и код должны соответствовать друг другу.</ListItem>
        </List>
        <List
          spacing={4}
          size="sm"
          icon={
            <ThemeIcon color="green" size={18} radius="xl">
              <IconShieldCheck size={12} />
            </ThemeIcon>
          }
        >
          <ListItem>Отклонённые заявки содержат комментарий модератора в истории.</ListItem>
        </List>
      </Stack>
    </Alert>
  );
};

export default ModerationRules;
