export interface IRequestTokenRes {
  success: boolean;
  expiresAt: string;
  requestToken: string;
}

export interface ISessionIdRes {
  success: boolean;
  sessionId: string;
}
