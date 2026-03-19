import CardComponent from "@/entities/templates/ui/CardComponent/CardComponent";
import { Alert, Flex, Text } from "@mantine/core";
import ProfilePanelLayout from "./ProfilePanelLayout";
import { TemplateCardData } from "@/entities/templates/model/template.types";

interface ProfileFavoritesPanelProps {
  favorites: TemplateCardData[];
}

const ProfileFavoritesPanel = ({ favorites }: ProfileFavoritesPanelProps) => {
  return (
    <ProfilePanelLayout title="Избранное">
      {favorites.length === 0 ? (
        <Alert color="gray" variant="light" mt={30}>
          <Text>Пока нет избранных шаблонов.</Text>
        </Alert>
      ) : (
        <Flex wrap="wrap" gap={20} mt={30}>
          {favorites.map((template) => (
            <CardComponent key={template.id} template={template} />
          ))}
        </Flex>
      )}
    </ProfilePanelLayout>
  );
};

export default ProfileFavoritesPanel;
