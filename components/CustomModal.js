import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

import { handleSignOut } from "../scripts/userAuth";

export default function CustomModal({ children }) {
   return (
    <Modal
      animationType="slide"
      transparent={true}
      // visible={navOpen}
      // onRequestClose={() => {
      //   setNavOpen(!navOpen);
      // }}
    >
      {children}
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
  logoutButton: {
    fontSize: 18,
    color: "white",
    padding: 16,
    backgroundColor: "white",
    color: "#1c1c2b",
  },
});
