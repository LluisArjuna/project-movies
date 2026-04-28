export interface Person {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  known_for_department: string;
}

export interface MovieCredit {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface PersonCredits {
  cast: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
    cast: MovieCredit[];
  }[];
}