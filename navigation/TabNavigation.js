import React from "react";
import { Platform } from "react-native";
import { View } from "react-native";
import NavIcon from "../components/NavIcon";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator} from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
//https://reactnavigation.org/docs/en/tab-based-navigation.html 참고할 것
// jelloooooo: {
//   screen: Home,
//   title: "lalalalala"
// },

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });
//인덱스가 첫번째인 것이 첫화면이다.
export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: <NavIcon name="logo-instagram" size={36} />
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        title: "Search"
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-add" : "md-add"} />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications"
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-heart" : "md-heart"} />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile"
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);
