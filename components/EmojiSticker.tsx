import { ImageSourcePropType, View } from 'react-native';
import { Image } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import React from 'react';
import Animated,
{
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const transLatezX = useSharedValue(0);
  const transLatezY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2)
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const drag = Gesture.Pan().onChange((event) => {
    transLatezX.value += event.changeX;
    transLatezY.value += event.changeY;

  });

  const containerStyle = useAnimatedStyle(()=>{
    return{
      transform:[
        {
          translateX: transLatezX.value,
        },
        {
          translateY: transLatezY.value,
        },
      ]
    }
  });

  return (
    <GestureDetector gesture={drag}> 

    <Animated.View style={[containerStyle,{ top: -350} ]}>
      <GestureDetector gesture={doubleTap}>
        <Animated.Image
          source={stickerSource}
          resizeMode={"contain"}
          style={[imageStyle, { width: imageSize, height: imageSize }]} />

      </GestureDetector>
    </Animated.View>
    </GestureDetector>
  );
}
