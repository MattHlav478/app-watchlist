import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signUp } from "../scripts/userAuth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let password2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Passwords do not match");
    } else {
      setEmail("");
      setPassword("");
      const res = await signUp(email, password);
      if (res.error) setError(res.error);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        value={password2}
        secureTextEntry={true}
        placeholder="Reenter Password"
      />
      <TouchableOpacity>Submit</TouchableOpacity>
    </View>
  );
}
