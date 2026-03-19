import { Divider, List, ListItem, Paper, Stack, Text, Title } from "@mantine/core";
import { Locale } from "@/shared/lib/i18n/routing";
import styles from "./PrivacyPage.module.css";

type PrivacyPageProps = {
  locale: Locale;
};

const PrivacyPage = ({ locale }: PrivacyPageProps) => {
  const isRu = locale === "ru";

  return (
    <Paper p={{ base: "md", md: "xl" }} radius="xl" withBorder>
      <Stack gap="md">
        <Title order={1} className={styles.title}>
          {isRu ? "Политика конфиденциальности" : "Privacy policy"}
        </Title>

        <Text c="dimmed">
          {isRu
            ? "Дата последнего обновления: 15 марта 2026. Политика описывает, какие данные мы обрабатываем, зачем это делаем и какие права есть у пользователя."
            : "Last updated: March 15, 2026. This policy explains what data we process, why we process it, and your rights."}
        </Text>

        <Divider />

        <Title order={3}>{isRu ? "1. Какие данные мы собираем" : "1. Data we collect"}</Title>
        <List spacing="xs">
          <ListItem>
            {isRu
              ? "Данные профиля: username, имя, фамилия, описание, ссылка на аватар, дата создания аккаунта в сервисе."
              : "Profile data: username, first name, last name, bio, avatar URL, and account creation date in the service."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Данные авторизации: токены сессии, технические идентификаторы, хеши подтверждающих кодов."
              : "Authentication data: session tokens, technical identifiers, and confirmation code hashes."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Пользовательский контент: шаблоны, теги, описания, превью, файлы и история модерации."
              : "User content: templates, tags, descriptions, previews, files, and moderation history."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Технические данные: логи ошибок, события безопасности, метрики действий (например, копирования кода)."
              : "Technical data: error logs, security events, and usage metrics (for example, code-copy events)."}
          </ListItem>
        </List>

        <Title order={3}>{isRu ? "2. Цели обработки" : "2. Processing purposes"}</Title>
        <List spacing="xs">
          <ListItem>
            {isRu
              ? "Предоставление доступа к аккаунту и функциям платформы."
              : "Provide access to your account and platform features."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Публикация шаблонов, модерация и уведомления о статусе заявок."
              : "Publish templates, perform moderation, and notify about submission status."}
          </ListItem>
          <ListItem>
            {isRu
              ? "Поддержание безопасности сервиса, предотвращение злоупотреблений и спама."
              : "Maintain service security and prevent abuse and spam."}
          </ListItem>
          <ListItem>
            {isRu ? "Формирование публичной статистики платформы." : "Generate public platform metrics."}
          </ListItem>
        </List>

        <Title order={3}>{isRu ? "3. Передача данных третьим лицам" : "3. Third-party sharing"}</Title>
        <Text>
          {isRu
            ? "Мы не продаем персональные данные. Передача возможна только в пределах необходимых интеграций (например, Telegram API, хостинг-провайдеры), а также по законному требованию государственных органов."
            : "We do not sell personal data. Sharing is limited to required integrations (for example, Telegram API, hosting providers) and lawful government requests."}
        </Text>

        <Title order={3}>{isRu ? "4. Сроки хранения" : "4. Retention"}</Title>
        <Text>
          {isRu
            ? "Данные хранятся, пока аккаунт активен или это требуется для исполнения обязательств, модерации, безопасности и разрешения споров. После удаления аккаунта данные удаляются или обезличиваются, если иное не требуется законом."
            : "Data is kept while your account is active or as required for obligations, moderation, security, and dispute resolution. After account deletion, data is deleted or anonymized unless law requires otherwise."}
        </Text>

        <Title order={3}>{isRu ? "5. Безопасность" : "5. Security"}</Title>
        <Text>
          {isRu
            ? "Мы применяем организационные и технические меры защиты. При этом ни один способ хранения или передачи данных через интернет не может гарантировать абсолютную безопасность."
            : "We apply organizational and technical safeguards. However, no storage or transmission method over the internet can guarantee absolute security."}
        </Text>

        <Title order={3}>{isRu ? "6. Права пользователя" : "6. Your rights"}</Title>
        <List spacing="xs">
          <ListItem>{isRu ? "Просмотр и обновление данных профиля." : "View and update profile data."}</ListItem>
          <ListItem>{isRu ? "Запрос на удаление аккаунта и данных." : "Request account and data deletion."}</ListItem>
          <ListItem>
            {isRu
              ? "Отзыв согласия на отдельные операции, где применимо."
              : "Withdraw consent for specific processing where applicable."}
          </ListItem>
        </List>

        <Title order={3}>{isRu ? "7. Контакты" : "7. Contacts"}</Title>
        <Text>
          {isRu
            ? "По вопросам конфиденциальности и обработки данных обращайтесь через Telegram-бот поддержки или email, указанные в футере сайта."
            : "For privacy and data-processing requests, contact support via Telegram bot or email listed in the site footer."}
        </Text>
      </Stack>
    </Paper>
  );
};

export default PrivacyPage;
