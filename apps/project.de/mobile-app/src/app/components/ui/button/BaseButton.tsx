import { PropsWithChildren } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

type BaseButtonProps = PropsWithChildren & {
  onPress: (evt: GestureResponderEvent) => void;
  styles?: StyleProp<ViewStyle>;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onPress,
  styles = {},
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles}>
      {children}
    </Pressable>
  );
};

export default BaseButton;
