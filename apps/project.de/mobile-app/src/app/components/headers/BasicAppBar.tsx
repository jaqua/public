import MenuButton from "@/components/ui/button/MenuButton";
import { getOrientation } from "@/utils/utils";
import clsx from "clsx";
import React from "react";
import { Image, Text, View } from "react-native";

type AppBarProps = { title: string };
const BasicAppBar = ({ title }: AppBarProps) => {
  const isLandscape = getOrientation() === "landscape";
  const logoImg = isLandscape
    ? require("@@/assets/logo/logoBlack.png")
    : require("@@/assets/logo/logo-small.png");
  return (
    <View
      className={clsx([
        "container h-16 flex-row items-center border-b-2 ",
        isLandscape
          ? "bg-neutral-200 border-neutral-300"
          : "border-neutral-200",
      ])}>
      <View className="mr-auto">
        <Image
          source={logoImg}
          style={{
            objectFit: "contain",
            height: isLandscape ? 22 : 34,
            width: isLandscape ? "auto" : 50,
          }}
        />
      </View>

      {isLandscape ? null : (
        <View className="mr-auto">
          <Text className="text-[27px] font-aeonisBold">{title}</Text>
        </View>
      )}

      <MenuButton />
    </View>
  );
};

export default BasicAppBar;
