export interface INowPlaying {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: INowPlayingFilm[];
  totalPages: number;
  totalResults: number;
}

export interface INowPlayingFilm {
  posterPath: string;
  adult: boolean;
  overview: string;
  releaseDate: string;
  genreIds: number[];
  id: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAverage: number;
}
