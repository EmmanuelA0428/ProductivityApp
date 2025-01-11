import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
//import DraggableFlatList from "react-native-draggable-flatlist";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  RectButton,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;
const GoalScreen = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      //context is an object that can be used to store values
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      console.log(event.translationX, event.translationY);
    },
    onEnd: (event) => {
      console.log(event);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <View style={[styles.circle]}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "blue",
    margin: 10,
    borderRadius: 30,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: "black",
  },
});

export default GoalScreen;
