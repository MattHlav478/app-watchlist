import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

export default function SearchResults({ results, onSelect }) {
  return (
    <FlatList
      style={styles.list}
      data={results}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => onSelect(item)}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
            }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.year}>
              {item.release_date.split('-')[0]}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    maxHeight: 300,
    marginHorizontal: 20,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ffffff',
  },
  image: {
    width: 40,
    height: 60,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  year: {
    color: '#ffffff',
    fontSize: 14,
  },
});
