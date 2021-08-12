export interface IRoute {
  PATH: string;
  NAME: string;
  AUTHORIZED: {
    ACCESS: boolean;
    REDIRECT?: string;
  };
  PARAMS_LIST?: string[];
  PARAMS?: string;
}

class Routes {
  readonly NOW_PLAYING: IRoute;
  readonly POPULAR: IRoute;
  readonly FAVORITES: IRoute;
  readonly FILM_PAGE: IRoute;
  readonly SIGN_IN: IRoute;

  constructor() {
    this.NOW_PLAYING = {
      PATH: '/now-playing',
      NAME: 'Now playing',
      AUTHORIZED: {
        ACCESS: true,
      },
      PARAMS_LIST: ['page=1'],
      get PARAMS() {
        return this.PARAMS_LIST?.length
          ? this.PARAMS_LIST.map((p) => p).join('&')
          : '';
      },
    };

    this.POPULAR = {
      PATH: '/popular',
      NAME: 'Popular',
      AUTHORIZED: {
        ACCESS: true,
      },
    };

    this.FAVORITES = {
      PATH: '/favorites',
      NAME: 'Favorites',
      AUTHORIZED: {
        ACCESS: true,
      },
    };

    this.FILM_PAGE = {
      PATH: '/[filmID]',
      NAME: 'Film',
      AUTHORIZED: {
        ACCESS: true,
      },
    };

    this.SIGN_IN = {
      PATH: '/sign-in',
      NAME: 'Sign In',
      AUTHORIZED: {
        ACCESS: false,
        REDIRECT: this.NOW_PLAYING.PATH,
      },
    };
  }
}

export const ROUTES = new Routes();
