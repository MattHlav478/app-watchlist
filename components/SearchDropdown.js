import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { searchMovies, searchTVShows, searchAll } from "../services/api";

const SearchDropdown = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
  navigation,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();

  const handleChangeText = async (text) => {
    setSearchQuery(text);

    if (text.length >= 3) {
      const results = await searchAll(text);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleClearInput = () => {
    setSearchQuery("");
    setIsFocus(false);
    setSearchResults([]);
    inputRef.current.blur();
  };

  const handleSelectMovie = (movieId) => {
    setSearchQuery("");
    setSearchResults([]);
    navigation.navigate("Details", { movieId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={searchQuery}
          onChangeText={handleChangeText}
          placeholder="Search movies"
          placeholderTextColor="#aaa"
          onFocus={() => setIsFocus(true)}
        />
        {isFocus && (
          <TouchableOpacity
            style={styles.clearInputButton}
            onPress={handleClearInput}
          >
            <Text style={styles.clearInputText}>x</Text>
          </TouchableOpacity>
        )}
      </View>
      {isFocus && searchResults.length !== 0 && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c2b",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginVertical: 10,
  },
  input: {
    position: "absolute",
    left: 0,
    color: "#fff",
    backgroundColor: "#2e2e38",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    width: "90%",
    fontSize: 16,
  },
  clearInputButton: {
    position: "absolute",
    right: 35,
    color: "#aaa",
  },
  clearInputText: {
    color: "#aaa",
    fontSize: 24,
  },
  searchResult: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  poster: {
    width: 50,
    height: 75,
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingLeft: 10,
  },
  year: {
    color: "#aaa",
  },
});

export default SearchDropdown;
