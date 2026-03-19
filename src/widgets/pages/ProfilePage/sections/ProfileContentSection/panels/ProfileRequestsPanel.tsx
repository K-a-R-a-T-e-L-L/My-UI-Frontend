import { Box } from "@mantine/core";
import ProfilePanelLayout from "./ProfilePanelLayout";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import RequestsHistoryList from "@/entities/offers/ui/RequestsHistoryList/RequestsHistoryList";

interface ProfileRequestsPanelProps {
  templates: TemplateCardData[];
}

const ProfileRequestsPanel = ({ templates }: ProfileRequestsPanelProps) => {
  return (
    <ProfilePanelLayout title="Заявки">
      <Box mt={30}>
        <RequestsHistoryList
          templates={templates}
          emptyText="Пока нет заявок. Отправьте первый шаблон через страницу предложений."
        />
      </Box>
    </ProfilePanelLayout>
  );
};

export default ProfileRequestsPanel;
