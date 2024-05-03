import FriendDetails from "@/screens/FriendsScreen/FriendsItemDetails";
import { getOrientation } from "@/utils/utils";
import React, { useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import Popover, { PopoverPlacement } from "react-native-popover-view";

type FriendListItemProps = {
  id: string;
  username: string;
  imgUrl: any;
};
const FriendListItem = ({ id, username, imgUrl }: FriendListItemProps) => {
  const [detailsShown, setDetailsShown] = useState(false);
  const onToggleDetails = () => {
    setDetailsShown((p) => !p);
  };
  const isLandscape = getOrientation() === "landscape";
  const touchableRef = useRef(null);
  if (isLandscape) {
    return (
      <>
        <Pressable
          ref={touchableRef}
          onPress={onToggleDetails}
          className="">
          <View className="flex-row space-x-5 items-center py-4">
            <View className="w-16 h-16">
              <Image
                source={imgUrl}
                className="w-full aspect-square rounded-full object-contain"
              />
            </View>
            <Text className="text-2xl font-bold mr-auto">{username}</Text>

            <View className=" ">
              {isLandscape ? (
                <ChevronRightIcon
                  size={30}
                  color={"#3FB0DB"}
                />
              ) : (
                <ChevronDownIcon
                  size={30}
                  color={"#3FB0DB"}
                />
              )}
            </View>
          </View>
        </Pressable>
        <Popover
          isVisible={detailsShown}
          placement={PopoverPlacement.RIGHT}
          onRequestClose={() => setDetailsShown(false)}
          from={touchableRef}>
          <FriendDetails
            company="Company Name"
            email="email@company.com"
            phone="0601234567"
          />
        </Popover>
      </>
    );
  }

  return (
    <Pressable onPress={onToggleDetails}>
      <View className="flex-row space-x-5 items-center py-4">
        <View className="w-16 h-16">
          <Image
            source={imgUrl}
            className="w-full aspect-square rounded-full object-contain"
          />
        </View>
        <Text className="text-2xl font-bold mr-auto">{username}</Text>

        <View className=" ">
          {isLandscape ? (
            <ChevronRightIcon
              size={30}
              color={"#3FB0DB"}
            />
          ) : (
            <ChevronDownIcon
              size={30}
              color={"#3FB0DB"}
            />
          )}
        </View>
      </View>

      {detailsShown ? (
        <FriendDetails
          company="Company Name"
          email="email@company.com"
          phone="0601234567"
        />
      ) : null}
    </Pressable>
  );
};

export default FriendListItem;
