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
import {
  handleSignIn,
  handleSignIn2,
  handlePasswordReset,
} from "../scripts/userAuth";
import { auth, db } from "../services/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../components/CustomModal";
import OptionModal from "../components/OptionModal";

export default function SignInScreen({
  navigation,
  user,
  setUser,
  UserFormContext,
}) {
  const { userFormData, setUserFormData } = useContext(UserFormContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  useEffect(() => {
    if (AsyncStorage.getItem("email") && AsyncStorage.getItem("password")) {
      setUserFormData({
        email: AsyncStorage.getItem("email"),
        password: AsyncStorage.getItem("password"),
      });
    } else {
      setUserFormData({ email: "", password: "" });
    }
  }, []);

  const handleInputChange = (name, value) => {
    setUserFormData({ ...userFormData, [name]: value });
    // console.log(userFormData);
  };

  const handleSubmit = async () => {
    try {
      const result = await handleSignIn2(
        userFormData.email,
        userFormData.password
      );
      if (result.error) {
        console.log(`Error: ${result.error}`);
        if (
          result.error ===
          "auth/invalid-value-(email),-starting-an-object-on-a-scalar-field-invalid-value-(password),-starting-an-object-on-a-scalar-field"
        ) {
          setErrorMessage("Email does not exist");
        }
        if (result.error === "auth/missing-email") {
          setErrorMessage("Email is required to sign in");
        }
        if (result.error === "auth/missing-password") {
          setErrorMessage("Password is required to sign in");
        }
        if (result.error === "auth/user-not-found") {
          setErrorMessage("User not found");
        }
        if (result.error === "auth/wrong-password") {
          setErrorMessage("Incorrect password");
        }
        if (
          result.error ===
          "auth/invalid-value-(password),-starting-an-object-on-a-scalar-field"
        ) {
          setErrorMessage("Invalid password");
        }
        if (result.error === "auth/too-many-requests") {
          setErrorMessage("Too many requests. Try again later.");
        }
        if (result.error === "auth/invalid-login-credentials") {
          setErrorMessage("Invalid login credentials");
        }
        if (result.error === "aauth/invalid-email") {
          setErrorMessage("Invalid email");
        }
      } else {
        // After sign-in is successful, navigate to another screen
        auth.onAuthStateChanged(function (user) {
          if (user) {
            console.log(`User: ${user.email} signed in successfully!`);
            setUser(true);
          }
        });
      }
    } catch (error) {
      console.error(`sign in error: ${error}`);
      setErrorMessage(error.message);
    }
  };

  const doResetStuff = async (email) => {
    handlePasswordReset(email);
    setModalOpen(false);
    setModalOpen2(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
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
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Not a member?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.buttonText}>Forgot Password?</Text>
        </TouchableOpacity>
        {modalOpen && (
          <OptionModal
          // setModalOpen={setModalOpen}
          // userFormData={userFormData}
          // handleInputChange={handleInputChange}
          >
            <TextInput
              style={styles.pwResetInput}
              textContentType="emailAddress"
              placeholder="Email"
              placeholderTextColor="#aaaaaa"
              keyboardType="email-address"
              onChangeText={(text) => handleInputChange("email", text)}
              required
            />
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => doResetStuff(userFormData.email)}
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
          </OptionModal>
        )}
        {modalOpen2 && (
          <OptionModal>
            <Text style={styles.text}>
              Password reset email sent successfully!
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalOpen2(false)}
            >
              <Text style={[styles.buttonText]}>Close</Text>
            </TouchableOpacity>
          </OptionModal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c2b",
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
  forgotButton: {
    width: "50%",
    height: 50,
    backgroundColor: "#393e46",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 40,
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
