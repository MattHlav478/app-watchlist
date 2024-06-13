import React from "react";
import { View, StyleSheet, Modal } from "react-native";

export default function OptionModal({ children }) {
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    // position: "absolute",
    flex: 1,
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "#1c1c2b",
    justifyContent: "center",
    alignItems: "center",
  },
});
