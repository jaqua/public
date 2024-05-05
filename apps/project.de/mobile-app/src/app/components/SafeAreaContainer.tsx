import { PropsWithChildren } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

const SafeAreaContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={styles.safeStyle}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default SafeAreaContainer;
