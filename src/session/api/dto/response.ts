export interface IRequestTokenRes {
  success: boolean;
  expiresAt: string;
  requestToken: string;
}

export interface ISessionWithLoginRes {
  success: boolean;
  expiresAt: string;
  requestToken: string;
}

export interface ISessionIdRes {
  success: boolean;
  sessionId: string;
}

export interface ISessionIdRes {
  success: boolean;
  sessionId: string;
}

export interface IDeleteSessionRes {
  success: boolean;
}
