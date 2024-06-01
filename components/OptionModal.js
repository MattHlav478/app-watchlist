import React, { useRef, useState, useEffect, Children } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

import { handleSignOut, handlePasswordReset } from "../scripts/userAuth";

export default function OptionModal({
  setModalOpen,
  handleInputChange,
  userFormData,
  children,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      // visible={navOpen}
      // onRequestClose={() => {
      //   setModalOpen(false);
      // }}
    >
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
    height: "100%",
    backgroundColor: "#1c1c2b",
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
});
