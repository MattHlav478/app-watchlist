import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import moment from "moment";

export default function MovieDetails({ movie }) {
  useEffect(() => {
    // console.log("MovieDetails movie:", movie.release_date);
  }, []);

  return (
    <>
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
          Release Date:{" "}
          {movie.release_date
            ? moment(movie.release_date).format("M/D/YYYY")
            : "N/A"}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});
