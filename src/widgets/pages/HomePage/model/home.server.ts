import { getDailyCopies, getOverview, getTemplates } from "@/shared/api/generated/clients";

type HomeTopTemplate = {
  id: string;
  name: string;
  description: string;
  likesCount: number;
  author: {
    username: string | null;
    firstname: string | null;
    lastname: string | null;
  };
};

type HomeShowcaseTemplate = {
  id: string;
  name: string;
  description: string;
  preview: string | null;
};

type ApiTemplateItem = {
  id: string;
  name: string;
  description: string;
  preview?: string | null;
  likesCount?: number;
  showInShowcase?: boolean;
  author: {
    username?: string | null;
    firstname?: string | null;
    lastname?: string | null;
  };
};

type HomeMetrics = {
  registeredUsers: number;
  activeAuthors: number;
  totalTemplates: number;
  copiesToday: number;
  copiesDaily: Array<{ date: string; copies: number }>;
};

export const getHomeTopTemplatesServer = async (): Promise<HomeTopTemplate[]> => {
  try {
    const data = await getTemplates({ sort: "likes", limit: 5, page: 1 });
    const items = (data.items ?? []) as ApiTemplateItem[];
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      likesCount: Number(item.likesCount ?? 0),
      author: {
        username: (item.author.username as string | null | undefined) ?? null,
        firstname: (item.author.firstname as string | null | undefined) ?? null,
        lastname: (item.author.lastname as string | null | undefined) ?? null,
      },
    }));
  } catch {
    return [];
  }
};

export const getHomeShowcaseTemplatesServer = async (): Promise<HomeShowcaseTemplate[]> => {
  try {
    const data = await getTemplates({ sort: "likes", limit: 50, page: 1 });
    const items = (data.items ?? []) as ApiTemplateItem[];
    return items
      .filter((item) => Boolean(item.showInShowcase))
      .slice(0, 4)
      .map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        preview: (item.preview as string | null | undefined) ?? null,
      }));
  } catch {
    return [];
  }
};

export const getHomeMetricsServer = async (): Promise<HomeMetrics> => {
  const fallback: HomeMetrics = {
    registeredUsers: 0,
    activeAuthors: 0,
    totalTemplates: 0,
    copiesToday: 0,
    copiesDaily: [],
  };

  try {
    const [overview, daily] = await Promise.all([getOverview(), getDailyCopies({ days: "8" })]);

    return {
      registeredUsers: Number(overview.registeredUsers ?? 0),
      activeAuthors: Number(overview.activeAuthors ?? 0),
      totalTemplates: Number(overview.totalTemplates ?? 0),
      copiesToday: Number(overview.copiesToday ?? 0),
      copiesDaily: (daily.items ?? []).map((item: { date: string; count: number }) => ({
        date: item.date,
        copies: Number(item.count ?? 0),
      })),
    };
  } catch {
    return fallback;
  }
};

export type { HomeTopTemplate, HomeMetrics, HomeShowcaseTemplate };
