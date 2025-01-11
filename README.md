# To-Do List React Native Application

## Overview

This is a React Native To-Do List application designed to help users manage their goals efficiently. The app includes features such as adding, editing, deleting, and prioritizing goals. It supports tagging goals, setting due dates, and viewing completed or deleted goals. The app provides users with intuitive features like drag-and-drop functionality, undo options, and modals for goal management. It leverages various React Native libraries for gesture handling, animations, and modals.

### Key Features
	•	Goal Management: Add, edit, and delete goals with ease.
	•	Priority and Tagging: Assign priorities and tags to goals to help organize them.
	•	Undo Functionality: Undo goal deletions to prevent accidental loss.
	•	Modals: Use modals for editing goals, selecting priorities, and assigning tags.
	•	Drag and Drop: Reorder goals with drag-and-drop functionality to prioritize or organize them.
	•	Context API: Manage the global state across the app using React’s Context API for a seamless experience.

### Project Structure
	•	Screens: Contains different screens for displaying goals, settings, notes, etc.
	•	HomeScreen.js: Displays all goals and provides options to add, edit, and delete.
	•	GoalScreen.js: Displays detailed information about a specific goal.
	•	OtherScreen.js: Manages settings for priorities and tags, and allows viewing saved and deleted goals.
	•	Components: Reusable UI components for managing goals, modals, and other UI elements.
	•	GoalItem.js: A component that represents an individual goal item, which can be clicked, edited, or deleted.
	•	PriorityModal.js: A modal for setting or updating the priority of a goal.
	•	TagModal.js: A modal for managing tags assigned to a goal.
	•	StoreAppData: Contains context providers to manage and persist user data using Context API and AsyncStorage.
	•	GoalContext.js: Provides the state and functions related to goal management.
	•	TagContext.js: Manages the state related to tags for the goals.

### Main Files
	•	App.js: The entry point of the application. Sets up navigation and context providers.
	•	GoalsStuff: Contains components and logic related to goal management, including adding, editing, and deleting goals.
	•	StoreAppData: Manages global state using context providers and persists data using AsyncStorage.
	•	Screens: Contains various screens for displaying and managing goals (e.g., HomeScreen.js, GoalScreen.js, OtherScreen.js).

### Installation
	1.	Clone the repository:

git clone https://github.com/yourusername/todolist-react-native.git
cd todolist-react-native


	2.	Install the dependencies:

npm install


	3.	Run the app:
For iOS:

npx react-native run-ios

For Android:

npx react-native run-android



### Usage
	•	Adding a Goal: Tap the “Add Goal” button on the home screen to add a new goal.
	•	Editing a Goal: Click on an existing goal to open a modal where you can edit the details.
	•	Prioritizing a Goal: Use the priority modal to set a priority level for each goal.
	•	Tagging a Goal: Add tags to goals to categorize them (e.g., Work, Personal).
	•	Reordering Goals: Drag and drop goals to rearrange them in the list.
	•	Undo Deletion: If you delete a goal by mistake, use the “Undo” button to recover it.
	•	Viewing Completed or Deleted Goals: View your completed and deleted goals in the settings screen (OtherScreen.js).

### Technologies Used
	•	React Native: For building the cross-platform mobile app.
	•	Context API: For managing global state across the app.
	•	AsyncStorage: For persisting user data (goals, priorities, tags) locally.
	•	React Navigation: For managing app navigation.
	•	Gesture Handler: For handling drag-and-drop interactions.
	•	React Native Animations: For smooth transitions and animations.
	•	Modals: For editing goals, priorities, and tags.



