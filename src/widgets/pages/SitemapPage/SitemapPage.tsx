import { Card, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { Link } from "@/shared/lib/i18n/navigation";
import { Locale } from "@/shared/lib/i18n/routing";
import {
  IconCompass,
  IconFileDescription,
  IconFileText,
  IconHelpCircle,
  IconHome2,
  IconLayoutGrid,
  IconListDetails,
  IconListSearch,
  IconMapPin,
  IconStar,
  IconUserCircle,
} from "@tabler/icons-react";

type SitemapPageProps = {
  locale: Locale;
};

const SitemapPage = ({ locale }: SitemapPageProps) => {
  const isRu = locale === "ru";

  const sections: Array<{
    titleRu: string;
    titleEn: string;
    descriptionRu: string;
    descriptionEn: string;
    icon: typeof IconCompass;
    links: Array<{ href: string; labelRu: string; labelEn: string }>;
  }> = [
    {
      titleRu: "Основные разделы",
      titleEn: "Main sections",
      descriptionRu: "Ключевые страницы платформы и каталог шаблонов.",
      descriptionEn: "Core pages of the platform and templates catalog.",
      icon: IconLayoutGrid,
      links: [
        { href: "/", labelRu: "Главная", labelEn: "Home" },
        { href: "/templates", labelRu: "Шаблоны", labelEn: "Templates" },
        { href: "/offers", labelRu: "Предложения", labelEn: "Offers" },
      ],
    },
    {
      titleRu: "Аккаунт и работа",
      titleEn: "Account and workflow",
      descriptionRu: "Профиль, управление заявками и личными шаблонами.",
      descriptionEn: "Profile, requests tracking and personal templates.",
      icon: IconUserCircle,
      links: [
        { href: "/profile", labelRu: "Профиль", labelEn: "Profile" },
      ],
    },
    {
      titleRu: "Справка и документы",
      titleEn: "Help and legal",
      descriptionRu: "FAQ, политика конфиденциальности и условия сервиса.",
      descriptionEn: "FAQ, privacy policy and platform terms.",
      icon: IconHelpCircle,
      links: [
        { href: "/faq", labelRu: "Частые вопросы", labelEn: "FAQ" },
        { href: "/privacy", labelRu: "Политика конфиденциальности", labelEn: "Privacy policy" },
        { href: "/terms", labelRu: "Условия использования", labelEn: "Terms of use" },
      ],
    },
  ];

  return (
    <Paper p={{ base: "md", md: "xl" }} radius="xl" withBorder>
      <Stack gap="md">
        <Group gap={10} wrap="nowrap">
          <ThemeIcon variant="light" size={32} radius="xl">
            <IconMapPin size={18} />
          </ThemeIcon>
          <Title order={1}>{isRu ? "Карта сайта" : "Sitemap"}</Title>
        </Group>
        <Text c="dimmed">
          {isRu
            ? "Выберите нужный раздел и перейдите к странице в один клик."
            : "Choose a section and jump to the target page in one click."}
        </Text>
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md" mt={6}>
          {sections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <Card key={section.titleEn} radius="lg" withBorder p="md">
                <Stack gap="sm">
                  <Group gap={8} wrap="nowrap">
                    <ThemeIcon variant="light" radius="xl" size={30}>
                      <SectionIcon size={16} />
                    </ThemeIcon>
                    <Text fw={700}>{isRu ? section.titleRu : section.titleEn}</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {isRu ? section.descriptionRu : section.descriptionEn}
                  </Text>
                  <Stack gap={6} mt={4}>
                    {section.links.map((item) => (
                      <Group key={item.href} gap={6} wrap="nowrap">
                        <ThemeIcon size={20} radius="xl" variant="transparent">
                          {item.href === "/" ? <IconHome2 size={14} /> : null}
                          {item.href === "/templates" ? <IconListSearch size={14} /> : null}
                          {item.href === "/offers" ? <IconListDetails size={14} /> : null}
                          {item.href === "/profile" ? <IconUserCircle size={14} /> : null}
                          {item.href === "/templates?onlyFavorites=true" ? <IconStar size={14} /> : null}
                          {item.href === "/faq" ? <IconHelpCircle size={14} /> : null}
                          {item.href === "/privacy" ? <IconFileDescription size={14} /> : null}
                          {item.href === "/terms" ? <IconFileText size={14} /> : null}
                        </ThemeIcon>
                        <Link href={item.href} locale={locale}>
                          {isRu ? item.labelRu : item.labelEn}
                        </Link>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default SitemapPage;
