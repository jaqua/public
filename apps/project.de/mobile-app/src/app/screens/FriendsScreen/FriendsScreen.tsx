import FriendListItem from "@/components/FriendListItem";
import BasicAppBar from "@/components/headers/BasicAppBar";
import SearchBar from "@/components/inputs/SearchBar";
import { getOrientation } from "@/utils/utils";
import clsx from "clsx";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ChevronLeftIcon, PlusIcon } from "react-native-heroicons/solid";

const DEFAULT_IMG = require("@@/assets/images/avatars/avatar1.png");
const FriendList = [
  {
    id: "a",
    username: "Lana Davidson",
    imgUrl: DEFAULT_IMG,
  },
  {
    id: "b",
    username: "Lana Davidson2",
    imgUrl: DEFAULT_IMG,
  },
  {
    id: "c",
    username: "Lana Davidson3",
    imgUrl: DEFAULT_IMG,
  },
  {
    id: "d",
    username: "Lana Davidson4",
    imgUrl: DEFAULT_IMG,
  },
];

const FriendsScreen = () => {
  const isLandscape = getOrientation() === "landscape";
  return (
    <>
      <BasicAppBar title="Friends" />

      <View className="container flex-row justify-between py-4">
        <Pressable className="flex-row items-center">
          <ChevronLeftIcon
            size={30}
            color={"#3FB0DB"}
          />
          <Text className="text-accent text-lg">Lists</Text>
        </Pressable>

        <Pressable>
          <PlusIcon
            size={30}
            color={"#3FB0DB"}
          />
        </Pressable>
      </View>

      <View className="container">
        <SearchBar />
      </View>

      <View
        className={clsx({
          "container py-4  flex-1": true,
          "max-w-[50%]": isLandscape,
        })}>
        <ScrollView>
          {FriendList.map((friend, idx) => {
            return (
              <React.Fragment key={friend.id}>
                <FriendListItem {...friend} />
                {idx !== FriendList.length - 1 ? <ItemSeparator /> : null}
              </React.Fragment>
            );
          })}
        </ScrollView>
        {/* <FlatList
          data={FriendList}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item, index, separators }) => {
            return <FriendListItem {...item} />;
          }}
          keyExtractor={(item) => item.id}
        /> */}
      </View>
    </>
  );
};

const ItemSeparator = () => {
  return <View className="h-1 bg-accent"></View>;
};

export default FriendsScreen;
