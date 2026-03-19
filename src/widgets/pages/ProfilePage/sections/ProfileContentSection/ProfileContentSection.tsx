import NumberSection from "@/shared/ui/NumberSection/NumberSection";
import Section from "@/shared/ui/Section/Section";
import ProfileContentSwitcher from "./ProfileContentSwitcher";
import ProfileTemplatesPanel from "./panels/ProfileTemplatesPanel";
import ProfileFavoritesPanel from "./panels/ProfileFavoritesPanel";
import ProfileSettingsPanel from "./panels/ProfileSettingsPanel";
import ProfileRequestsPanel from "./panels/ProfileRequestsPanel";
import { ProfileUser } from "../../model/profile.types";
import { TemplateCardData } from "@/entities/templates/model/template.types";

interface ProfileContentSectionProps {
  user: ProfileUser;
  templates: TemplateCardData[];
  favorites: TemplateCardData[];
}

const ProfileContentSection = ({ user, templates, favorites }: ProfileContentSectionProps) => {
  return (
    <Section ariaLabelledby="profile-content-title">
      <NumberSection tilt="right" number="02" />
      <ProfileContentSwitcher
        templatesPanel={<ProfileTemplatesPanel templates={templates} />}
        favoritesPanel={<ProfileFavoritesPanel favorites={favorites} />}
        requestsPanel={<ProfileRequestsPanel templates={templates} />}
        settingsPanel={<ProfileSettingsPanel user={user} />}
      />
    </Section>
  );
};

export default ProfileContentSection;
