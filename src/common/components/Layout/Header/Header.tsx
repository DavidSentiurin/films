import React from 'react';
import styles from '@/styles/common/components/Layout/Header/Header.module.scss';
import Link from 'next/link';
import { ROUTES } from '../../../constants';
import { SearchInput } from './index';
import { ISearchInputProps } from './SearchInput';
import { IsAuthorized, SignOut } from 'src/session/provider';
import { Button } from 'antd';

interface IHeaderProps {
  searchInputProps: ISearchInputProps;
  signOut: SignOut;
  isAuthorized: IsAuthorized;
}

export const Header: React.FC<IHeaderProps> = ({
  searchInputProps,
  signOut,
  isAuthorized,
}) => {
  if (isAuthorized) {
    return (
      <AuthorizedHeader searchInputProps={searchInputProps} signOut={signOut} />
    );
  }

  return <UnauthorizedHeader />;
};

interface IAuthorizedHeaderProps {
  searchInputProps: ISearchInputProps;
  signOut: SignOut;
}

const AuthorizedHeader: React.FC<IAuthorizedHeaderProps> = ({
  searchInputProps,
  signOut,
}) => {
  return (
    <header className={`${styles['header']} ${styles['authorized']}`}>
      <div className={styles['header-logotype']}>
        <Link href={ROUTES.NOW_PLAYING.PATH}>
          <a>
            <span>FILMS</span>.
          </a>
        </Link>
      </div>

      <div className={styles['header-search']}>
        <SearchInput {...searchInputProps} />
      </div>

      <div className={styles['header-auth']}>
        <Button type="link" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </header>
  );
};

const UnauthorizedHeader = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['header-logotype']}>
        <Link href={ROUTES.NOW_PLAYING.PATH}>
          <a>
            <span>FILMS</span>.
          </a>
        </Link>
      </div>
    </header>
  );
};
