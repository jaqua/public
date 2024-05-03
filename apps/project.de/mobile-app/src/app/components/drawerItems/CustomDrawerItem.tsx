import { Pressable, StyleSheet, Text, View } from "react-native";

type CustomDrawerItemProps = {
  Icon: (props: any) => React.JSX.Element;
  title: string;
  onPress: () => void;
};
const CustomDrawerItem = ({ Icon, title, onPress }: CustomDrawerItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="px-6">
      <View
        style={styles.borderStyle}
        className="flex-row items-center space-x-4 pl-6 py-11 border-lightBlue">
        <Icon
          size={30}
          color={"#3FB0DB"}
        />
        <Text className="text-[28px] font-aeonisMedium">{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  borderStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default CustomDrawerItem;
