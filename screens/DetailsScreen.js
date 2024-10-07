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

import OptionModal from "../components/OptionModal";
import MovieDetails from "../components/MovieDetails";
import TVShowDetails from "../components/TVShowDetails";
import { Dropdown } from "react-native-element-dropdown";

export default function DetailsScreen({ route }) {
  const [item, setItem] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [currentMovieWatchlist, setCurrentMovieWatchlist] = useState([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [newListName, setNewListName] = useState(null);
  const [creatingNewList, setCreatingNewList] = useState(false);

  const itemId = route.params.itemId; // Get movieId from route params which comes from navigation
  const itemType = route.params.itemType; // Get itemType from route params which comes from navigation
  const {
    addToWatchList,
    removeFromWatchList,
    createWatchList,
    watchLists,
  } = useContext(WatchListContext);

  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    // console.log("itemType:", itemType);
    // console.log("itemId:", itemId);
    const fetchMovieOrShowDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${itemType}/${itemId}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        // console.log("Movie/TV details:", data);
        setItem(data);
        return data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    let itemInfo = fetchMovieOrShowDetails();
    setItem(itemInfo);
    // console.log("itemInfo:", itemInfo);
  }, [itemId]);

  useEffect(() => {
    if (watchLists) {
      const isMovieSaved = Object.values(watchLists).some((list) =>
        list.some((item) => item.id === itemId)
      );
      setIsSaved(isMovieSaved);
      // console.log the watchlist with this movie on it
      // console.log("isMovieSaved:", isMovieSaved);
      const currentWatchlist = Object.keys(watchLists).filter((list) =>
        watchLists[list].some((item) => item.id === itemId)
      );
      setCurrentMovieWatchlist(currentWatchlist);
    } else {
      console.error("watchLists is not an object:", watchLists);
    }
  }, [watchLists, itemId]);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleSaveButtonClick = async (listName) => {
    console.log("listName:", listName);
    if (listName == null) {
      console.log("No list name entered");
    } else if (listName === "Add New List" && newListName.trim()) {
      createWatchList(newListName.trim());
      addToWatchList(item, newListName.trim());
    } else {
      addToWatchList(item, listName);
    }
    setIsSaved(true);
    setModalOpen(false);
  };

  const handleRemoveButtonClick = async (listname) => {
    removeFromWatchList(item.id, listname);
    setIsSaved(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {itemType === "movie" ? (
          <MovieDetails movie={item} />
        ) : (
          <TVShowDetails show={item} />
        )}
      </ScrollView>

      {isSaved ? (
        <>
          {currentMovieWatchlist.map((listName) => (
            <TouchableOpacity
              key={listName}
              style={styles.removeButton}
              onPress={() => handleRemoveButtonClick(listName)}
            >
              <Text
                style={styles.saveButtonText}
              >{`Remove from ${listName}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : null}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => setModalOpen(true)}
      >
        <Text style={styles.saveButtonText}>Add</Text>
      </TouchableOpacity>

      {/* BEGIN Add List Modal */}
      {modalOpen && (
        <OptionModal setModalOpen={setModalOpen} movie={item} isSaved={isSaved}>
          <Text
            style={[
              {
                color: "#ffffff",
                fontSize: 20,
              },
            ]}
          >
            Select List:
          </Text>
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
            // placeholder={watchLists[0]}
            placeholder={!isFocus ? "Select list" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              if (item.value === "Select List") {
                return;
              } else {
                setValue(item.value);
                setCreatingNewList(item.value === "Add New List");
                setIsFocus(false);
              }
            }}
          />
          {creatingNewList && (
            <OptionModal>
              <TextInput
                style={styles.input}
                placeholder="Enter new list name"
                value={newListName}
                onChangeText={setNewListName}
              />
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
      {/* END Add List Modal */}
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
    backgroundColor: "transparent",
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
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#aaa",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
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
  // END Dropdown styles
});
