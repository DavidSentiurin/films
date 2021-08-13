import React from 'react';
import { Pagination, PaginationProps, Spin, Typography } from 'antd';
import { ContentContainer, FilmCard } from 'src/common/components';
import { ROUTES } from 'src/common/constants';
import styles from '@/styles/now-playing/components/NowPlaying.module.scss';
import { GenresMap } from 'src/common/duck/Genres';
import { INowPlayingFilm } from '../api';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface INowPlayingProps {
  films: INowPlayingFilm[] | [];
  genres: GenresMap;
  paginationConfig: PaginationProps;
  loading?: boolean | null;
  error?: boolean | string;
}

export const NowPlaying: React.FC<INowPlayingProps> = ({
  films = [],
  genres = {},
  paginationConfig = {},
  loading,
  error,
}) => {
  const pageName = ROUTES.NOW_PLAYING.NAME;

  return (
    <ContentContainer className={styles['now-playing']}>
      <Title>{pageName}</Title>

      {error ? (
        <div className={styles['now-playing-error']}>
          <div className={styles['now-playing-error-image']}>
            <CloseCircleOutlined />
          </div>
          <p className={styles['now-playing-error-message']}>{error}</p>
        </div>
      ) : loading ? (
        <div className={styles['now-playing-loading']}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className={styles['now-playing-content']}>
            {films.map((filmData) => (
              <FilmCard
                key={filmData.id}
                imgConfig={{
                  src: filmData.posterPath,
                  imageUrlSize: 'w342',
                  loading: 'lazy',
                  alt: `${filmData.title} poster`,
                  layout: 'fill',
                }}
                title={filmData.title}
                release={filmData.releaseDate}
                genres={
                  Object.keys(genres).length > 0
                    ? filmData.genreIds
                        .map((genreId) => genres[genreId])
                        .join(', ')
                    : ''
                }
              />
            ))}
          </div>
          <div className={styles['now-playing-pagination']}>
            <Pagination {...paginationConfig} />
          </div>
        </>
      )}
    </ContentContainer>
  );
};
