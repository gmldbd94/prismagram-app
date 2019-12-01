import React, { Component } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
//TouchableOpacity 버전 확인 할 것 최신버전으 어떻게 하는지 모르겠음....1.3.0 버전 추천함
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>Auth Home</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <Text>Go to Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
      <Text>Go to Signup</Text>
    </TouchableOpacity>
  </View>
);
