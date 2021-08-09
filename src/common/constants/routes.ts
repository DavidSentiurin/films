export interface IRoute {
  PATH: string;
  NAME: string;
  AUTHORIZED: {
    ACCESS: boolean;
    REDIRECT?: string;
  };
}

class Routes {
  readonly NOW_WATCHING: IRoute;
  readonly POPULAR: IRoute;
  readonly FAVORITES: IRoute;
  readonly FILM_PAGE: IRoute;
  readonly SIGN_IN: IRoute;

  constructor() {
    this.NOW_WATCHING = {
      PATH: '/now-watching',
      NAME: 'Now watching',
      AUTHORIZED: {
        ACCESS: true,
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
        REDIRECT: this.NOW_WATCHING.PATH,
      },
    };
  }
}

export const ROUTES = new Routes();
