import React from 'react';
import { Header, ISearchInputProps } from './Header';
import styles from '../../../styles/components/Layout/Layout.module.scss';
import { NavBar, NavLinks } from './NavBar';

interface ILayoutProps {
  searchInputProps: ISearchInputProps;
  navLinks: NavLinks;
}

export const Layout: React.FC<ILayoutProps> = ({
  searchInputProps,
  navLinks,
  children,
}) => {
  return (
    <div className={styles['layout']}>
      <div className={styles['layout-header']}>
        <Header searchInputProps={searchInputProps} />
      </div>

      <div className={styles['layout-content-wrapper']}>
        <div className={styles['layout-navbar']}>
          <NavBar navLinks={navLinks} />
        </div>

        <main className={styles['layout-content']}>{children}</main>
      </div>
    </div>
  );
};
