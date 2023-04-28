import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import WatchListItem from '../components/WatchListItem';
import { WatchListContext } from '../contexts/WatchListContext';

export default function UserListScreen({ navigation }) {
  const { watchList, removeFromWatchList } = useContext(WatchListContext);
  const [filteredWatchList, setFilteredWatchList] = useState(watchList);

  const filterWatchList = (filterType) => {
    let filteredList;
    switch (filterType) {
      case 'category':
        filteredList = [...watchList].sort(
          (a, b) => a.genre_ids[0] - b.genre_ids[0]
        );
        break;
      case 'rating':
        filteredList = [...watchList].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;
      case 'runtime':
        filteredList = [...watchList].sort((a, b) => a.runtime - b.runtime);
        break;
      default:
        filteredList = watchList;
        break;
    }
    setFilteredWatchList(filteredList);
  };

  useEffect(() => {
    setFilteredWatchList(watchList);
  }, [watchList]);

  return (
    <View style={styles.container}>
      {watchList.length === 0 ? (
        <Text style={styles.emptyText}>Your WatchList is empty.</Text>
      ) : (
        <>
          {/* <View style={styles.filterButtonsContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterWatchList('category')}>
              <Text style={styles.filterButtonText}>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterWatchList('rating')}>
              <Text style={styles.filterButtonText}>Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterWatchList('runtime')}>
              <Text style={styles.filterButtonText}>Runtime</Text>
            </TouchableOpacity>
          </View> */}
          <FlatList
            data={filteredWatchList}
            renderItem={({ item }) => (
              <WatchListItem
                movie={item}
                onPress={() =>
                  navigation.navigate('Details', { movieId: item.id })
                }
                onRemove={() => removeFromWatchList(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c2b',
    paddingTop: 60,
    // marginTop: 28,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#00adb5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
