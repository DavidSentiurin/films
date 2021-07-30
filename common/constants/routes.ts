export const ROUTES = {
  NOW_WATCHING: {
    PATH: '/now-watching',
    NAME: 'Now watching',
    AUTHORIZED: true,
  },

  POPULAR: {
    PATH: '/popular',
    NAME: 'Popular',
    AUTHORIZED: true,
  },

  FAVORITES: {
    PATH: '/favorites',
    NAME: 'Favorites',
    AUTHORIZED: true,
  },

  FILM_PAGE: {
    PATH: '/[filmID]',
    NAME: 'Film',
    AUTHORIZED: true,
  },

  SIGN_IN: {
    PATH: '/sign-in',
    NAME: 'Sign In',
    AUTHORIZED: false,
  },
};
