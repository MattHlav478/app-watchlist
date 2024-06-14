import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const TelevisionCarousel = ({ category, shows, navigation }) => {
  const handleSelectShow = (showId) => {
    navigation.navigate("Details", { showId });
  };

  useEffect(() => {
    console.log("tv carousel mounted");
  }, []);

  const TVShowsWithImages = shows.filter((show) => show.poster_path);

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitle}>{category}</Text>
      <FlatList
        data={TVShowsWithImages}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectShow(item.id)}>
            <View style={styles.card}>
              <Image
                style={styles.poster}
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                }}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.year}>
                {new Date(item.release_date).getFullYear()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 30,
  },
  carouselTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft: 10,
  },
  carousel: {
    paddingLeft: 10,
  },
  card: {
    width: 120,
    marginRight: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 5,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  year: {
    color: "#aaa",
    fontSize: 12,
  },
});

export default TelevisionCarousel;
