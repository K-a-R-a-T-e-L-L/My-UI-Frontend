export type TemplateCardData = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  tags: string[];
  preview: string | null;
  code: string;
  likesCount: number;
  isLiked?: boolean;
  copiesCount: number;
  status: "published" | "denied" | "pending" | "archived";
  message: string | null;
  category?: {
    id: string;
    nameRu: string;
    nameEn: string;
  } | null;
  author: {
    id: string;
    username: string | null;
    firstname: string | null;
    lastname: string | null;
    avatarUrl?: string | null;
  };
};
