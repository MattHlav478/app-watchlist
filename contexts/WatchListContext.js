import React, { createContext, useState } from "react";
import preloadedMovies from "./preloadedmovies";

// Creating a Context for the watch list which will be used to provide and consume the watch list data.
export const WatchListContext = createContext();

// Creating a Provider component that will wrap the children components and provide them with the watch list data.
export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(preloadedMovies);

  // Function to add a movie to the watch list.
  const addToWatchList = (movie) => {
    // Checking if the movie to be added already exists in the watch list based on its ID to prevent duplicates.
    const alreadyExists = watchList.some((item) => item.id === movie.id);
    if (!alreadyExists) {
      // If the movie doesn't exist, add it to the current watch list and update the state.
      setWatchList([...watchList, movie]);
    }
  };

  // Function to remove a movie from the watch list.
  const removeFromWatchList = (movieId) => {
    // Updating the watch list by filtering out the movie that matches the given ID.
    setWatchList(watchList.filter((movie) => movie.id !== movieId));
  };

  // Returning the Provider component with the watch list state and functions as the value.
  // This will allow any child component to access the watch list data and functions.
  return (
    <WatchListContext.Provider
      value={{ watchList, setWatchList, addToWatchList, removeFromWatchList }}
    >
      {/* Rendering the children components passed to this Provider */}
      {children}
    </WatchListContext.Provider>
  );
};
