import { StyleSheet,FlatList, Platform,Pressable, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import React from "react";

type Props ={
    onSelect: (image:ImageSourcePropType)=> void;
    onCloseModal: () => void;
};

export default function EmojiList({onSelect, onCloseModal}: Props){
    const [emoji] = useState([
        require("../assets/images/emoji1.png"),
        require("../assets/images/emoji2.png"),
        require("../assets/images/emoji3.png"),
        require("../assets/images/emoji4.png"),
        require("../assets/images/emoji5.png"),
        require("../assets/images/emoji6.png"),
    ])
    return(
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === "web"}
        data={emoji}
        contentContainerStyle={styles.listContainer}
        renderItem={({item, index})=>(
            <Pressable
            onPress={()=>{
                onSelect(item);
                onCloseModal();
            }}
            >
                I<Image source={item} key={index} style={styles.image}/>
            </Pressable>
        )}
        >
            
        </FlatList>
    )
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});