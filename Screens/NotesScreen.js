import React, { useEffect, useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import DraggableButton from "../GoalsStuff/DraggableButton"; // Adjust the path accordingly

import { DraxProvider, DraxView, DraxList } from "react-native-drax";

function NotesScreen({ navigation }) {
  const width = useSharedValue(50);

  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  function handleIncreasePress() {
    width.value = withSpring(width.value + 20);
    console.log(width.value);
  }
  function handleDecreasePress() {
    width.value = withSpring(width.value - 20);
    console.log(width.value);
  }
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: 100,
      backgroundColor: "violet",
    };
  });
  const animatedStyles2 = useAnimatedStyle(() => {
    return {
      // Shared values
      opacity: progress.value,
      transform: [
        { scale: scale.value },
        { rotate: `${progress.value * 2 * Math.PI}rad` },
      ],
      borderRadius: (progress.value * 100) / 2,
      // Static values
      width: 100,
      height: 100,
      backgroundColor: "red",
    };
  });
  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 1000, true);
    scale.value = withRepeat(withSpring(1), 1000, true);
  }, []);

  // Flat list code
  const [testList, setTestList] = useState([
    { key: "1", text: "Item 1" },
    { key: "2", text: "Item 2" },
    { key: "3", text: "Item 3" },
  ]);

  function renderTestListData({ item }) {
    return (
      <View style={{ padding: 16, backgroundColor: "lightblue" }}>
        <Text>{item.text}</Text>
      </View>
    );
  }

  //Drag and Drop

  return (
    <View>
      <View>
        <Text>Notes</Text>
        <Button title="Increase" onPress={handleIncreasePress} />
        <Button title="Decrease" onPress={handleDecreasePress} />
      </View>
      {/* Animation  */}
      <View>
        <Animated.View style={animatedStyles} />
      </View>

      <View style={{ flex: 1, alignItems: "center", top: 10 }}>
        <Animated.View style={animatedStyles2} />
      </View>
      {/* Flat List */}
      <View style={{ top: 200 }}>
        <FlatList
          data={testList}
          keyExtractor={(item) => item.key}
          renderItem={renderTestListData}
        />
      </View>
      <DraggableButton />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  draggable: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  receiver: {
    width: 100,
    height: 100,
    backgroundColor: "green",
  },
});
export default NotesScreen;
