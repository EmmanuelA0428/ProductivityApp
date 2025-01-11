import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";

const CompletedUserGoalsContext = createContext();

export function CompletedUserGoalsProvider({ children }) {
  const [completedUserGoals, setCompletedUserGoals] = useState([]);

  async function loadUserCompletedGoals() {
    try {
      const storedCompletedGoals = await AsyncStorage.getItem(
        "userCompletedGoals"
      );
      if (storedCompletedGoals) {
        setCompletedUserGoals(JSON.parse(storedCompletedGoals));
      }
    } catch (error) {
      console.error("Error loading user's completed goals:", error);
    }
  }

  async function saveUserCompletedGoals() {
    try {
      const jsonGoals = JSON.stringify(completedUserGoals);
      await AsyncStorage.setItem("userCompletedGoals", jsonGoals);
    } catch (error) {
      console.error("Error saving the user's completed goal", error);
    }
  }

  useEffect(() => {
    loadUserCompletedGoals(); // Load the data when the app starts
  }, []);

  useEffect(() => {
    saveUserCompletedGoals(); // Save the data whenever userGoals changes
  }, [completedUserGoals]);

  return (
    <CompletedUserGoalsContext.Provider
      value={{ completedUserGoals, setCompletedUserGoals }}
    >
      {children}
    </CompletedUserGoalsContext.Provider>
  );
}

export default CompletedUserGoalsContext;
