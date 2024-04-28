import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { createStackNavigator, Stack } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConnection";

import SignInScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import UserListScreen from "./screens/UserListScreen";
import DetailsScreen from "./screens/DetailsScreen";

// import components
import Header from "./components/Header";

// import contexts
import { WatchListProvider } from "./contexts/WatchListContext";

// import icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// create stack navigators
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const UserListStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStackScreen({ navigation, user, setUser }) {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
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
      <UserListStack.Screen name="UserList" component={UserListScreen} />
      <UserListStack.Screen name="Details" component={DetailsScreen} />
    </UserListStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   console.log(`User: ${auth}`);

  //   return unsubscribe; // Unsubscribe on unmount
  // }, [auth]);

  // if (loading) {
  // can return a loading spinner here
  //   return null; // Or return null to render nothing
  // }

  return (
    <WatchListProvider>
      <NavigationContainer>
        {user ? (
          // User is signed in
          <>
            <Header userInitial={user?.email?.[0]?.toUpperCase()} />
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
    </WatchListProvider>
  );
}
