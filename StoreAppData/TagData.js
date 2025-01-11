import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userTagContext = createContext();

export function UserTagProvider({ children }) {
  const [userTag, setUserTag] = useState([
    { id: 1, value: "Health" },
    { id: 2, value: "Personal" },
    { id: 3, value: "Work" },
  ]); // Use the context

  //Function to load the description
  async function loadUserTag() {
    try {
      const storedUserTag = await AsyncStorage.getItem("userTag");
      if (storedUserTag) {
        setUserTag(JSON.parse(storedUserTag));
      }
    } catch (error) {
      console.error("Error loading user Tag Data:", error);
    }
  }
  //Function to save the description
  async function saveUserTag() {
    try {
      const jsonUserTag = JSON.stringify(userTag);
      await AsyncStorage.setItem("userTag", jsonUserTag);
    } catch (error) {
      console.error("Error saving user Tag Data:", error);
    }
  }
  useEffect(() => {
    loadUserTag(); // Load the data when the app starts
  }, []);
  useEffect(() => {
    saveUserTag(); // Save the data whenever userGoalsData changes
  }, [userTag]);

  return (
    <userTagContext.Provider value={{ userTag, setUserTag }}>
      {children}
    </userTagContext.Provider>
  );
}
export default userTagContext;
