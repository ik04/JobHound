export interface UserData {
  email: string;
  name: string;
  username: string;
  github_url: string;
  linkedin_url: string;
  token: string;
}

export interface ContextValue {
  user: UserData;
  isMobile: boolean;
}
