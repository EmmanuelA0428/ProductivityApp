// Imports.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  Touchable,
  Animated,
} from "react-native";
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { useState } from "react";
import { useContext } from "react";
import * as Reanimated from "react-native-reanimated";
import DraggableFlatList from "react-native-draggable-flatlist";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";

// Importing the context
import GoalsContext from "../StoreAppData/GoalsData";
import DescriptionContext from "../StoreAppData/DescriptionData";
import userGoalDataContext from "../StoreAppData/userGoalInputData";
import userPriorityContext from "../StoreAppData/PriorityData";
import userTagContext from "../StoreAppData/TagData";
import DeletedUserGoalsContext from "../StoreAppData/DeletedGoalsData";
import CompletedUserGoalsContext from "../StoreAppData/CompletedGoalsData";

export {
  React,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  Touchable,
  Animated,
  GestureHandlerRootView,
  RectButton,
  Swipeable,
  PanGestureHandler,
  useState,
  useContext,
  Reanimated,
  DraggableFlatList,
  Icon,
  CheckBox,
  GoalsContext,
  DescriptionContext,
  userGoalDataContext,
  userPriorityContext,
  userTagContext,
  DeletedUserGoalsContext,
  CompletedUserGoalsContext,
};
