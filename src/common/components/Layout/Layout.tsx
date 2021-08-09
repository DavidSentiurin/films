import React from 'react';
import { Header, ISearchInputProps } from './Header';
import styles from '@/styles/common/components/Layout/Layout.module.scss';
import { NavBar, NavLinks } from './NavBar';
import { IsAuthorized, SignOut } from 'src/session';

interface ILayoutProps {
  searchInputProps: ISearchInputProps;
  navLinks: NavLinks;
  isAuthorized: IsAuthorized;
  signOut: SignOut;
}

export const Layout: React.FC<ILayoutProps> = ({
  searchInputProps,
  navLinks,
  children,
  isAuthorized,
  signOut,
}) => {
  return (
    <div className={styles['layout']}>
      <div className={styles['layout-header']}>
        <Header
          isAuthorized={isAuthorized}
          searchInputProps={searchInputProps}
          signOut={signOut}
        />
      </div>

      <div
        className={
          styles[
            isAuthorized
              ? 'layout-content-wrapper-authorized'
              : 'layout-content-wrapper'
          ]
        }
      >
        {isAuthorized && (
          <div className={styles['layout-navbar']}>
            <NavBar navLinks={navLinks} />
          </div>
        )}

        <main className={styles['layout-content']}>{children}</main>
      </div>
    </div>
  );
};
