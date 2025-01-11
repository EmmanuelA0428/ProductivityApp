import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";

const DeletedUserGoalsContext = createContext();

export function DeletedUserGoalsProvider({ children }) {
  const [deletedUserGoals, setDeletedUserGoals] = useState([]);

  async function loadUserDeletedGoals() {
    try {
      const storedDeletedGoals = await AsyncStorage.getItem("userDeletedGoals");
      if (storedDeletedGoals) {
        setDeletedUserGoals(JSON.parse(storedDeletedGoals));
      }
    } catch (error) {
      console.error("Error loading user's deleted goals:", error);
    }
  }

  async function saveUserDeletedGoals() {
    try {
      const jsonGoals = JSON.stringify(deletedUserGoals);
      await AsyncStorage.setItem("userDeletedGoals", jsonGoals);
    } catch (error) {
      console.error("Error saving the user's deleted goal", error);
    }
  }

  useEffect(() => {
    loadUserDeletedGoals(); // Load the data when the app starts
  }, []);

  useEffect(() => {
    saveUserDeletedGoals(); // Save the data whenever userGoals changes
  }, [deletedUserGoals]);

  return (
    <DeletedUserGoalsContext.Provider
      value={{ deletedUserGoals, setDeletedUserGoals }}
    >
      {children}
    </DeletedUserGoalsContext.Provider>
  );
}

export default DeletedUserGoalsContext;
