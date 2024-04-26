// Importing necessary hooks and components from React and React Native libraries.
import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// Importing custom components and context.
import WatchListItem from '../components/WatchListItem';
import { WatchListContext } from '../contexts/WatchListContext';

// The main component for the UserListScreen, where the user's watch list is displayed.
export default function UserListScreen({ navigation }) {
  // Accessing the watchList and removeFromWatchList function from the WatchListContext.
  const { watchList, removeFromWatchList } = useContext(WatchListContext);
  // Local state to handle filtered version of the watch list.
  const [filteredWatchList, setFilteredWatchList] = useState(watchList);

  // Function to filter the watch list based on different criteria like category, rating, or runtime.
  const filterWatchList = (filterType) => {
    let filteredList;
    // Using switch case to handle different filtering scenarios.
    switch (filterType) {
      case 'category':
        // Sorting by category using the first genre ID.
        filteredList = [...watchList].sort(
          (a, b) => a.genre_ids[0] - b.genre_ids[0]
        );
        break;
      case 'rating':
        // Sorting by rating in descending order.
        filteredList = [...watchList].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;
      case 'runtime':
        // Sorting by runtime in ascending order.
        filteredList = [...watchList].sort((a, b) => a.runtime - b.runtime);
        break;
      default:
        // Default case returns the unsorted watch list.
        filteredList = watchList;
        break;
    }
    // Updating the local state with the filtered list.
    setFilteredWatchList(filteredList);
  };

  // useEffect hook to update the filtered watch list whenever the global watch list changes.
  useEffect(() => {
    // Set the filtered watch list to match the updated watch list.
    setFilteredWatchList(watchList);
    // Logging to the console for debugging purposes (should be removed in production).
    console.log(watchList);
    // Note: filterWatchList is a function. If you wanted to log its result, you should call it.
  }, [watchList]);

  // The main render return for the component.
  return (
    <View style={styles.container}>
      {/* Conditional rendering based on whether the watch list is empty. */}
      {watchList.length === 0 ? (
        <Text style={styles.emptyText}>Your WatchList is empty.</Text>
      ) : (
        <>
          {/* FlatList to render each item in the filtered watch list. */}
          <FlatList
            data={filteredWatchList} // Data source is the filtered watch list.
            renderItem={({ item }) => (
              // Render each item using the WatchListItem component.
              <WatchListItem
                movie={item}
                onPress={() =>
                  // Navigate to the Details screen when an item is pressed, passing the movie ID.
                  navigation.navigate('Details', { movieId: item.id })
                }
                onRemove={() => removeFromWatchList(item.id)} // Handle removal of an item.
              />
            )}
            keyExtractor={(item) => item.id.toString()} // Defining a unique key for each item.
            numColumns={1} // Number of columns in the grid.
          />
        </>
      )}
    </View>
  );
}

// StyleSheet for styling the components in the render.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c2b',
    paddingTop: 60,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  // Styles commented out as they are related to filter buttons which are not being used currently.
  // filterButtonsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginBottom: 10,
  // },
  // filterButton: {
  //   backgroundColor: '#00adb5',
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   borderRadius: 10,
  // },
  // filterButtonText: {
  //   color: '#ffffff',
  //   fontSize: 14,
  // },
});
