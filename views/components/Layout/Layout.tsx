import React from 'react';
import { Header, ISearchInputProps } from './Header';
import styles from '../../../styles/components/Layout/Layout.module.scss';

interface ILayoutProps {
  searchInputProps: ISearchInputProps;
}

export const Layout: React.FC<ILayoutProps> = ({
  searchInputProps,
  children,
}) => {
  return (
    <div className={styles['layout']}>
      <div className={styles['layout-header']}>
        <Header searchInputProps={searchInputProps} />
      </div>

      <div style={{ overflowY: 'auto' }}>
        <main className={styles['layout-content']}>{children}</main>
      </div>
    </div>
  );
};
