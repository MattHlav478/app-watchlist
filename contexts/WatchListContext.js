import React, { createContext, useState } from 'react';
import preloadedMovies from './preloadedmovies';

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(preloadedMovies);

  const addToWatchList = (movie) => {
    // Check if the movie is already in the watchlist
    const alreadyExists = watchList.some((item) => item.id === movie.id);
    if (!alreadyExists) {
      setWatchList([...watchList, movie]);
    }
  };

    const removeFromWatchList = (movieId) => {
    setWatchList(watchList.filter((movie) => movie.id !== movieId));
  };

  return (
    <WatchListContext.Provider value={{ watchList, setWatchList, addToWatchList, removeFromWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};
