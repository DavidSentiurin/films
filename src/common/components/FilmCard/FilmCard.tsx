import React from 'react';
import { Card } from 'antd';
import styles from '@/styles/common/components/FilmCard/FilmCard.module.scss';
import { Image } from '../index';
import { ImageProps } from '../Image';

interface IFilmCardProps {
  title: string;
  release: string;
  genres: string;
  imgConfig: ImageProps;
}

export const FilmCard: React.FC<IFilmCardProps> = ({
  title,
  release,
  genres,
  imgConfig,
}) => {
  return (
    <Card cover={<Image alt={imgConfig.alt} {...imgConfig} />}>
      <h6 className={styles['card-title']}>{title}</h6>
      <p className={styles['card-release']}>Release: {release}</p>
      <p className={styles['card-genres']}>Genres: {genres}</p>
    </Card>
  );
};
