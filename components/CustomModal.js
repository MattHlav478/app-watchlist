import React from "react";
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

export default function CustomModal({
  setModalOpen,
  handleInputChange,
  userFormData,
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
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handlePasswordReset(userFormData.email) && setModalOpen(false)
            }
          >
            <Text style={[styles.buttonText]}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalOpen(false)}
          >
            <Text style={[styles.buttonText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
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
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    // backgroundColor: "red",
  },
  resetButton: {
    backgroundColor: "#00adb5",
    borderRadius: 5,
    marginTop: 10,
    // marginHorizontal: 10,
    width: "40%",
  },
  closeButton: {
    backgroundColor: "#393e46",
    borderRadius: 5,
    marginTop: 10,
    // marginHorizontal: 10,
    width: "40%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
  pwResetInput: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
