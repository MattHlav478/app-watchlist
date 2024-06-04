import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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

import OptionModal from "../components/OptionModal";
import { Dropdown } from "react-native-element-dropdown";

export default function DetailsScreen({ route }) {
  const [movie, setMovie] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [creatingNewList, setCreatingNewList] = useState(false);

  const movieId = route.params.movieId;
  const { addToWatchList, removeFromWatchList, createWatchList, watchLists } = useContext(
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
    if (watchLists) {
      const isMovieSaved = Object.values(watchLists).some((list) =>
        list.some((item) => item.id === movieId)
      );
      setIsSaved(isMovieSaved);
    } else {
      console.error("watchLists is not an object:", watchLists);
    }
  }, [watchLists, movieId]);

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleSaveButtonClick = async (listName) => {
    if (listName === "Add New List" && newListName.trim()) {
      createWatchList(newListName.trim());
      addToWatchList(movie, newListName.trim());
    } else {
      addToWatchList(movie, listName);
    }
    setIsSaved(true);
    setModalOpen(false);
  };

  const handleRemoveButtonClick = async () => {
    removeFromWatchList(movie.id, value);
    setIsSaved(false);
  };

  return (
    <View style={styles.container}>
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

      {isSaved ? (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveButtonClick}
        >
          <Text style={styles.saveButtonText}>Remove from WatchList</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.saveButtonText}>Save to WatchList</Text>
        </TouchableOpacity>
      )}

      {modalOpen && (
        <OptionModal
          setModalOpen={setModalOpen}
          movie={movie}
          isSaved={isSaved}
        >
          <Text>Select List:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={Object.keys(watchLists)
              .map((listName) => ({
                label: listName,
                value: listName,
              }))
              .concat([{ label: "Add New List", value: "Add New List" }])}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select list" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setCreatingNewList(item.value === "Add New List");
              setIsFocus(false);
            }}
          />
          {creatingNewList && (
            <TextInput
              style={styles.input}
              placeholder="Enter new list name"
              value={newListName}
              onChangeText={setNewListName}
            />
          )}
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={() => handleSaveButtonClick(value)}
            >
              <Text style={[styles.buttonText]}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalOpen(false)}
            >
              <Text style={[styles.buttonText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </OptionModal>
      )}
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
  // BEGIN Modal styles
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  modalSaveButton: {
    backgroundColor: "#00adb5",
    borderRadius: 5,
    marginTop: 10,
    width: "40%",
  },
  closeButton: {
    backgroundColor: "#393e46",
    borderRadius: 5,
    marginTop: 10,
    width: "40%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
  // END Modal styles
  // BEGIN Dropdown
  dropdown: {
    height: 50,
    width: "90%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  // END Dropdown styles
});
