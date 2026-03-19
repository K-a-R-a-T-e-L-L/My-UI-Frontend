import type { Metadata } from "next";
import ProfilePage from "@/widgets/pages/ProfilePage/ProfilePage";
import { getProfileDataServer } from "@/widgets/pages/ProfilePage/model/profile.server";
import { buildLocalizedMetadata } from "@/shared/lib/seo/metadata";

type LocaleProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return buildLocalizedMetadata({
    locale: isRu ? "ru" : "en",
    path: "/profile",
    title: isRu ? "Профиль пользователя" : "User profile",
    description: isRu
      ? "Управление профилем, шаблонами, избранным и заявками."
      : "Manage profile, templates, favorites and requests.",
  });
}

export default async function LocaleProfilePage({ params }: LocaleProfilePageProps) {
  await params;
  const profileData = await getProfileDataServer();

  return (
    <ProfilePage
      user={profileData.user}
      templates={profileData.templates}
      favorites={profileData.favorites}
    />
  );
}

