import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, userGoalDataContext } from "../GoalsStuff/imports";
import { Icon } from "react-native-elements";

function HomeScreen({ navigation }) {
  //Use context to access the user Goals

  const { userGoalData, setUserGoalData } = useContext(userGoalDataContext);

  // Render item for FlatList
  const renderItem = ({ item }) => {
    if (item.priority !== "Priority 1") {
      return null; // Don't render items that are not due today
    }

    return (
      <View style={styles.listItem}>
        <MaterialIcons name="note" size={30} color="blue" />
        <Text>{item.goal}</Text>
      </View>
    );
  };

  // Render item for calendar FlatList
  const renderCalendarItem = ({ item }) => (
    <View style={styles.calendarItem}>
      <Text>{item.date}</Text>
      <Text>{item.event}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* My Day Section */}
      <View style={styles.flatListContainer}>
        <Text style={styles.sectionHeader}>My Day</Text>
        <FlatList
          data={userGoalData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={true} // Enable scrolling
        />
      </View>

      {/* Inbox Section */}
      <View style={styles.calendarContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Icon name="inbox" type="font-awesome" />
            <Text style={styles.sectionHeader}> Inbox </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {/* Goals Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Goal")}
        >
          <MaterialIcons name="star" size={30} color="black" />
          <Text>Goals</Text>
        </TouchableOpacity>

        {/* Notes Button */}
        <TouchableOpacity
          style={styles.button}
          //onPress={() => navigation.navigate("Notes")}
        >
          <MaterialIcons name="inbox" size={30} color="black" />
          <Text>Inbox</Text>
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Settings")}
        >
          <MaterialIcons name="settings" size={30} color="black" />
          <Text>Setting</Text>
        </TouchableOpacity>

        {/* Testing Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Testing")}
        >
          <MaterialIcons name="extension" size={30} color="black" />
          <Text>Browse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  flatListContainer: {
    height: 410, // Set a fixed height for the FlatList container
    left: 0,
  },
  calendarContainer: {
    height: 200, // Set a fixed height for the calendar container
    left: 0,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 380,
  },
  calendarItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 380,
    height: 500,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "lightgray",
  },
  button: {
    // backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
