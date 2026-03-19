import { cookies } from "next/headers";
import { CurrentUser } from "./current-user.types";
import { me } from "@/shared/api/generated/clients";

export const getCurrentUserServer = async (): Promise<CurrentUser> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return null;
  }

  try {
    const user = await me({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      id: user.id,
      username: (user.username as string | null | undefined) ?? null,
      firstname: (user.firstname as string | null | undefined) ?? null,
      lastname: (user.lastname as string | null | undefined) ?? null,
      avatarUrl: (user.avatarUrl as string | null | undefined) ?? null,
    };
  } catch {
    return null;
  }
};
