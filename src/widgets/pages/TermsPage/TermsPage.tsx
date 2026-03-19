import { Divider, List, ListItem, Paper, Stack, Text, Title } from "@mantine/core";
import { Locale } from "@/shared/lib/i18n/routing";
import styles from "./TermsPage.module.css";

type TermsPageProps = {
  locale: Locale;
};

const TermsPage = ({ locale }: TermsPageProps) => {
  const isRu = locale === "ru";

  return (
    <Paper p={{ base: "md", md: "xl" }} radius="xl" withBorder>
      <Stack gap="md">
        <Title order={1} className={styles.title}>
          {isRu ? "Условия использования" : "Terms of use"}
        </Title>

        <Text c="dimmed">
          {isRu
            ? "Дата последнего обновления: 15 марта 2026. Используя платформу, вы подтверждаете согласие с этими условиями."
            : "Last updated: March 15, 2026. By using the platform, you agree to these terms."}
        </Text>

        <Divider />

        <Title order={3}>{isRu ? "1. Общие правила" : "1. General rules"}</Title>
        <List spacing="xs">
          <ListItem>
            {isRu
              ? "Сервис предназначен для публикации, поиска и копирования UI-шаблонов."
              : "The service is intended for publishing, discovering, and copying UI templates."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Копировать код можно без авторизации. Для публикации и управления шаблонами нужна авторизация."
              : "Code can be copied without authorization. Publishing and managing templates requires authorization."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Авторизация выполняется через Telegram-бота с подтверждающим кодом."
              : "Authorization is performed via Telegram bot with a confirmation code."}
          </ListItem>
        </List>

        <Title order={3}>{isRu ? "2. Пользовательский контент" : "2. User content"}</Title>
        <List spacing="xs">
          <ListItem>
            {isRu
              ? "Запрещено публиковать вредоносный, незаконный, обманный или нарушающий права третьих лиц контент."
              : "It is prohibited to publish malicious, illegal, deceptive, or rights-infringing content."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Вы подтверждаете, что имеете права на размещаемый код, превью и другие материалы."
              : "You confirm you have rights to upload code, previews, and other materials."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Вы несете полную ответственность за опубликованные материалы и последствия их использования."
              : "You are fully responsible for published materials and consequences of their use."}
          </ListItem>
        </List>

        <Title order={3}>{isRu ? "3. Модерация и статусы" : "3. Moderation and statuses"}</Title>
        <Text>
          {isRu
            ? "Новые шаблоны проходят модерацию и получают статус pending. По итогам проверки шаблон может быть опубликован или отклонен с комментарием. После одобрения автор может переводить шаблон в архив и обратно в публикацию."
            : "New templates are moderated and get pending status. After review, a template can be published or denied with a reason. Once approved, the author may archive and re-publish it."}
        </Text>

        <Title order={3}>{isRu ? "4. Лайки, избранное и метрики" : "4. Likes, favorites, and metrics"}</Title>
        <Text>
          {isRu
            ? "Лайк работает как избранное: повторный клик снимает лайк. Платформа может отображать агрегированные метрики (лайки, копирования, активность) без раскрытия приватных данных."
            : "A like works as a favorite: clicking again removes it. The platform may display aggregated metrics (likes, copies, activity) without exposing private data."}
        </Text>

        <Title order={3}>{isRu ? "5. Ограничение ответственности" : "5. Limitation of liability"}</Title>
        <Text>
          {isRu
            ? "Сервис предоставляется «как есть». Мы не гарантируем непрерывную работу, отсутствие ошибок и полную безопасность пользовательского кода. Перед использованием кода в продакшене вы обязаны провести собственную проверку."
            : "The service is provided as is. We do not guarantee uninterrupted operation, error-free behavior, or complete safety of user-submitted code. You must perform your own review before production use."}
        </Text>

        <Title order={3}>{isRu ? "6. Блокировка и удаление" : "6. Suspension and removal"}</Title>
        <Text>
          {isRu
            ? "Мы можем ограничить доступ к аккаунту, скрыть или удалить контент при нарушении правил, злоупотреблениях, атакующих действиях или требованиях закона."
            : "We may restrict account access and hide or remove content in case of rule violations, abuse, attacks, or legal requirements."}
        </Text>

        <Title order={3}>{isRu ? "7. Изменение условий" : "7. Changes to terms"}</Title>
        <Text>
          {isRu
            ? "Мы можем обновлять условия. Актуальная версия всегда публикуется на этой странице с датой обновления."
            : "We may update these terms. The current version is always published on this page with an updated date."}
        </Text>
      </Stack>
    </Paper>
  );
};

export default TermsPage;
