import { cookies } from "next/headers";
import { me, getMyTemplates, getMyFavorites } from "@/shared/api/generated/clients";
import { ProfileUser } from "./profile.types";
import { TemplateCardData } from "@/entities/templates/model/template.types";
import {
  BackendTemplate,
  BackendUser,
  mapBackendTemplate,
  mapBackendUserToProfileUser,
} from "./profile.mapper";

const resolveApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000";

const resolveAvatarUrl = (avatarUrl: string | null) => {
  if (!avatarUrl) return null;
  return avatarUrl.startsWith("/") ? `${resolveApiUrl()}${avatarUrl}` : avatarUrl;
};

export const getProfileDataServer = async (): Promise<{
  user: ProfileUser | null;
  templates: TemplateCardData[];
  favorites: TemplateCardData[];
}> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return { user: null, templates: [], favorites: [] };
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const backendUser = (await me({ headers })) as BackendUser;

    const [templatesResult, favoritesResult] = await Promise.allSettled([
      getMyTemplates({ params: { limit: 50, page: 1 }, headers }),
      getMyFavorites({ params: { limit: 50, page: 1 }, headers }),
    ]);

    const templatesPayload =
      templatesResult.status === "fulfilled" ? templatesResult.value : { items: [] };
    const favoritesPayload =
      favoritesResult.status === "fulfilled" ? favoritesResult.value : { items: [] };

    const templates = ((templatesPayload.items ?? []) as unknown as BackendTemplate[]).map(
      mapBackendTemplate
    );
    const favorites = ((favoritesPayload.items ?? []) as unknown as BackendTemplate[]).map(
      mapBackendTemplate
    );
    const visibleTemplates = templates.filter(
      (item) => item.status === "published" || item.status === "archived"
    );

    const user = mapBackendUserToProfileUser(
      backendUser,
      visibleTemplates.length,
      visibleTemplates.reduce((sum, item) => sum + item.likesCount, 0),
      resolveAvatarUrl
    );

    return { user, templates, favorites };
  } catch {
    return { user: null, templates: [], favorites: [] };
  }
};

export const getProfileUserServer = async (): Promise<ProfileUser | null> => {
  const profileData = await getProfileDataServer();
  return profileData.user;
};
