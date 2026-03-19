import { Alert, Flex, Text } from "@mantine/core";
import CardMyComponent from "@/entities/profile/ui/CardMyComponent/CardMyComponent";
import ProfilePanelLayout from "./ProfilePanelLayout";
import { TemplateCardData } from "@/entities/templates/model/template.types";

interface ProfileTemplatesPanelProps {
  templates: TemplateCardData[];
}

const ProfileTemplatesPanel = ({ templates }: ProfileTemplatesPanelProps) => {
  const visibleTemplates = templates.filter(
    (template) => template.status === "published" || template.status === "archived"
  );

  return (
    <ProfilePanelLayout title="Мои шаблоны">
      {visibleTemplates.length === 0 ? (
        <Alert color="gray" variant="light" mt={30}>
          <Text>Пока нет опубликованных или архивных шаблонов.</Text>
        </Alert>
      ) : (
        <Flex wrap="wrap" gap={20} mt={30}>
          {visibleTemplates.map((template) => (
            <CardMyComponent key={template.id} template={template} />
          ))}
        </Flex>
      )}
    </ProfilePanelLayout>
  );
};

export default ProfileTemplatesPanel;
