import { Image, ImageBackground, StyleSheet, View } from "react-native";

import {
  LoginStackParamList,
  RootDrawerScreenProps,
} from "@/types/navigation.types";
import { getOrientation } from "@/utils/utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPasswordForm from "./nested/ForgotPasswordForm";
import LoginForm from "./nested/LoginForm";
import RegisterForm from "./nested/RegisterForm";
import SignInOptions from "./nested/SignInOptions";

type LoginScreenProps = RootDrawerScreenProps<"Login">;

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  // const { login } = useAuth();
  // const theme = ThemeConfig();
  // const [imageHeight, setImageHeight] = useState({ width: 0, height: 0 });
  // console.log({ imageHeight });
  const isLandscape = getOrientation();
  const bgImg = isLandscape
    ? require("@@/assets/baby/loginLandscape.png")
    : require("@@/assets/baby/loginPortrait.png");
  return (
    <View
      className="flex-1 "
      onLayout={(evt) => {
        // const { height, width } = evt.nativeEvent.layout;
        // setImageHeight({ height, width });
        // console.log({ height, width });
      }}>
      <ImageBackground
        style={styles.bgImageWrapper}
        imageStyle={styles.bgImage}
        source={bgImg}>
        <View className="w-full top-0 left-0 h-full absolute bg-primary flex-1 opacity-60"></View>

        <View className=" flex-1">
          <View className="container flex-row items-center  space-x-2 pt-6">
            <View className="flex-1 items-center">
              <Image
                source={require("@@/assets/logo/logo.png")}
                style={{
                  objectFit: "contain",
                  width: "85%",
                  maxWidth: 315,
                }}
              />
            </View>

            {/* <Pressable onPress={navigation.toggleDrawer}>
            <IconBar
              size={40}
              color={"#fff"}
            />
          </Pressable> */}
          </View>

          <View className=" flex-1 ">
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: "transparent",
                },
                animation: "slide_from_bottom",
              }}
              initialRouteName="SignInOptions">
              <Stack.Screen
                name="SignInOptions"
                component={SignInOptions}
              />

              <Stack.Screen
                name="LoginForm"
                component={LoginForm}
              />

              <Stack.Screen
                name="RegisterForm"
                component={RegisterForm}
              />

              <Stack.Screen
                name="ForgotPasswordForm"
                component={ForgotPasswordForm}
              />
            </Stack.Navigator>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImageWrapper: {
    flex: 1,
    position: "relative",
    // height: "100%",
  },
  bgImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    // objectFit: "contain",
  },
});

export default LoginScreen;
