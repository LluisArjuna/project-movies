export interface MovieCardUI {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string | null;
  rating: number;
  releaseDate: string;
  overview: string;
}

export interface MovieDetailUI extends MovieCardUI {
  runtime: number;
  genres: { id: number; name: string }[];
  director?: { id: number; name: string };
  cast: {
    id: number;
    name: string;
    character: string;
    profileUrl: string;
  }[];
}
export interface MovieDetail {
  id: number;
  title: string;
  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date: string;
  vote_average: number;

  runtime: number;

  genres: {
    id: number;
    name: string;
  }[];
}

export interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
  }[];
}