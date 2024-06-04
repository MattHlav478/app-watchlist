// Importing necessary hooks and components from React and React Native libraries.
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Importing custom components and context.
import WatchListItem from "../components/WatchListItem";
import { WatchListContext } from "../contexts/WatchListContext";

import { Dropdown } from "react-native-element-dropdown";

// The main component for the UserListScreen, where the user's watch list is displayed.
export default function UserListScreen({ navigation }) {
  // Accessing the watchList and removeFromWatchList function from the WatchListContext.
  const { watchLists, removeFromWatchList } = useContext(WatchListContext);
  const [currentList, setCurrentList] = useState("Default"); // Local state to track the current list being displayed.

  // BEGIN states for dropdown
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [creatingNewList, setCreatingNewList] = useState(false);
  // END states for dropdown

  // Local state to handle filtered version of the watch list.
  const [filteredWatchList, setFilteredWatchList] = useState(watchLists);

  // Function to filter the watch list based on different criteria like category, rating, or runtime.
  const filterWatchList = (filterType) => {
    let filteredList;
    // Using switch case to handle different filtering scenarios.
    switch (filterType) {
      case "category":
        // Sorting by category using the first genre ID.
        filteredList = [...watchLists].sort(
          (a, b) => a.genre_ids[0] - b.genre_ids[0]
        );
        break;
      case "rating":
        // Sorting by rating in descending order.
        filteredList = [...watchLists].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;
      case "runtime":
        // Sorting by runtime in ascending order.
        filteredList = [...watchLists].sort((a, b) => a.runtime - b.runtime);
        break;
      default:
        // Default case returns the unsorted watch list.
        filteredList = watchLists;
        break;
    }
    // Updating the local state with the filtered list.
    setFilteredWatchList(filteredList);
  };

  useEffect(() => {
    // console log the movies in the current watchlist
  }, []);

  // The main render return for the component.
  if (!watchLists) {
    return <Text>Loading...</Text>; // Render a loading message if watchList is not yet available
  } else {
    return (
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={Object.keys(watchLists).map((listName) => ({
            label: listName,
            value: listName,
          }))}
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
            setCurrentList(item.value);
            setIsFocus(false);
          }}
        />
        {/* Conditional rendering based on whether the watch list is empty. */}
        {watchLists.length === 0 ? (
          <Text style={styles.emptyText}>Your WatchList is empty.</Text>
        ) : (
          <>
            {/* FlatList to render each item in the current watch list. */}
            <FlatList
              data={Object.values(watchLists[currentList])}
              keyExtractor={(item) => item.id.toString()}
              key={currentList}
              renderItem={({ item }) => (
                <WatchListItem
                  movie={item}
                  onRemove={() => removeFromWatchList(item.id, currentList)}
                  navigation={navigation}
                />
              )}
            />
          </>
        )}
      </View>
    );
  }
}

// StyleSheet for styling the components in the render.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c2b",
  },
  emptyText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
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
