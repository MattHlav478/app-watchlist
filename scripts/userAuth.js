import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../services/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
    });
    return true;
  } catch (error) {
    // console.log(error.code)
    if (error.code === "auth/email-already-in-use") {
      return { error: "Email already in use" };
    } else if (error.code === "auth/weak-password") {
      return { error: "Password is too weak" };
    } else if (error.code === "auth/invalid-email") {
      return { error: "Invalid email" };
    }
    // return { error: error.message };
    return error;
  }
};

export const handleSignIn = async (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password);
    console.log(auth)
    // After signing in, save the sign-in status to AsyncStorage
    try {
      const idToken = await auth.currentUser.getIdToken();
      await AsyncStorage.setItem("firebaseAuthToken", idToken);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/missing-password") {
        return { error: "Password is required to sign in" };
      } else if (error.code === "auth/missing-email") {
        return { error: "Email is required to sign in" };
      }
      // return { error: error.message };
      return error;
    }
    return { error: null }; // Add this line
  } catch (error) {
    return { error: error.message };
  }
};

export const handleSignIn2 = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await AsyncStorage.setItem("firebaseAuthToken", user.accessToken);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    return { error: null }; // Return an object with error set to null on success
  } catch (error) {
    console.log(`errorasdf ${error.code}`);
    return { error: error.code }; // Return an object with the error message
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

export const handlePasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully!");
    return true;
  } catch (error) {
    return false;
  }
};
