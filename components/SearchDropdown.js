import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { searchMovies } from '../services/api';

const SearchDropdown = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
  navigation,
}) => {
  const handleChangeText = async (text) => {
    setSearchQuery(text);

    if (text.length >= 3) {
      const results = await searchMovies(text);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectMovie = (movieId) => {
    setSearchQuery('');
    setSearchResults([]);
    navigation.navigate('Details', { movieId });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={handleChangeText}
        placeholder="Search movies"
        placeholderTextColor="#aaa"
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.searchResult}
            onPress={() => handleSelectMovie(item.id)}
          >
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
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    color: '#fff',
    backgroundColor: '#2e2e38',
    borderRadius: 5,
    marginTop: 8,
    marginHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    fontSize: 16,
    marginBottom: 10,
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  poster: {
    width: 50,
    height: 75,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingLeft: 10,
  },
  year: {
    color: '#aaa',
  },
});

export default SearchDropdown;
