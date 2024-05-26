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

export default function NavMenu({ navOpen, setNavOpen, user, setUser }) {
  // if (!navOpen) return null;
  // const [navOpen, setNavOpen] = useState(true);

  const logOutPress = async () => {
    const logOut = await handleSignOut();
    if (logOut) {
      setUser(false);
      setNavOpen(!navOpen);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={navOpen}
      onRequestClose={() => {
        setNavOpen(!navOpen);
      }}
    >
      <View style={[styles.navPanel]}>
        <TouchableOpacity
          onPress={() => {
            setNavOpen(!navOpen);
            console.log("X clicked");
          }}
        >
          <Text style={[styles.navText]}>X</Text>
        </TouchableOpacity>
        <Text style={[styles.navText]}>Dashboard</Text>
        <Text style={[styles.navText]}>Settings</Text>
        <Text style={[styles.navText]} onPress={() => logOutPress()}>
          Log Out
        </Text>
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
});
