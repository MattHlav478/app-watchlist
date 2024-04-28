import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { createStackNavigator, Stack } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignInScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import UserListScreen from "./screens/UserListScreen";
import DetailsScreen from "./screens/DetailsScreen";

// import components
import Header from "./components/Header";

import { handleSignIn } from "./scripts/userAuth";

// import contexts
import { WatchListProvider } from "./contexts/WatchListContext";

// import icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { set } from "firebase/database";

// create stack navigators
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const UserListStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const UserFormContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(false);
  const [userFormData, setUserFormData] = useState({});
  const [userInitial, setUserInitial] = useState("!");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logAllStorage = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys(); // Retrieve all keys stored
        const items = await AsyncStorage.multiGet(keys); // Get all items for these keys
        console.log("storage items", items);
      } catch (error) {
        console.error("Failed to log storage:", error);
      }
    };

    const checkSignInStatus = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");
        if (email !== null) {
          await handleSignIn(email, password);
          // The user is signed in
          console.log("User is signed in");
          setUser(true);
        } else if (email === null) {
          // The user is not signed in
          console.log("User is not signed in");
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    // AsyncStorage.clear();
    logAllStorage();
    checkSignInStatus();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(`user: ${user.email}`);
        setUserInitial(user.email[0].toUpperCase());
      } else {
        console.log("No user is signed in");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <WatchListProvider>
      <UserFormContext.Provider value={{ userFormData, setUserFormData }}>
        <NavigationContainer>
          {user ? (
            // User is signed in
            <>
              <Header userInitial={userInitial} />
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarStyle: {
                    backgroundColor: "#1c1c2b",
                    padding: "2%",
                    height: 100,
                  },
                }}
              >
                <Tab.Screen
                  name="HomeStack"
                  component={HomeStackScreen}
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="magnify"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="UserList"
                  component={UserListStackScreen}
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="format-list-bulleted"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            </>
          ) : (
            <AuthStackScreen user={user} setUser={setUser} />
          )}
        </NavigationContainer>
      </UserFormContext.Provider>
    </WatchListProvider>
  );
}

function AuthStackScreen({ navigation, user, setUser }) {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn">
        {(props) => (
          <SignInScreen
            {...props}
            navigation={navigation}
            user={user}
            setUser={setUser}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp">
        {(props) => (
          <SignupScreen
            {...props}
            navigation={navigation}
            user={user}
            setUser={setUser}
          />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

function UserListStackScreen() {
  return (
    <UserListStack.Navigator
      screenOptions={{
        headerShown: false,
        background: "blue",
        tabBarActiveTintColor: "#1c1c2b",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <UserListStack.Screen
        name="UserListStackScreen"
        component={UserListScreen}
      />
      <UserListStack.Screen name="Details" component={DetailsScreen} />
    </UserListStack.Navigator>
  );
}
