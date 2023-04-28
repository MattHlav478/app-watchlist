import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MovieCarousel from '../components/MovieCarousel';
import SearchDropdown from '../components/SearchDropdown';
import { fetchMoviesByCategory } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = async () => {
    const categories = [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 10751,
        name: 'Family',
      },
      {
        id: 14,
        name: 'Fantasy',
      },
      {
        id: 27,
        name: 'Horror',
      },
      {
        id: 9648,
        name: 'Mystery',
      },
      {
        id: 10749,
        name: 'Romance',
      },
      {
        id: 878,
        name: 'Science Fiction',
      },
      {
        id: 53,
        name: 'Thriller',
      },
      {
        id: 10752,
        name: 'War',
      },
      {
        id: 37,
        name: 'Western',
      },
    ];

    const promises = categories.map(async (category) => {
      const movies = await fetchMoviesByCategory(category.id);
      return {
        ...category,
        movies: movies.slice(0, 10), // Get the 10 most recent movies
      };
    });

    try {
      const results = await Promise.all(promises);
      setCategories(results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
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
      <ScrollView>
        {categories.map((category) => (
          <MovieCarousel
            key={category.id}
            category={category.name}
            movies={category.movies}
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
    backgroundColor: '#1c1c2b',
    paddingTop: 20,
  },
});
