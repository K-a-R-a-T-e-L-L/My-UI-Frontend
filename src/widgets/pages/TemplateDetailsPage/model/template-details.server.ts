import { cookies } from "next/headers";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import { getMyTemplates, getTemplateById } from "@/shared/api/generated/clients";
import { resolveMediaUrl } from "@/shared/lib/api/resolve-media-url";

type BackendTemplate = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  tags?: string[];
  preview?: string | null;
  code?: string;
  likesCount?: number;
  isLiked?: boolean;
  copiesCount?: number;
  status: "published" | "denied" | "pending" | "archived";
  message?: string | null;
  category?: { id: string; nameRu: string; nameEn: string };
  author?: {
    id?: string;
    username?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    avatarUrl?: string | null;
  };
};

const mapTemplate = (item: BackendTemplate): TemplateCardData => ({
  id: item.id,
  name: item.name,
  description: item.description,
  createdAt: new Date(item.createdAt).toLocaleDateString("ru-RU"),
  tags: Array.isArray(item.tags) ? item.tags : [],
  preview: resolveMediaUrl(item.preview),
  code: item.code ?? "",
  likesCount: Number(item.likesCount ?? 0),
  isLiked: Boolean(item.isLiked),
  copiesCount: Number(item.copiesCount ?? 0),
  status: item.status,
  message: item.message ?? null,
  category: item.category
    ? {
        id: item.category.id,
        nameRu: item.category.nameRu,
        nameEn: item.category.nameEn,
      }
    : null,
  author: {
    id: item.author?.id ?? "",
    username: item.author?.username ?? null,
    firstname: item.author?.firstname ?? null,
    lastname: item.author?.lastname ?? null,
    avatarUrl: resolveMediaUrl(item.author?.avatarUrl ?? null),
  },
});

const findInMyTemplates = async (
  templateId: string,
  headers: { Authorization: string }
): Promise<TemplateCardData | null> => {
  const limit = 50;
  const first = await getMyTemplates({ params: { page: 1, limit }, headers });
  const firstItems = ((first.items ?? []) as unknown as BackendTemplate[]).map(mapTemplate);
  const direct = firstItems.find((item) => item.id === templateId);
  if (direct) return direct;

  const totalPages = Math.max(1, Math.ceil(Number(first.total ?? 0) / limit));
  for (let page = 2; page <= totalPages; page += 1) {
    const payload = await getMyTemplates({ params: { page, limit }, headers });
    const items = ((payload.items ?? []) as unknown as BackendTemplate[]).map(mapTemplate);
    const found = items.find((item) => item.id === templateId);
    if (found) return found;
  }

  return null;
};

export const getTemplateDetailsServer = async (
  templateId: string
): Promise<TemplateCardData | null> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;

  try {
    const payload = await getTemplateById(templateId, headers ? { headers } : {});
    return mapTemplate(payload as unknown as BackendTemplate);
  } catch {
    if (!headers) {
      return null;
    }
  }

  try {
    return await findInMyTemplates(templateId, headers as { Authorization: string });
  } catch {
    return null;
  }
};
