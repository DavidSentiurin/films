import React from 'react';
import styles from '../../../../styles/components/Layout/Header/Header.module.scss';
import Link from 'next/link';
import { ROUTES } from '../../../constants';
import { SearchInput } from './index';
import { ISearchInputProps } from './SearchInput';

interface IHeaderProps {
  searchInputProps: ISearchInputProps;
}

export const Header: React.FC<IHeaderProps> = ({ searchInputProps }) => {
  return (
    <header className={styles['header']}>
      <div className={styles['header-logotype']}>
        <Link href={ROUTES.NOW_WATCHING.PATH}>
          <a>
            <span>FILMS</span>.
          </a>
        </Link>
      </div>

      <div className={styles['header-search']}>
        <SearchInput {...searchInputProps} />
      </div>
    </header>
  );
};
