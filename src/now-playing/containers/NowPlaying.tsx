import { isEmpty, isNumber, isString } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from 'src/common/constants';
import { fetchGenresAction, receiveGenres } from 'src/common/duck/Genres';
import { useAlert } from 'src/common/hooks';
import { NowPlaying } from '../components';
import {
  fetchNowPlayingAction,
  INowPlayingMap,
  receiveNowPlaying,
} from '../duck';

interface INowPlayingContainerProps {
  pageNumber: string;
}

export const NowPlayingContainer: React.FC<INowPlayingContainerProps> = ({
  pageNumber = '',
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const genresStore = useSelector(receiveGenres);
  const { films, loading, error } = useSelector(receiveNowPlaying);
  const { showAlert } = useAlert();

  // show pop-up errors if any
  useEffect(() => {
    if (!genresStore.loading && isString(genresStore.error)) {
      showAlert({
        content: genresStore.error,
        duration: 3,
        type: 'error',
      });
    }
  }, [showAlert, genresStore.error, genresStore.loading]);

  // fetch genres if them there not
  useEffect(() => {
    if (genresStore.loading === null) {
      dispatch(fetchGenresAction());
    }
  }, [genresStore.loading]);

  // fetch films data by page number
  useEffect(() => {
    const isNeedToFetch =
      pageNumber && isEmpty((films.map as INowPlayingMap)?.[pageNumber]);

    if (pageNumber && isNeedToFetch && !loading && !error) {
      dispatch(fetchNowPlayingAction(pageNumber));
    }
  }, [loading, films.map, pageNumber]);

  const onChangePaginationHandler = (page: number) => {
    if (page && isNumber(page) && !isNaN(Number(page))) {
      router.push(`${ROUTES.NOW_PLAYING.PATH}?page=${page}`);
    }
  };

  const paginationConfig = {
    defaultCurrent: 1,
    current: pageNumber ? Number(pageNumber) : undefined,
    onChange: onChangePaginationHandler,
    total: films.totalResults,
    pageSize: 20,
    showSizeChanger: false,
  };

  return (
    <NowPlaying
      loading={loading}
      error={error}
      genres={genresStore.genres.map}
      paginationConfig={paginationConfig}
      films={pageNumber && !isEmpty(films.map) ? films.map[pageNumber] : []}
    />
  );
};
