export interface ITwitchUser {
  data: NestedUser[];
}

interface NestedUser {
  id: number;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
}
