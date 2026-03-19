export type ProfileUser = {
  id: string;
  displayName: string;
  username: string;
  firstname: string;
  lastname: string;
  registeredAt: string;
  bio: string;
  hasBio: boolean;
  avatarUrl: string | null;
  stats: {
    templates: number;
    likes: string;
  };
};
