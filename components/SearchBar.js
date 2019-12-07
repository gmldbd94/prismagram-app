import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={{
      margin: 10,
      width: constants.width - 40,
      height: 40,
      backgroundColor: styles.lightGreyColor,
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
      alignSelf: "center",
      justifyContent: 'center',
      flex: 1
    }}
    returnKeyType="search"
    onChangeText={onChange}
    onEndEditing={onSubmit}
    value={value}
    placeholder={"Search"}
    placeholderTextColor={styles.darkGreyColor}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default SearchBar;
