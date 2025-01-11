// Purpose: To store the user's description data

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DescriptionContext = createContext();

export function DescriptionProvider({ children }) {
  const [userDescription, setUserDescription] = useState([]); // Use the context

  //Function to load the description
  async function loadUserDescription() {
    try {
      const storedDescription = await AsyncStorage.getItem("userDescription");
      if (storedDescription) {
        setUserDescription(JSON.parse(storedDescription));
      }
    } catch (error) {
      console.error("Error loading user description:", error);
    }
  }
  //Function to save the description
  async function saveUserDescription() {
    try {
      const jsonDescription = JSON.stringify(userDescription);
      await AsyncStorage.setItem("userDescription", jsonDescription);
    } catch (error) {
      console.error("Error saving user description:", error);
    }
  }
  useEffect(() => {
    loadUserDescription(); // Load the data when the app starts
  }, []);
  useEffect(() => {
    saveUserDescription(); // Save the data whenever userDescription changes
  }, [userDescription]);

  return (
    <DescriptionContext.Provider
      value={{ userDescription, setUserDescription }}
    >
      {children}
    </DescriptionContext.Provider>
  );
}
export default DescriptionContext;
