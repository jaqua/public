import Triangle from "@/components/ui/shapes/Triangle";
import { Text, View } from "react-native";
import { PhoneIcon } from "react-native-heroicons/solid";

type FriendDetailsProps = {
  company: string;
  email: string;
  phone: string;
};
const FriendDetails = ({ company, email, phone }: FriendDetailsProps) => {
  return (
    <View className="w-96 py-10 px-8 overflow-hidden bg-darkBlue bg-opacity-90">
      <Text className="text-2xl pb-3 font-bold text-white">{company}</Text>
      <Text className="text-2xl pb-3 text-white">{email}</Text>
      <View className="flex-row items-center space-x-5">
        <Text className="text-2xl text-accent">{phone}</Text>
        <PhoneIcon
          size={20}
          color={"#3FB0DB"}
        />
      </View>

      <View className="absolute -top-1 left-12">
        <Triangle />
      </View>
    </View>
  );
};
export default FriendDetails;
