import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieCard = React.memo(({ title, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 5,
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});
