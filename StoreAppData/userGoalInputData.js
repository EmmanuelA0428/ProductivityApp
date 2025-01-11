import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userGoalDataContext = createContext();

export function UserGoalDataProvider({ children }) {
  const [userGoalData, setUserGoalData] = useState([]); // Use the context
  //The useState looks soemthing like this - {id: "", goal: "", description: "", priority: "", tag: ""}

  //Function to load the description
  async function loadUserGoalData() {
    try {
      const storedUserGoalData = await AsyncStorage.getItem("userGoalData");
      if (storedUserGoalData) {
        setUserGoalData(JSON.parse(storedUserGoalData));
      }
    } catch (error) {
      console.error("Error loading user Goal Data:", error);
    }
  }
  //Function to save the description
  async function saveUserGoalData() {
    try {
      const jsonUserData = JSON.stringify(userGoalData);
      await AsyncStorage.setItem("userGoalData", jsonUserData);
    } catch (error) {
      console.error("Error saving user Goal Data:", error);
    }
  }
  //use callback / useMemo
  useEffect(() => {
    loadUserGoalData(); // Load the data when the app starts
  }, []);
  useEffect(() => {
    saveUserGoalData(); // Save the data whenever userGoalsData changes
  }, [userGoalData]);

  return (
    <userGoalDataContext.Provider value={{ userGoalData, setUserGoalData }}>
      {children}
    </userGoalDataContext.Provider>
  );
}
export default userGoalDataContext;
