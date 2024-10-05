import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import CustomModal from "./CustomModal";

const WatchListItem = ({ movie, navigation, onRemove }) => {
  const handleNavigate = (movie) => {
    const itemId = movie.id;
    navigation.navigate("Details", { itemId, itemType: "movie" });
  };

  const onEllipse = () => {
    console.log("onEllipse");
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
      <TouchableOpacity onPress={() => handleNavigate(movie)}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.releaseDate}>Release Date:</Text>
          <Text style={styles.releaseDate}>{movie.release_date}</Text>
          <Text style={styles.runtime}>Runtime: {movie.runtime} min</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.ellipseButton} onPress={onEllipse}>
        <Text style={styles.ellipseButton}>...</Text>
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
    // backgroundColor: "red",
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 5,
    // backgroundColor: 'blue',
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
    paddingTop: 10,
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
  ellipseButton: {
    backgroundColor: "#00adb5",
    padding: 10,
    borderRadius: 10,
  },
  ellipseButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default WatchListItem;
