export interface MovieUI {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string | null;
  rating: number;
  releaseDate: string;
}

export interface Genre {
  id: number;
  name: string;
}