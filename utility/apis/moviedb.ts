import axios from "axios";

const APIKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTZlNzllM2U3MDRlZDcyNWMyZjFhZGU1MTEzOWE1OCIsInN1YiI6IjYyZGI4OTU5ZTMyM2YzMDA1ZWQ0Njk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FOvr94CdXQoj_xZ2EArjQ0S1Nz-TndKdhuW7yKsK1m0";

export const movieDbGetRequest = async (httpUrl: string, keyName: string) => {
  let resp = await axios.get(httpUrl, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${APIKey}`,
    },
  });
  if (resp.status === 200) {
    return resp.data[keyName];
  } else {
    throw new Error("Problem Fetching Data");
  }
};

export const getTrendingMovies = async () =>
  await movieDbGetRequest(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
    "results"
  );
export const getMovieGenres = async () =>
  await movieDbGetRequest(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    "genres"
  );
export const getMoviesByGenre = async (genre: number, watchProviders: number[] | null) =>
  await movieDbGetRequest(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}${watchProviders !== null ? `with_providers=${watchProviders.join("|")}` : ``}`,
    "results"
  );
export const getMovieWatchProviders = async () =>
  await movieDbGetRequest(
    `https://api.themoviedb.org/3/watch/providers/movie?language=en-US`,
    "results"
  );
