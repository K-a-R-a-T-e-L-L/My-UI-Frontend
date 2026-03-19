import { cookies } from "next/headers";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import { resolveMediaUrl } from "@/shared/lib/api/resolve-media-url";
import { getMyTemplates } from "@/shared/api/generated/clients";

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
  author: {
    id: item.author?.id ?? "",
    username: item.author?.username ?? null,
    firstname: item.author?.firstname ?? null,
    lastname: item.author?.lastname ?? null,
    avatarUrl: resolveMediaUrl(item.author?.avatarUrl ?? null),
  },
});

export type PaginatedOffersData = {
  items: TemplateCardData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const getMyOfferHistoryServer = async (): Promise<TemplateCardData[]> => {
  const paged = await getMyOfferHistoryPageServer(1, 50);
  return paged.items;
};

export const getMyOfferHistoryPageServer = async (
  page = 1,
  limit = 12
): Promise<PaginatedOffersData> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return { items: [], total: 0, page: 1, limit, totalPages: 1 };
  }

  try {
    const payload = await getMyTemplates({
      params: {
        limit,
        page,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    const items = ((payload.items ?? []) as unknown as BackendTemplate[]).map(mapTemplate);
    const total = Number(payload.total ?? 0);
    const safeLimit = Math.max(1, Number(payload.limit ?? limit));
    const safePage = Math.max(1, Number(payload.page ?? page));

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    };
  } catch {
    return { items: [], total: 0, page: 1, limit, totalPages: 1 };
  }
};
