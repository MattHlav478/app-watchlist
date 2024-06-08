import React from "react";
import {
  StyleSheet,
  View,
  Text,
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

export default function Dashboard({}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>User Email:</Text>
        <Text style={styles.text}>Sign Up Date:</Text>
        <Text style={styles.text}>Lists:</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#1c1c2b",
    color: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#ffffff",
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  }
});
