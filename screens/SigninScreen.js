import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signIn } from "../scripts/userAuth";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const res = await signIn(email, password);
    if (res.error) setError(res.error);
  };

  return (
    <View>
      <Text>Sign In</Text>
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
      <TouchableOpacity onPress={handleSubmit}>Submit</TouchableOpacity>
    </View>
  );
}
