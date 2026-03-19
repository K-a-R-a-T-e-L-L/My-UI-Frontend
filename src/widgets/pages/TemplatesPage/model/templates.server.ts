import { cookies } from "next/headers";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import { resolveMediaUrl } from "@/shared/lib/api/resolve-media-url";
import { getCategories, getMyFavorites, getMyTemplates, getTemplates } from "@/shared/api/generated/clients";

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

export type PaginatedTemplatesData = {
  items: TemplateCardData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TemplatesFilterParams = {
  search?: string;
  categoryId?: string;
  sort?: "newest" | "oldest" | "likes";
  tags?: string[];
  onlyFavorites?: boolean;
};

export type TemplateCategoryOption = {
  value: string;
  label: string;
};

type BackendCategory = {
  id: string;
  nameRu: string;
  nameEn: string;
};

export const getPublishedTemplatesServer = async (): Promise<TemplateCardData[]> => {
  try {
    const accessToken = (await cookies()).get("access_token")?.value;
    const payload = await getTemplates({
      params: {
        sort: "newest",
        limit: 30,
        page: 1,
      },
      ...(accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : {}),
    });
    return ((payload.items ?? []) as unknown as BackendTemplate[]).map(mapTemplate);
  } catch {
    return [];
  }
};

export const getPublishedTemplatesPageServer = async (
  page = 1,
  limit = 12,
  filters: TemplatesFilterParams = {}
): Promise<PaginatedTemplatesData> => {
  try {
    const accessToken = (await cookies()).get("access_token")?.value;
    const payload = await getTemplates({
      params: {
        sort: "newest",
        limit,
        page,
        search: filters.search?.trim() || undefined,
        categoryId: filters.categoryId || undefined,
        tags: filters.tags?.length ? filters.tags : undefined,
        onlyFavorites: filters.onlyFavorites || undefined,
        ...(filters.sort ? { sort: filters.sort } : {}),
      },
      ...(accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : {}),
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

export const getTemplateCategoriesServer = async (locale: "ru" | "en"): Promise<TemplateCategoryOption[]> => {
  try {
    const categories = (await getCategories()) as BackendCategory[];
    return categories.map((item) => ({
      value: item.id,
      label: locale === "en" ? item.nameEn : item.nameRu,
    }));
  } catch {
    return [];
  }
};

export const getMyTemplatesServer = async (): Promise<TemplateCardData[]> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return [];
  }

  try {
    const payload = await getMyTemplates({
      params: {
        limit: 50,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return ((payload.items ?? []) as unknown as BackendTemplate[]).map(mapTemplate);
  } catch {
    return [];
  }
};

export const getMyFavoritesServer = async (): Promise<TemplateCardData[]> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return [];
  }

  try {
    const payload = await getMyFavorites({
      params: {
        limit: 50,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return ((payload.items ?? []) as unknown as BackendTemplate[]).map(mapTemplate);
  } catch {
    return [];
  }
};
