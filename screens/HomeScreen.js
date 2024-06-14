import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import MovieCarousel from "../components/MovieCarousel";
import TelevisionCarousel from "../components/TelevisionCarousel";
import SearchDropdown from "../components/SearchDropdown";
import { fetchMoviesByCategory, fetchTVShowsByCategory } from "../services/api";

export default function HomeScreen({ navigation }) {
  const [tab, setTab] = useState("movies");
  const [movieCategories, setMovieCategories] = useState([]);
  const [TVCategories, setTVCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async () => {
    const categories = [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ];

    const promises = categories.map(async (category) => {
      const movies = await fetchMoviesByCategory(category.id);
      return {
        ...category,
        // Get the 10 most recent movies and sort by popularity
        movies: movies.sort((a, b) => b.popularity - a.popularity).slice(0, 10),
      };
    });

    try {
      const results = await Promise.all(promises);
      setMovieCategories(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchTVShows = async () => {
    const categories = [
      {
        id: 10759,
        name: "Action & Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 10762,
        name: "Kids",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10763,
        name: "News",
      },
      {
        id: 10764,
        name: "Reality",
      },
      {
        id: 10765,
        name: "Sci-Fi & Fantasy",
      },
      {
        id: 10766,
        name: "Soap",
      },
      {
        id: 10767,
        name: "Talk",
      },
      {
        id: 10768,
        name: "War & Politics",
      },
      {
        id: 37,
        name: "Western",
      },
    ];

    const promises = categories.map(async (category) => {
      const shows = await fetchTVShowsByCategory(category.id);
      return {
        ...category,
        // Get the 10 most recent shows and sort by popularity
        shows: shows.sort((a, b) => b.popularity - a.popularity).slice(0, 10),
      };
    });

    try {
      const results = await Promise.all(promises);
      setTVCategories(results);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchTVShows();
  }, []);

  return (
    <View style={styles.container}>
      <SearchDropdown
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        navigation={navigation}
      />
      <View style={styles.typeTabsContainer}>
        <TouchableOpacity onPress={() => setTab("movies")}>
          <Text style={styles.typeTabsText}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("television")}>
          <Text style={styles.typeTabsText}>Television</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.carouselsContainer}>
        {tab === "movies"
          ? movieCategories.map((category) => (
              <MovieCarousel
                key={category.id}
                category={category.name}
                movies={category.movies}
                navigation={navigation}
              />
            ))
          : tab === "television" &&
            TVCategories.map((category) => (
              <TelevisionCarousel
                key={category.id}
                category={category.name}
                shows={category.shows}
                navigation={navigation}
              />
            ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  typeTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#1c1c2b",
  },
  typeTabsText: {
    color: "#ffffff",
    fontSize: 20,
  },
  carouselsContainer: {
    backgroundColor: "#1c1c2b",
  },
});
