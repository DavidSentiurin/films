const routePath = '/authentication';

export const REQUEST_TOKEN = `${routePath}/token/new` as const;
export const SESSION_WITH_LOGIN =
  `${routePath}/token/validate_with_login` as const;
export const CREATE_SESSION = `${routePath}/session/new` as const;
export const DELETE_SESSION = `${routePath}/session` as const;
