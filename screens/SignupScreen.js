import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { handleSignUp } from "../scripts/userAuth";
import { set } from "firebase/database";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../services/firebaseConnection";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import CustomModal from "../components/CustomModal";

export default function SignupScreen({
  user,
  setUser,
  navigation,
  UserFormContext,
}) {
  const { userFormData, setUserFormData } = useContext(UserFormContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserFormData({ email: "", password: "" });
  }, []);

  const handleInputChange = (name, value) => {
    setUserFormData({ ...userFormData, [name]: value });
    // console.log(userFormData);
  };

  const handleFormSubmit = async () => {
    console.log("submit clicked!");
    try {
      console.log(userFormData);
      await createUserWithEmailAndPassword(
        auth,
        userFormData.email,
        userFormData.password
      );
      // After signup is successful, navigate to another screen
      auth.onAuthStateChanged(function (user) {
        if (user) {
          addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
          });
          console.log(`User: ${user.email} signed up successfully!`);
          setUser(true);
        }
      });
    } catch (error) {
      console.error(`sign up error: ${error.code}`);
      setError(error.code);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        {/* <TextInput
          style={styles.input}
          textContentType="emailAddress"
          placeholder="Username"
          placeholderTextColor="#aaaaaa"
          keyboardType="default"
          onChangeText={(text) => handleInputChange("username", text)}
          required
        /> */}
        <TextInput
          style={styles.input}
          textContentType="emailAddress"
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange("email", text)}
          required
        />
        {error === "auth/email-already-in-use" ? (
          <Text style={styles.errorText}>Email already in use</Text>
        ) : null}
        {error === "auth/missing-email" ? (
          <Text style={styles.errorText}>Email is required</Text>
        ) : null}
        {error === "auth/invalid-email" ? (
          <Text style={styles.errorText}>Invalid email</Text>
        ) : null}
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => handleInputChange("password", text)}
          required
        />
        {error === "auth/weak-password" ? (
          <Text style={styles.errorText}>
            Password must be at least 6 characters
          </Text>
        ) : null}
        {error === "auth/missing-password" ? (
          <Text style={styles.errorText}>Password is required to sign up</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <View>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Already a member?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c2b", // Dark navy background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    marginTop: 50,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: "50%",
    height: 50,
    backgroundColor: "#00adb5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
});
