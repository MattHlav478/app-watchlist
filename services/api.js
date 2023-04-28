const API_KEY = '70e3c8b4ed316240a366de839cbf765d';
const API_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesByCategory = async (category, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${category}&sort_by=primary_release_date.desc&primary_release_date.lte=${new Date().toISOString().split('T')[0]}&include_adult=false&include_video=false&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies by category:', error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
