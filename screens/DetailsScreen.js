import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { WatchListContext } from "../contexts/WatchListContext";

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

export default function DetailsScreen({ route }) {
  const [movie, setMovie] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // Add this line
  const movieId = route.params.movieId;
  const { addToWatchList, removeFromWatchList, watchList } = useContext(
    WatchListContext
  );

  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        // console.log("Movie details:", data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Add this useEffect
  useEffect(() => {
    setIsSaved(watchList.some((item) => item.id === movieId));
  }, [watchList, movieId]);

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleSaveButtonClick = async () => {
    const user = auth.currentUser;
    let userMovieList = (await getDoc(doc(db, "movies", user.email))).data()
      .movies;
    if (isSaved) {
      removeFromWatchList(movie.id);
      console.log(`User's movie list: ${userMovieList}`);
      await setDoc(doc(db, "movies", user.email), {
        // remove movie title from movies array in firebase
        movies: userMovieList.filter((title) => title !== movie.title),
      });

      setIsSaved(false);
    } else {
      addToWatchList(movie);

      // console.log(`User's movie list: ${userMovieList}`);
      // await setDoc(doc(db, "movies", user.email), {
      //   // push new movie title to movies array in firebase
      //   movies: [...userMovieList, movie.title],
      // });
      // await setDoc(doc(db, "users", user.email), {
      //   timestamp: Date.now(),
      // });
      // await setDoc(doc(db, "test_messages", user.email), {
      //   // to: (await getDoc(doc(db, "users", user.email))),
      //   body: `You added ${movie.title} to your watchlist!`,
      // });

      setIsSaved(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>
          Release Date: {movie.release_date}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <TouchableOpacity
          style={isSaved ? styles.removeButton : styles.saveButton}
          onPress={handleSaveButtonClick}
        >
          <Text style={styles.saveButtonText}>
            {isSaved ? "Remove from WatchList" : "Save to WatchList"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c2b",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#1c1c2b",
  },
  imageContainer: {
    padding: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  releaseDate: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 10,
  },
  overview: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#00adb5",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  removeButton: {
    backgroundColor: "#ff4757",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});
