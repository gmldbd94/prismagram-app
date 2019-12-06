import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Signup,
    Login,
    Confirm

  },
  //다양한 설정이 가능하다.
  //https://reactnavigation.org/docs/en/hello-react-navigation.html

  {
    headerMode: "screen"
  }
);

export default createAppContainer(AuthNavigation);
