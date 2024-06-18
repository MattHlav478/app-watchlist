import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function TVShowDetails({ show }) {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{show.name}</Text>
        <Text style={styles.releaseDate}>
          Release Date: {show.first_air_date ? show.first_air_date : "N/A"}
        </Text>
        <Text style={styles.releaseDate}>
          Last Air Date: {show.last_air_date ? show.last_air_date : "N/A"}
        </Text>
        <Text style={styles.overview}>{show.overview}</Text>
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
