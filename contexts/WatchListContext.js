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
  const [watchLists, setWatchLists] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserMovieLists = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "movies", user.email));
        let userMovieLists = userDoc.exists()
          ? userDoc.data().watchLists
          : {};
        console.log("User movie lists:", Object.keys(userMovieLists).length);
        if (Object.keys(userMovieLists).length === 0) {
          userMovieLists = { Default: [] };
          setDoc(doc(db, "movies", user.email), { watchLists: userMovieLists });
        }
        setWatchLists(userMovieLists);
      } else {
        setWatchLists({});
      }
    };
    fetchUserMovieLists();
  }, [user]); // Add user as a dependency to re-run the effect when user changes

  // Function to add a movie to the watch list.
  const addToWatchList = (movie, listName) => {
    if (!listName) return;

    const updatedList = watchLists[listName] ? [...watchLists[listName]] : [];
    const alreadyExists = updatedList.some((item) => item.id === movie.id);
    if (!alreadyExists) {
      updatedList.push(movie);
      const updatedWatchLists = { ...watchLists, [listName]: updatedList };
      setWatchLists(updatedWatchLists);

      setDoc(doc(db, "movies", user.email), { watchLists: updatedWatchLists });
    }
  };

  // Function to remove a movie from the watch list.
  const removeFromWatchList = (movieId, listName) => {
    if (!listName) return;

    const updatedList = watchLists[listName].filter(
      (movie) => movie.id !== movieId
    );
    const updatedWatchLists = { ...watchLists, [listName]: updatedList };
    setWatchLists(updatedWatchLists);

    setDoc(doc(db, "movies", user.email), { watchLists: updatedWatchLists });
  };

  const createWatchList = (listName) => {
    if (!listName || watchLists[listName]) return;

    const updatedWatchLists = { ...watchLists, [listName]: [] };
    setWatchLists(updatedWatchLists);

    setDoc(doc(db, "users", user.email), { watchLists: updatedWatchLists });
  };

  // Returning the Provider component with the watch list state and functions as the value.
  // This will allow any child component to access the watch list data and functions.
  return (
    <WatchListContext.Provider
      value={{
        watchLists,
        setWatchLists,
        addToWatchList,
        removeFromWatchList,
        createWatchList,
      }}
    >
      {/* Rendering the children components passed to this Provider */}
      {children}
    </WatchListContext.Provider>
  );
};
