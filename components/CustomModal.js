import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

import { handleSignOut } from "../scripts/userAuth";

export default function CustomModal({ setModalOpen, children }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      // visible={navOpen}
      // onRequestClose={() => {
      //   setModalOpen(false);
      // }}
    >
      <View style={[styles.navPanel]}>
        <TouchableOpacity
          onPress={() => {
            setModalOpen(false);
          }}
        >
          <Text style={[styles.navText]}>X</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          textContentType="emailAddress"
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange("email", text)}
          required
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  navPanel: {
    // position: "absolute",
    flex: 1,
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#1c1c2b",
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  navText: {
    fontSize: 18,
    color: "white",
    padding: 16,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
