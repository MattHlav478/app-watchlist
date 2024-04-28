import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { handleSignUp } from "../scripts/userAuth";
import { set } from "firebase/database";
import { auth } from "../services/firebaseConnection";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function SignupScreen({ navigation, user, setUser }) {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (name, value) => {
    setUserFormData({ ...userFormData, [name]: value });
    // console.log(userFormData);
  };

  const handleFormSubmit = async () => {
    console.log("submit clicked!");
    try {
      console.log(userFormData);
      // Assuming handleSignUp is properly defined to manage Firebase signup
      // const userCredential = await handleSignUp(userFormData.email, userFormData.password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userFormData.email,
        userFormData.password
      );
      // After signup is successful, navigate to another screen
      auth.onAuthStateChanged(function (user) {
        if (user) {
          // addDoc(collection(db, "users"), {
          //   uid: user.uid,
          //   email: user.email,
          // });
          console.log(`User: ${user}`);
          setUser(true);
        }
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        textContentType="emailAddress"
        placeholder="Username"
        placeholderTextColor="#aaaaaa"
        keyboardType="default"
        onChangeText={(text) => handleInputChange("username", text)}
        required
      />
      <TextInput
        style={styles.input}
        textContentType="emailAddress"
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
        required
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => handleInputChange("password", text)}
        required
      />
      {/* <TextInput
        style={styles.input}
        value={password2}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)} // Use onChangeText for React Native
      /> */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
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
