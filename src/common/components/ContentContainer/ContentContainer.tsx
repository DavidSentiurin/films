import React from 'react';
import styles from '@/styles/common/components/ContentContainer/ContentContainer.module.scss';

interface IContentContainerProps {
  className?: string;
}

export const ContentContainer: React.FC<IContentContainerProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`${styles['container']} ${className}`}>{children}</div>
  );
};
