import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagenPicker from "expo-image-picker";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import * as MediaLibary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Index() {
  const imageRef = useRef(null)
  const [permissionResponse, requestPermission] = MediaLibary.usePermissions();

  const [selectedImage, setselectedImage] = useState<string | undefined>(undefined)
  const [showAppOtions, setshowAppOtions] = useState<boolean>(false)
  const [isModalVisible, setisModalVisible] = useState<boolean>(false)
  const [pickeEmoji, setPickeEmoji] = useState<ImageSourcePropType  | undefined>(undefined)

  useEffect(()=>{
    if (!permissionResponse?.granted){
      requestPermission();
    }
  },[])

  const pickImageAsync = async () => {
    let result = await ImagenPicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setselectedImage(result.assets[0].uri)
      setshowAppOtions(true)
      console.log(result)
    } else {
      alert("You did not select any image")
    }
  };

  const onModalClose = () => {
    setisModalVisible(false)
  }

  const onReset = () => {
    setshowAppOtions(false)
  };
  const onAddSticker = () => {
    setisModalVisible(true)
  };
  const onSaveImageAsync = async () => {
        try {
          const localUri = await captureRef(imageRef,{
            height: 440,
            quality: 1
          });

          await MediaLibary.saveToLibraryAsync(localUri);
          if (localUri) {
            alert("Save")
          }
        } catch (error) {
          console.log(error)
        } 
  };

  return (
    <View
      style={style.container}
    >
      <View ref={imageRef} style={style.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickeEmoji && 
        (<EmojiSticker imageSize={40} stickerSource={pickeEmoji}/>)}
      </View>

      {showAppOtions ? (
        <View style={style.optionsContainer}>
          <View style={style.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="save"
              onPress={onSaveImageAsync}
            />
          </View>

        </View>
      ) : (
        <View style={style.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setshowAppOtions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickeEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black'
  },

  imageContainer: {
    flex: 1,
    marginTop: 4
  },
  footerContainer: {
    flex: 0.33, // = 1 / 3
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
