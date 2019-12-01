import React from "react";
import { View } from "react-native";
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
export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: "Home",
      headerRight: <MessagesLink />
    })
  },
  Search: {
    screen: stackFactory(Search, {
      title: "Search"
    })
  },
  Notifications: {
    screen: stackFactory(Notifications, {
      title: "Notifications"
    })
  },
  Profile: {
    screen: stackFactory(Profile, {
      title: "Profile"
    })
  }
});
