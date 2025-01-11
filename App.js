import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

//Needed for navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Importing the screens
import HomeScreen from "./Screens/HomeScreen";
import GoalsScreen from "./Screens/GoalScreen";
import SettingsScreen from "./Screens/OtherScreen";
import NotesScreen from "./Screens/NotesScreen";
import TestingScreen from "./Screens/TestingScreen";

//creating the stack
const Stack = createNativeStackNavigator();

import { GoalsProvider } from "./StoreAppData/GoalsData";
import { DescriptionProvider } from "./StoreAppData/DescriptionData";
import { UserGoalDataProvider } from "./StoreAppData/userGoalInputData";
import { UserPriorityProvider } from "./StoreAppData/PriorityData";
import { UserTagProvider } from "./StoreAppData/TagData";
import { DeletedUserGoalsProvider } from "./StoreAppData/DeletedGoalsData";
import { CompletedUserGoalsProvider } from "./StoreAppData/CompletedGoalsData";

// function CustomHeader({ navigation }) {
//   return <Icon name="bars" size={100} color="black" style={styles.icon} />;
// }

function GoalsHeader({ navigation }) {
  return (
    <View style={styles.homeNavBar}>
      <View style={styles.homeNavBarContents}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Use navigation.goBack() */}
          <Icon name="arrow-left" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="cog" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
          <Icon
            name="sticky-note"
            size={30}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <UserGoalDataProvider>
      <GoalsProvider>
        <DeletedUserGoalsProvider>
          <CompletedUserGoalsProvider>
            <DescriptionProvider>
              <UserPriorityProvider>
                <UserTagProvider>
                  <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                      <Stack.Screen name="Home" component={HomeScreen} />
                      <Stack.Screen
                        name="Goal"
                        component={GoalsScreen}
                        // options={{
                        //   title: "Goals",
                        //   header: () => <GoalsHeader />,
                        // }}
                      />
                      <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                      />
                      <Stack.Screen name="Notes" component={NotesScreen} />
                      <Stack.Screen name="Testing" component={TestingScreen} />
                    </Stack.Navigator>
                  </NavigationContainer>
                </UserTagProvider>
              </UserPriorityProvider>
            </DescriptionProvider>
          </CompletedUserGoalsProvider>
        </DeletedUserGoalsProvider>
      </GoalsProvider>
    </UserGoalDataProvider>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  homeNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    marginBottom: 60,
  },
  homeNavBarContents: {
    //paddingTop: 60,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
});
