import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ userInitial }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>WatchList</Text>
      <TouchableOpacity style={styles.userInitialContainer}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.userInitial}>{userInitial}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 48,
    backgroundColor: '#1c1c2b',
    borderBottomColor: '#787878',
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInitialContainer: {
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: '#9370DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    marginRight: 5,
    paddingRight: 20,
    flex: 1,
    alignItems: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#9370DB',
    borderRadius: 5,
  },
  userInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
