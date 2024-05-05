import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import BasicAppBar from "@/components/headers/BasicAppBar";
import SearchBar from "@/components/inputs/SearchBar";
import PhotoPicker from "@/components/picker/PhotoPicker";
import { getOrientation } from "@/utils/utils";
import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";

type ProfileInputProps = {
  title: string;
  placeholder: string;
  defaultValue: string;
  secure?: boolean;
};
const ProfileInput = ({
  title,
  placeholder,
  defaultValue,
  secure,
}: ProfileInputProps) => {
  const [v, setV] = useState(defaultValue ? defaultValue : "");
  return (
    <View className="pt-5">
      <Text className="text-basicGrey">{title}</Text>
      <TextInput
        className="w-full py-2 text-lg border-b-2 border-accent "
        onChangeText={setV}
        value={v}
        placeholder={placeholder}
        keyboardType="web-search"
        secureTextEntry={!!secure}
      />
    </View>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const onCancel = useCallback(() => {
    navigation.goBack();
  }, []);
  const isLandscape = getOrientation() === "landscape";
  return (
    <View className="flex-1">
      <BasicAppBar title="" />

      {isLandscape ? (
        <View className="container pt-6 flex-row">
          <Text className="font-aeonisBold text-4xl text-primary">
            Edit Profile
          </Text>

          <View className="w-1/2 ml-auto">
            <SearchBar />
          </View>
        </View>
      ) : null}

      <View className="container py-6 flex-row items-center border-b-2 border-neutral-200">
        <Pressable onPress={onCancel}>
          <Text className="text-lg">Cancel</Text>
        </Pressable>

        <View className="mx-auto">
          {isLandscape ? null : (
            <Text className="text-[27px] font-bold font-aeonis">
              Edit Profile
            </Text>
          )}
        </View>

        <Pressable>
          <Text className="text-lg">Save</Text>
        </Pressable>
      </View>

      <ScrollView className="w-4/5 pt-12 self-center flex-1 h-full">
        <View
          className={clsx({
            "flex-row space-x-10": isLandscape,
          })}>
          <View
            className={clsx({
              "flex-1": isLandscape,
            })}>
            <View className="pb-10">
              <PhotoPicker />
            </View>

            <ProfileInput
              title="Your Email"
              placeholder="Enter your email"
              defaultValue="namesurname@gmail.com"
            />
            <ProfileInput
              secure
              title="Your Password"
              placeholder="Enter Your password"
              defaultValue="password"
            />
            <ProfileInput
              title="Your Phone"
              placeholder="Your phone"
              defaultValue="+14151110000"
            />
          </View>

          <View
            className={clsx({
              "flex-1": isLandscape,
            })}>
            <ProfileInput
              title="City, State"
              placeholder="Your City"
              defaultValue="San Francisco, CA"
            />
            <ProfileInput
              title="Country"
              placeholder="Your Country"
              defaultValue="USA"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
