import React, { PropsWithChildren } from "react";
import { View } from "react-native";

const AuthFormContainer = ({ children }: PropsWithChildren) => {
  return <View className="max-w-sm min-w-[350] self-center">{children}</View>;
};

export default AuthFormContainer;
