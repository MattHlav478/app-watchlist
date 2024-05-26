import React, {
  createContext,
  useState,
  useEffect,
  useTransition,
} from "react";
import preloadedMovies from "./preloadedmovies";

import { db, auth } from "../services/firebaseConnection";
import {
  doc,
  addDoc,
  setDoc,
  updateDoc,
  collection,
  getDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

// Creating a Context for the watch list which will be used to provide and consume the watch list data.
export const WatchListContext = createContext();

// Creating a Provider component that will wrap the children components and provide them with the watch list data.
export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [startTransition, isPending] = useTransition();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserMovieList = async () => {
      if (user) {
        let userMovieList = (await getDoc(doc(db, "movies", user.email))).data()
          .movies;
        setWatchList(userMovieList || []);
      } else {
        setWatchList([]); // Reset watchList when no user is signed in
      }
    };

    fetchUserMovieList();
  }, [user]); // Add user as a dependency to re-run the effect when user changes

  // Function to add a movie to the watch list.
  const addToWatchList = (movie) => {
    startTransition(() => {
      // Checking if the movie to be added already exists in the watch list based on its ID to prevent duplicates.
      const alreadyExists = watchList.some((item) => item.id === movie.id);
      if (!alreadyExists) {
        // If the movie doesn't exist, add it to the current watch list and update the state.
        setWatchList([...watchList, movie]);
        console.log(`User's movie list: ${watchList}`);
        setDoc(doc(db, "movies", user.email), {
          // push new movie title to movies array in firebase
          movies: [...watchList, movie.title],
        });
        setDoc(doc(db, "users", user.email), {
          timestamp: Date.now(),
        });
        setDoc(doc(db, "test_messages", user.email), {
          // to: (await getDoc(doc(db, "users", user.email))),
          body: `You added ${movie.title} to your watchlist!`,
        });
      }
    });
  };

  // Function to remove a movie from the watch list.
  const removeFromWatchList = (movieId) => {
    startTransition(() => {
      // Updating the watch list by filtering out the movie that matches the given ID.
      setWatchList(watchList.filter((movie) => movie.id !== movieId));
    });
  };

  // Returning the Provider component with the watch list state and functions as the value.
  // This will allow any child component to access the watch list data and functions.
  return (
    <WatchListContext.Provider
      value={{
        watchList,
        setWatchList,
        addToWatchList,
        removeFromWatchList,
        isPending,
      }}
    >
      {/* Rendering the children components passed to this Provider */}
      {children}
    </WatchListContext.Provider>
  );
};
