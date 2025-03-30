
import { defineEventHandler, sendError } from "h3";

const OMDB_API_KEY = "63f45b6c";

const fetchMovieFromOMDb = async (imdbID: string) => {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`;
  const response = (await $fetch(url)) as any;
  return response;
};

export default defineEventHandler(async (event) => {
  const { imdbID } = event.context.params as { imdbID?: string };

  if (!imdbID) {
    return sendError(event, new Error("IMDb ID is required"));
  }

  if (!OMDB_API_KEY) {
    return sendError(event, new Error("OMDb API key is missing"));
  }

  try {
    const result = await fetchMovieFromOMDb(imdbID);

    if (result.Response === "True") {
      return result;
    } else {
      return sendError(event, new Error(`OMDb API Error: ${result.Error}`));
    }
  } catch (error) {
    console.error("OMDb fetch error:", error);
    return sendError(event, new Error("Failed to fetch movie data"));
  }
});
