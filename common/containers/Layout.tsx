import 'nprogress/nprogress.css';

import React, { ChangeEventHandler, useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SearchOutlined } from '@ant-design/icons';
import { Layout } from '../components';
import { NavLinks } from '../components/Layout/NavBar';
import { ROUTES } from '../constants';

// progress bar on all pages
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface ILayoutContainer {}

export const LayoutContainer: React.FC<ILayoutContainer> = ({ children }) => {
  /**
   * Getting rid of the bug on phones with bangs when using height: 100vh;
   * BUG - 100vh is not 100% on display height.
   */
  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const resizeHandler = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // We listen to the resize event
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  });

  const onSearchInput: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    console.log(target.value);
  };

  const navLinks: NavLinks = [
    {
      path: ROUTES.NOW_WATCHING.PATH,
      label: ROUTES.NOW_WATCHING.NAME,
    },
    {
      path: ROUTES.POPULAR.PATH,
      label: ROUTES.POPULAR.NAME,
    },
    {
      path: ROUTES.FAVORITES.PATH,
      label: ROUTES.FAVORITES.NAME,
    },
    {
      path: ROUTES.SIGN_IN.PATH,
      label: ROUTES.SIGN_IN.NAME,
    },
  ];

  return (
    <Layout
      searchInputProps={{
        placeholder: 'test',
        onChange: onSearchInput,
        allowClear: true,
        suffix: <SearchOutlined />,
      }}
      navLinks={navLinks}
    >
      {children}
    </Layout>
  );
};