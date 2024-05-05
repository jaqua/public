import SearchBar from "@/components/inputs/SearchBar";
import { View } from "react-native";
import BasicAppBar from "./BasicAppBar";

type AppHeaderProps = {
  title: string;
};
const BasicAppHeader = ({ title }: AppHeaderProps) => {
  return (
    <View className="flex">
      <BasicAppBar title={title} />

      <View className="pt-8 px-8">
        <SearchBar />
      </View>
    </View>
  );
};

export default BasicAppHeader;
