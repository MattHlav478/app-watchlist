import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { createStackNavigator, Stack } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import SignInScreen from "./screens/SigninScreen";
import HomeScreen from "./screens/HomeScreen";
import UserListScreen from "./screens/UserListScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Header from "./components/Header";

import { WatchListProvider } from "./contexts/WatchListContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const UserListStack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
  const userInitial = "A";

  return (
    <WatchListProvider>
      <Header userInitial={userInitial} />
      <NavigationContainer>
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
      </NavigationContainer>
    </WatchListProvider>
  );
}
