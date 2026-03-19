import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { Locale } from "@/shared/lib/i18n/routing";

type FaqPageProps = {
  locale: Locale;
};

const FaqPage = ({ locale }: FaqPageProps) => {
  const isRu = locale === "ru";

  const items = isRu
    ? [
        {
          q: "Как добавить шаблон?",
          a: "Перейдите на страницу предложений, заполните форму и отправьте шаблон на модерацию.",
        },
        {
          q: "Когда шаблон станет публичным?",
          a: "После проверки модератором. Статус можно отслеживать в профиле во вкладке заявок.",
        },
        {
          q: "Можно ли редактировать профиль?",
          a: "Да, в профиле доступны изменение имени, фамилии, аватара и описания.",
        },
        {
          q: "Как работает лайк (избранное)?",
          a: "Лайк работает как добавление в избранное: первый клик добавляет шаблон, повторный клик убирает его из избранного.",
        },
        {
          q: "Нужна ли авторизация для копирования и публикации?",
          a: "Копировать код шаблонов можно без авторизации. Добавлять свои шаблоны и управлять профилем можно только после входа в аккаунт.",
        },
        {
          q: "Как проходит авторизация?",
          a: "На странице профиля выберите вход через Telegram: если аккаунт уже есть, введите username и код из бота; если нет — сначала зарегистрируйтесь через Telegram-бота, затем подтвердите вход кодом.",
        },
      ]
    : [
        {
          q: "How do I submit a template?",
          a: "Go to Offers page, fill in the form and send the template for moderation.",
        },
        {
          q: "When does a template become public?",
          a: "After moderator review. You can track status in Profile under Requests tab.",
        },
        {
          q: "Can I edit my profile?",
          a: "Yes, you can update first name, last name, avatar and bio in Profile.",
        },
        {
          q: "How do likes (favorites) work?",
          a: "Like works as favorites: first click adds template to favorites, second click removes it.",
        },
        {
          q: "Do I need auth for copying and publishing?",
          a: "You can copy template code without authorization. Adding your own templates and managing profile requires sign-in.",
        },
        {
          q: "How does authorization work?",
          a: "Open Profile and choose Telegram sign-in: if account already exists, enter your username and bot code; if not, register through Telegram bot first, then confirm sign-in with the code.",
        },
      ];

  return (
    <Paper p={{ base: "md", md: "xl" }} radius="xl" withBorder>
      <Stack gap="md">
        <Title order={1}>{isRu ? "Частые вопросы" : "FAQ"}</Title>
        <Accordion variant="separated" radius="md">
          {items.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionControl>{item.q}</AccordionControl>
              <AccordionPanel>{item.a}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Paper>
  );
};

export default FaqPage;

