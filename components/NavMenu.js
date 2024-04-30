import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
    ScrollView,
  Modal
} from "react-native";

export default function NavMenu({ navOpen, setNavOpen }) {
    // if (!navOpen) return null;
    const [modalVisible, setModalVisible] = useState(true);

  return (
   <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
          <Text>This is a modal!</Text>
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
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "red",
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  navText: {
    fontSize: 18,
    color: "white",
    padding: 16,
  },
});
