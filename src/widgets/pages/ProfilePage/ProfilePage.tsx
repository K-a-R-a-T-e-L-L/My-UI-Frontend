import { Stack } from "@mantine/core";
import ProfileHeroSection from "./sections/ProfileHeroSection/ProfileHeroSection";
import ProfileContentSection from "./sections/ProfileContentSection/ProfileContentSection";
import ProfileGuestSection from "./sections/ProfileGuestSection/ProfileGuestSection";
import { ProfileUser } from "./model/profile.types";
import { TemplateCardData } from "@/entities/templates/model/template.types";

interface ProfilePageProps {
  user: ProfileUser | null;
  templates: TemplateCardData[];
  favorites: TemplateCardData[];
}

const ProfilePage = ({ user, templates, favorites }: ProfilePageProps) => {
  if (!user) {
    return <ProfileGuestSection />;
  }

  return (
    <Stack gap={120}>
      <ProfileHeroSection user={user} />
      <ProfileContentSection user={user} templates={templates} favorites={favorites} />
    </Stack>
  );
};

export default ProfilePage;
