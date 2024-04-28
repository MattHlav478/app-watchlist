import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
    return { error: error.message };
  }
};

export const handleSignIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return { error: error.message };
  }
  // After signing in, save the sign-in status to AsyncStorage
  try {
    const idToken = await auth.currentUser.getIdToken();
    await AsyncStorage.setItem("firebaseAuthToken", idToken);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
  } catch (error) {
    // Error saving data
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};
