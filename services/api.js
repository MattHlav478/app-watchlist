// import { EXPO_PUBLIC_TMDB_API_KEY } from '@env';
// const API_KEY = EXPO_PUBLIC_TMDB_API_KEY;
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesByCategory = async (category, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${category}&sort_by=popularity.desc&primary_release_date.lte=${
        new Date().toISOString().split("T")[0]
      }&include_adult=false&include_video=false&page=${page}`
    );
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    return [];
  }
};

export const fetchTVShowsByCategory = async (category, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${category}&sort_by=popularity.desc&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows by category:", error);
    return [];
  }
};
export const searchAll = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    const data = await response.json();
    // filter out items that aren't tv shows or movies
    data.results = data.results.filter(
      (item) => item.media_type === "tv" || item.media_type === "movie"
    );
    // sort by popularity
    data.results.sort((a, b) => b.popularity - a.popularity);
    return data.results;
  } catch (error) {
    console.error("Error searching all:", error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    const data = await response.json();
    // sort by popularity
    data.results.sort((a, b) => b.popularity - a.popularity);
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const searchTVShows = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    const data = await response.json();
    // sort by popularity
    data.results.sort((a, b) => b.popularity - a.popularity);
    return data.results;
  } catch (error) {
    console.error("Error searching TV shows:", error);
    return [];
  }
};

// export const fetchMovieDetails = async (movieId) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     return null;
//   }
// };
