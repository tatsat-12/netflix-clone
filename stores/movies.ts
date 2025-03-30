import { defineStore } from "pinia";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  [key: string]: any;
}

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: {} as Record<string, Movie>,
  }),

  actions: {
    addFilm(movieData: Movie) {
      this.movies[movieData.imdbID] = movieData;
    },

    getFilm(imdbID: string): Movie | undefined {
      return this.movies[imdbID];
    },

    async fetchMovie(imdbID: string): Promise<Movie | null> {
      const existingMovie = this.getFilm(imdbID);
      if (existingMovie) {
        return existingMovie;
      }

      try {
        const response = (await $fetch(`/api/movies/${imdbID}`)) as any;

        if (response) {
          this.addFilm(response);
          return response;
        } else {
          console.error(`Failed to fetch movie data for IMDb ID: ${imdbID}`);
          return null;
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
        return null;
      }
    },
  },
});
