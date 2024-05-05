import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { PhotoIcon } from "react-native-heroicons/solid";
const PhotoPicker = () => {
  const [image, setImage] = useState<null | string>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <Pressable onPress={pickImage}>
      <View style={styles.imageWrapper}>
        <Image
          className="rounded-full overflow-hidden"
          source={{ uri: image ? image : undefined, width: 150, height: 150 }}
        />

        <View className="absolute top-0 right-0">
          <PhotoIcon
            size={50}
            color={"#fff"}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    position: "relative",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#aaa",
    // elevation: 2,
  },
});
export default PhotoPicker;
