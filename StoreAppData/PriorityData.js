import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userPriorityContext = createContext();

export function UserPriorityProvider({ children }) {
  const [userPriority, setUserPriority] = useState([
    { id: 1, value: "Priority 1" },
    { id: 2, value: "Priority 2" },
    { id: 3, value: "Priority 3" },
  ]); // Use the context

  //Function to load the description
  async function loadUserPriority() {
    try {
      const storedUserPriority = await AsyncStorage.getItem("userPriority");
      if (storedUserPriority) {
        setUserPriority(JSON.parse(storedUserPriority));
      }
    } catch (error) {
      console.error("Error loading user Priority Data:", error);
    }
  }
  //Function to save the description
  async function saveUserPriority() {
    try {
      const jsonUserPriority = JSON.stringify(userPriority);
      await AsyncStorage.setItem("userPriority", jsonUserPriority);
    } catch (error) {
      console.error("Error saving user Prioirty Data:", error);
    }
  }
  useEffect(() => {
    loadUserPriority(); // Load the data when the app starts
  }, []);
  useEffect(() => {
    saveUserPriority(); // Save the data whenever userGoalsData changes
  }, [userPriority]);

  return (
    <userPriorityContext.Provider value={{ userPriority, setUserPriority }}>
      {children}
    </userPriorityContext.Provider>
  );
}
export default userPriorityContext;
