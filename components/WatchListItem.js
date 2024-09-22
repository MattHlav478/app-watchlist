import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const WatchListItem = ({ movie, navigation, onRemove }) => {
  const handleNavigate = (movie) => {
    const itemId = movie.id;
    navigation.navigate("Details", { itemId, itemType: "movie" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigate(movie)}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>
          Release Date: {movie.release_date}
        </Text>
        <Text style={styles.runtime}>Runtime: {movie.runtime} min</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1c1c2b",
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  releaseDate: {
    color: "#ffffff",
    fontSize: 16,
  },
  runtime: {
    color: "#ffffff",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#ff4757",
    padding: 10,
    borderRadius: 10,
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default WatchListItem;
