import React from 'react';
import styles from '../../../../styles/components/Layout/Header/Header.module.scss';
import Link from 'next/link';
import { ROUTES } from '../../../../constants';
import { SearchInput } from './index';
import { ISearchInputProps } from './SearchInput';

interface IHeaderProps {
  searchInputProps: ISearchInputProps;
}

export const Header: React.FC<IHeaderProps> = ({ searchInputProps }) => {
  return (
    <header className={styles['header']}>
      <div className={styles['header-logotype']}>
        <Link href={ROUTES.NOW_WATCHING.path}>
          <a>
            <span>FILMS</span>.
          </a>
        </Link>
      </div>

      <ul className={styles['header-menu']}>
        <NavLink
          path={ROUTES.NOW_WATCHING.path}
          label={ROUTES.NOW_WATCHING.name}
        />
        <NavLink path={ROUTES.POPULAR.path} label={ROUTES.POPULAR.name} />
      </ul>

      <div className={styles['header-search']}>
        <SearchInput {...searchInputProps} />
      </div>
    </header>
  );
};

interface INavLinkProps {
  path: string;
  label: string;
}

const NavLink: React.FC<INavLinkProps> = ({ path, label }) => {
  return (
    <li className={styles['header-menu-link']}>
      <Link href={path}>
        <a>{label}</a>
      </Link>
    </li>
  );
};
