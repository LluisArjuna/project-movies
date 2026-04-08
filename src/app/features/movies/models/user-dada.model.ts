import { Movie } from "./movie.model";

export interface UserMovie extends Movie {
  isFavorite?: boolean;
  userRating?: number; // 1–10
}