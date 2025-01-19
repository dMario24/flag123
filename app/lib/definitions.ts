export type Flag = {
  id: number;
  name: string;
  img_url: string;
  like_count: number;
};

export type FlagMeta = {
  id: number;
  name: string;
  img_url: string;
  like_count: number;
  latitude: number;
  longitude: number;
  source: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

