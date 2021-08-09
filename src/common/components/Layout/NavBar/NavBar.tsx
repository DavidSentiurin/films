import React from 'react';
import Link from 'next/link';
import styles from '@/styles/common/components/Layout/NavBar/NavBar.module.scss';

interface INavBarProps {
  navLinks: NavLinks;
}

export type NavLinks = INavLinkProps[];

export const NavBar: React.FC<INavBarProps> = ({ navLinks = [] }) => {
  return (
    <nav className={styles['navbar']}>
      <ul className={styles['navbar-menu']}>
        {navLinks.map(({ path, label }) => (
          <NavLink key={path} path={path} label={label} />
        ))}
      </ul>
    </nav>
  );
};

interface INavLinkProps {
  path: string;
  label: string;
}

const NavLink: React.FC<INavLinkProps> = ({ path, label }) => {
  return (
    <li className={styles['navbar-menu-link']}>
      <Link href={path}>
        <a>{label}</a>
      </Link>
    </li>
  );
};
