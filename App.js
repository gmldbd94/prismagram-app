import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { Asset } from 'expo-asset';
import * as Font from 'expo-font'
import { AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  //AuthContext.js에서 처리하면 preloading을 표시하는데 문제가 생긴다.
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/logo.png")]);
      const cache = new InMemoryCache();
      //폰에 저장된 cahce 데이터를 동기화한다.
      await persistCache({
        cache,
        storage: AsyncStorage
      });

      //요청할 때마다 백엔드에 토큰을 함께 전달하는 겁니다.
      const client = new ApolloClient({
        cache,
        request: async operation => {
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` }
          });
        },
        ...apolloClientOptions
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if(!isLoggedIn || isLoggedIn === "false" ){
        setIsLoggedIn(false);
      } else{
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client !== null ?  (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
