import { LoginStackScreenProps } from "@/types/navigation.types";
import { Pressable, Text, View } from "react-native";

type SignInOptionsProps = LoginStackScreenProps<"SignInOptions">;
const SignInOptions = ({ navigation }: SignInOptionsProps) => {
  return (
    <View className="container  space-y-8 mt-auto pb-24 max-w-sm self-center">
      <View className=" ">
        <Pressable
          onPress={() => {
            navigation.navigate("LoginForm");
          }}
          className="w-full h-14 rounded-full border-2 border-white items-center justify-center">
          <Text className="text-white font-bold text-[28px] font-aeonisBold">
            Sign In
          </Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("RegisterForm");
          }}
          className="w-full h-14 rounded-full border-2 border-white items-center justify-center">
          <Text className="text-white font-bold font-aeonisBold text-[28px]">
            Register
          </Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("ForgotPasswordForm");
          }}>
          <Text className="text-center text-secondary font-aeonisMedium text-xl">
            Forgot Password ?
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInOptions;
