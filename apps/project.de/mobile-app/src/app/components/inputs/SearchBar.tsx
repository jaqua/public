import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  return (
    <View className="flex-row items-center bg-neutral-300 px-4 space-x-3 rounded-full">
      <MagnifyingGlassIcon
        size={20}
        color={"#808184"}
        // width={35}
        // height={35}
      />

      <View className="flex-1">
        <TextInput
          className="w-full py-2 text-lg font-montserrat "
          onChangeText={setQuery}
          value={query}
          placeholder="Search"
          keyboardType="web-search"
        />
      </View>
    </View>
  );
};

export default SearchBar;
