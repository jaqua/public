import { useAuthContext } from "@/contexts/AuthContext";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { Image, Text, View } from "react-native";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import CustomDrawerItem from "./CustomDrawerItem";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  const { logout, isLoggedIn } = useAuthContext();
  return (
    <DrawerContentScrollView {...props}>
      <View className="items-center w-full py-14 space-y-7">
        <View className="w-28 h-28 rounded-full ">
          <Image
            className="object-contain w-full h-full rounded-full"
            width={112}
            height={112}
            source={require("@@/assets/images/avatars/avatar1.png")}
          />
        </View>
        <Text className="text-3xl font-aeonisBold text-center">
          Name Surname
        </Text>
      </View>

      {isLoggedIn ? (
        <>
          <CustomDrawerItem
            Icon={HomeIcon}
            title="Main"
            onPress={() => {
              navigation.navigate("Category");
            }}
          />
          <CustomDrawerItem
            Icon={AdjustmentsHorizontalIcon}
            title="Settings"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
          <CustomDrawerItem
            Icon={AdjustmentsHorizontalIcon}
            title="Friends"
            onPress={() => {
              navigation.navigate("Friends");
            }}
          />
          <CustomDrawerItem
            Icon={ArrowLeftStartOnRectangleIcon}
            title="Logout"
            onPress={() => {
              logout().then((res) => {
                navigation.navigate("Login");
              });
            }}
          />
        </>
      ) : (
        <>
          <CustomDrawerItem
            Icon={UserIcon}
            title="Sign In"
            onPress={() => {
              navigation.navigate("LoginForm");
            }}
          />
        </>
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
