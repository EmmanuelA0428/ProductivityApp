// DraggableButton.js
import React from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { snapPoint } from "react-native-reanimated";

const DraggableButton = () => {
  const translationX = new Animated.Value(0);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX } }],
    { useNativeDriver: false }
  );

  const handleSnap = ([x]) => snapPoint(x, translationX, [0, 200, 400]);

  const handleGestureStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      Animated.spring(translationX, {
        toValue: handleSnap(nativeEvent.translationX),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleGestureStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX: translationX }],
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
      >
        <TouchableOpacity onPress={() => console.log("Button pressed")}>
          {/* Customize your draggable button component */}
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "blue",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Your button content goes here */}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DraggableButton;
