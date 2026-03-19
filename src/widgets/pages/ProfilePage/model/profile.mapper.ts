import { TemplateCardData } from "@/entities/templates/model/template.types";
import { resolveMediaUrl } from "@/shared/lib/api/resolve-media-url";
import { ProfileUser } from "./profile.types";

export type BackendUser = {
  id: string;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  description: string | null;
  avatarUrl: string | null;
  createdAt: string;
};

export type BackendTemplate = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  tags?: string[];
  preview?: string | null;
  likesCount?: number;
  isLiked?: boolean;
  copiesCount?: number;
  status: "published" | "denied" | "pending" | "archived";
  message?: string | null;
  code?: string;
  author?: {
    id?: string;
    username?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    avatarUrl?: string | null;
  };
};

export const mapBackendTemplate = (item: BackendTemplate): TemplateCardData => ({
  id: item.id,
  name: item.name,
  description: item.description,
  createdAt: new Date(item.createdAt).toLocaleDateString("ru-RU"),
  tags: Array.isArray(item.tags) ? item.tags : [],
  preview: resolveMediaUrl(item.preview),
  likesCount: Number(item.likesCount ?? 0),
  isLiked: Boolean(item.isLiked),
  copiesCount: Number(item.copiesCount ?? 0),
  status: item.status,
  message: item.message ?? null,
  author: {
    id: item.author?.id ?? "",
    username: item.author?.username ?? null,
    firstname: item.author?.firstname ?? null,
    lastname: item.author?.lastname ?? null,
    avatarUrl: resolveMediaUrl(item.author?.avatarUrl ?? null),
  },
  code: item.code ?? "",
});

export const mapBackendUserToProfileUser = (
  user: BackendUser,
  templatesCount: number,
  likesCount: number,
  resolveAvatarUrl: (avatarUrl: string | null) => string | null
): ProfileUser => {
  const firstname = user.firstname ?? "";
  const lastname = user.lastname ?? "";
  const displayName = `${firstname} ${lastname}`.trim() || user.username || "Пользователь";

  return {
    id: user.id,
    displayName,
    username: user.username ? `@${user.username}` : "Без username",
    firstname,
    lastname,
    registeredAt: new Date(user.createdAt).toLocaleDateString("ru-RU"),
    bio: user.description ?? "",
    hasBio: Boolean(user.description?.trim()),
    avatarUrl: resolveAvatarUrl(user.avatarUrl),
    stats: {
      templates: templatesCount,
      likes: String(likesCount),
    },
  };
};
