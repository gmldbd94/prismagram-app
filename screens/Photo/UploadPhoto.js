import React, { useState } from "react";
import axios from "axios";
import { Image, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

//안드로이드 방식과 ios 방식을 구별해줘야 한다.
import { Platform } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const photo = navigation.getParam("photo");
  const captionInput = useInput("dfdf");
  const locationInput = useInput("dfdfd");
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    if(Platform.OS === "android"){
      console.log(type.toLowerCase());
      formData.append("file", {
        name,
        type: "image/jpeg",
        uri: photo.uri
      });
    }
    else{
      formData.append("file", {
        name,
        type: type.toLowerCase(),
        uri: photo.uri
      });
    }

    console.log(formData);
    //192.168.43.92
    try {
      setIsLoading(true);
      const{
        data: { location }
      } =
      await axios.post("http://7408b66e.ngrok.io/api/upload", formData, {
        headers: {
            "content-type": "multipart/form-data"
          }
      });
      setFilUrl(location);
      // const{
      //   data: { location }
      // } = await axios.post("http://192.168.43.92:4000", formData, {
      //   headers: {
      //     "content-type": "multipart/form-data"
      //   }
      // });
      // .then(function (response) {
      // console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      // setFileUrl(location);
    } catch (e) {
      console.log(e);
      Alert.alert("Can't upload", "Try later");
    } finally{
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
