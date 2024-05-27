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

  useEffect(() => {
    if (Array.isArray(watchList)) {
      setIsSaved(watchList.some((item) => item.id === movieId));
    } else {
      console.error("watchList is not an array:", watchList);
    }
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
    let userMovieListData = (
      await getDoc(doc(db, "movies", user.email))
    ).data();
    let userMovieList = userMovieListData ? userMovieListData.movies : [];
    if (isSaved) {
      removeFromWatchList(movie.id);
      console.log(`User's movie list: ${userMovieList}`);
      setIsSaved(false);
    } else {
      addToWatchList(movie);
      setIsSaved(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={isSaved ? styles.removeButton : styles.saveButton}
        onPress={handleSaveButtonClick}
      >
        <Text style={styles.saveButtonText}>
          {isSaved ? "Remove from WatchList" : "Save to WatchList"}
        </Text>
      </TouchableOpacity>
      <ScrollView>
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
  // buttonView: {
  //   flex: 1,
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignSelf: "center",
  //   marginTop: 50,
  //   marginBottom: 10,
  //   width: "70%",
  // },
  saveButton: {
    backgroundColor: "#00adb5",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "70%",
  },
  removeButton: {
    backgroundColor: "#ff4757",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "70%",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});
