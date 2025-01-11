// I want to add a way in which you can drag the addGoal button to the left side or the
//right middle of the screen and one there, it attaches to the side of the screen.
//
//TO DO
//1. Add a way to add the due date to the goal
//2. Implement the swipeable feature for both the left and right side of the goals
//3. Fix the undo feature
//4. Add some animations to the app
//5. Replace the draggbale flatlist with another more intuitive library
//6. Make the drag animation smoother

//Using Drax
import { DraxProvider, DraxView, DraxList } from "react-native-drax";
import { useEffect } from "react";
//---------------------------------Imports---------------------------------------
import { SlideInLeft, set } from "react-native-reanimated";
import {
  React,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  // Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  Touchable,
  //Animated,
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
} from "../GoalsStuff/imports";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import TooltipMenu from "react-native-tooltip-menu";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

//New imports for change
import AllModals from "../GoalsStuff/AllModals";
import DeleteGoalLogic from "../GoalsStuff/DeleteGoalLogic";
import AddGoalHandler from "../GoalsStuff/AddGoalHandler";
import EditGoal from "../GoalsStuff/EditGoal";

//------------------------------ Goal Screen - App ------------------------------
function GoalScreen({ navigation }) {
  //------------------------------ useContext -  --------------------------------
  {
    /*useContext - values shared across screens */
  }
  const { userGoals, setUserGoals } = useContext(GoalsContext);
  const { userDescription, setUserDescription } =
    useContext(DescriptionContext);
  //This is changed to an object from an array
  const { userGoalData, setUserGoalData } = useContext(userGoalDataContext);
  const { userPriority, setUserPriority } = useContext(userPriorityContext);
  const { userTag, setUserTag } = useContext(userTagContext);
  const { deletedUserGoals, setDeletedUserGoals } = useContext(
    DeletedUserGoalsContext
  );
  const { completedUserGoals, setCompletedUserGoals } = useContext(
    CompletedUserGoalsContext
  );
  //------------------------------ useState -  ----------------------------------
  {
    /*useState - values that are local to the screen */
  }
  const [enteredGoal, setEnteredGoal] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isInputVisible, setInputVisible] = useState(false);
  const [isPriorityInputVisible, setPriorityInputVisible] = useState(false);
  const [isPriorityModalVisible, setPriorityModalVisible] = useState(false);
  const [isTagModalVisible, setTagModalVisible] = useState(false);
  const [isEditGoalModalVisible, setEditGoalModalVisible] = useState(false);
  const [isEditPriorityModalVisible, setEditPriorityModalVisible] =
    useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isEditTagModalVisible, setEditTagModalVisible] = useState(false);
  const [isUndoVisible, setIsUndoVisible] = useState(false);
  const [undoData, setUndoData] = useState(null);
  const [isAddGoalModal, setAddGoalModal] = useState(false);
  const [deletedGoalIndex, setDeletedGoalIndex] = useState(null);
  const [savedGoalIndex, setSavedGoalIndex] = useState(null);
  //Use state for calender
  const [isCalenderVisible, setCalenderVisible] = useState(false);
  const [isCalenderModalVisible, setCalenderModalVisible] = useState(false);
  const [addGoalModalIsOpen, setAddGoalModalIsOpen] = useState(false);

  //Testing something new
  const deleteLogic = DeleteGoalLogic({
    //handleClearAllGoals, clearGoals, handleUndo,
    setUserGoals,
    setUserDescription,
    setUserGoalData,
    setDeletedUserGoals,
    setCompletedUserGoals,
    //handleUndo
    setIsUndoVisible,
    setUndoData,
    setDeletedGoalIndex,
    setSavedGoalIndex,
    undoData,
    deletedGoalIndex,
    savedGoalIndex,
  });
  const modalLogic = AllModals({
    //Modal Visibilities
    setEditGoalModalVisible,
    setEditPriorityModalVisible,
    setPriorityModalVisible,
    setTagModalVisible,
    setEditTagModalVisible,
    setCalenderModalVisible,
    setAddGoalModalIsOpen,
  });
  const addGoalLogic = AddGoalHandler({
    //addGoalHandler
    enteredGoal,
    enteredDescription,
    selectedPriority,
    selectedTag,
    selectedDate,
    setUserGoalData,
    removeText,
    setSelectedPriority,
    setSelectedTag,
    setSelectedDate,
    //handleAddGoal
    setInputVisible,
  });

  // For now fucntions that take in an input will be kept in this main class
  // const editGoalLogic = EditGoal({
  //   userGoalData,
  //   setUserGoalData,
  //   editIndex,
  // });
  // ------------------------------ Event Handlers - App ------------------------------
  function handleInputChangeGoal(text) {
    setEnteredGoal(text);
  }
  function handleInputChangeDescription(test) {
    setEnteredDescription(test);
  }
  function handleEdit(id) {
    setEditIndex(id);
    modalLogic.setEditGoalModalVisibleTrue();
    console.log("Edit index is " + id);
  }
  function handleCancelEdit() {
    setEditIndex(null);
  }
  function handleSaveGoal(id) {
    setEditIndex(null);
    console.log("Goal with ID " + id + " saved");
  }
  //Function to add the deleted Goal, to the setDeletedUserGoals Array
  function addDeletedGoal(deletedGoal) {
    setDeletedUserGoals((prevData) => {
      return [...prevData, deletedGoal];
    });
  }
  function handleDismissContent() {
    setInputVisible(false);
    Keyboard.dismiss(); // Dismiss the keyboard
    console.log("Dismissed - This works");
    setInputVisible(false);
  }
  function removeText() {
    setEnteredGoal("");
    setEnteredDescription("");
  }
  function arraylength() {
    console.log("This is the userGoalData length" + userGoalData.length);
    return userGoalData.length;
  }

  //------------------------------ Event Handlers - Goals ------------------------------
  // function handleEditGoal(text, id) {
  //   setUserGoalData((prevData) => {
  //     const newData = [...prevData];
  //     newData[index][0] = text;
  //     return newData;
  //   });
  // }
  //New handleEditGoal

  function handleEditGoal(text, editIndex) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      //Loop through the data to find the right id
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === editIndex) {
          newData[i].goal = text;
          break;
        }
      }
      return newData;
    });
  }

  //Function to add the deleted Goal, to the setDeletedUserGoals Array
  function addDeletedGoal(deletedGoal) {
    setDeletedUserGoals((prevData) => {
      return [...prevData, deletedGoal];
    });
  }
  function handleDeleteGoal(index) {
    //testing
    console.log("Deleted goal is " + userGoalData[index]);

    // Store the deleted goal temporarily
    setUndoData(userGoalData[index]);

    // Save the index of the deleted goal
    setDeletedGoalIndex(index);

    // Show the undo button
    setIsUndoVisible(true);

    // Start a timer to hide the undo button after 10 seconds
    setTimeout(() => {
      setIsUndoVisible(false);
      setUndoData(null); // Clear undo data
      setDeletedGoalIndex(null); // Clear deleted goal index
    }, 10000);

    //Adding the deleted Goal to the DeletedGaol storage
    addDeletedGoal(userGoalData[index]);
    console.log(deletedUserGoals);

    //Removing the deleted goal.
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      //When the goal is deleted, we need to add the deleted gaol to
      //the new Async storage called "DeletedGoalsData"
      return newData;
    });
  }
  function addSavedGoals(savedGoals) {
    setCompletedUserGoals((prevData) => {
      return [...prevData, savedGoals];
    });
  }

  //For now i am going to make handleSaveGoals the same as handleDeleteGoal
  function handleSaveGoals(index) {
    //Replacment code
    // Store the deleted goal temporarily
    setUndoData(userGoalData[index]);

    // Save the index of the deleted goal
    //setDeletedGoalIndex(index);
    setSavedGoalIndex(index);

    // Show the undo button
    setIsUndoVisible(true);

    // Start a timer to hide the undo button after 10 seconds
    setTimeout(() => {
      setIsUndoVisible(false);
      setUndoData(null); // Clear undo data
      setDeletedGoalIndex(null); // Clear deleted goal index
    }, 10000);

    //Adding the saved Goal to the DeletedGaol storage
    addSavedGoals(userGoalData[index]);
    console.log(completedUserGoals);

    //Removing the deleted goal.
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      //When the goal is deleted, we need to add the deleted gaol to
      //the new Async storage called "DeletedGoalsData"
      return newData;
    });
  }

  //------------------------------ Event Handlers - Description --------------------------
  function handleEditDescription(text, editIndex) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      //Loop through the data to find the right id
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === editIndex) {
          newData[i].description = text;
          break;
        }
      }

      return newData;
    });
  }
  //------------------------------ Event Handlers - Priority ------------------------------
  function addPriority(priority) {
    setSelectedPriority(priority); // Store the selected priority
    console.log("Priority added" + priority);
  }
  function handleEditPriority(priority) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];

      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === editIndex) {
          newData[i].priority = priority;
          break;
        }
      }
      return newData;
    });
  }
  function renderPriorityItem({ item }) {
    //item is the data of priority, which includes the id and value
    return (
      // Add an onPress event handler to add the priority value
      <TouchableOpacity onPress={() => addPriority(item.value)}>
        <Text>{item.value}</Text>
      </TouchableOpacity>
    );
  }
  function renderPriorityEditItem({ item }) {
    return (
      <TouchableOpacity onPress={() => handleEditPriority(item.value)}>
        <Text>{item.value}</Text>
      </TouchableOpacity>
    );
  }
  //---------------------------- Dragging the goals around -----------------------------

  //------------------------------ Event Handlers - Tag ------------------------------
  function addTag(tag) {
    setSelectedTag(tag); // Store the selected Tag
    console.log("Tag added " + tag);
    modalLogic.tagModalIsNotVisible();
  }

  function renderTagItem({ item }) {
    return (
      <TouchableOpacity onPress={() => addTag(item.tag)}>
        <Text>{item.tag}</Text>
      </TouchableOpacity>
    );
  }

  function renderTagEditItem({ item }) {
    return (
      <TouchableOpacity onPress={() => handleEditTag(item.tag)}>
        <Text>{item.tag}</Text>
      </TouchableOpacity>
    );
  }
  function handleEditTag(tag) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];

      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === editIndex) {
          newData[i].tag = tag;
          break;
        }
      }
      return newData;
    });
  }
  function onChangeDate(event, selectedDate) {
    //Checking if the date is being added by the addGaol button or being added via the edit button

    if (isInputVisible === true) {
      setSelectedDate(selectedDate);
      console.log("Date is " + selectedDate);
    } else if (selectedDate) {
      // Update the due date property in the newUserGoalData object
      setUserGoalData((prevData) => {
        const newData = [...prevData];
        const goalIndex = newData.findIndex((goal) => goal.id === editIndex);
        if (goalIndex !== -1) {
          newData[goalIndex].dueDate = selectedDate;
        }
        console.log("Due date is " + selectedDate);
        return newData;
      });
    }
    // Close the date picker modal
    modalLogic.calenderModalisNotVisible();
  }

  //------------------------------ Render Functions ---------------------------------
  {
    /*These functions are used to render the UI */
  }
  const renderGoalData = ({ item, index, drag, isActive }) => {
    //console.log(`Rendering item at index ${index}:`, item);
    const isEditing = editIndex === item.id;
    // console.log("Main Edit index is " + editIndex);
    return (
      <View style={styles.userGoalsDataContainer}>
        {isEditing ? (
          <>
            <Modal
              visible={isEditGoalModalVisible}
              transparent={true}
              onBackdropPress={handleCancelEdit}
              swipeDirection={"down"}
              onSwipeComplete={handleCancelEdit}
              panResponderThreshold={4}
              animationIn={"SlideInUp"}
              animationInTiming={500}
            >
              <View style={styles.editGoalModal}>
                {/* <Button title="Cancel" onPress={handleCancelEdit} /> */}
                <View style={styles.savedeleteButtons}>
                  <Button
                    title="Save"
                    onPress={() => handleSaveGoal(item.id)}
                  />
                  <Button
                    title="Delete"
                    onPress={() => handleDeleteGoal(index)}
                  />
                </View>
                <TextInput
                  style={styles.editTextInput}
                  placeholder="Edit Goal"
                  value={item.goal}
                  onChangeText={(text) => handleEditGoal(text, editIndex)}
                />
                <TextInput
                  placeholder="Edit Description"
                  value={item.description}
                  onChangeText={(text) =>
                    handleEditDescription(text, editIndex)
                  }
                />
                {/* Buttons for date, priority, tag */}
                <View style={styles.editButtons}>
                  <TouchableOpacity
                    onPress={() => modalLogic.calenderModalIsVisible()}
                  >
                    <View style={styles.editButtonDueDate}>
                      <View style={styles.iconAndName}>
                        <Icon name="calendar"></Icon>
                        <Text> Due date: </Text>
                      </View>
                      <View style={styles.updatedContentForDateTagPrior}>
                        <Text>
                          {new Date(item.dueDate)
                            .toDateString()
                            .substring(4, 10)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => modalLogic.priorityEditModalIsVisible()}
                  >
                    <View style={[styles.editButtonPriority, {}]}>
                      <View style={styles.iconAndName}>
                        <Icon name="exclamation"></Icon>
                        <Text> Priority: </Text>
                      </View>
                      <View style={styles.DateTagAndPriority}>
                        <Text>{item.priority}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => modalLogic.tagEditModalIsVisible()}
                  >
                    <View style={styles.editButtonTag}>
                      <View style={styles.iconAndName}>
                        <Icon name="tag"></Icon>
                        <Text> Tag: </Text>
                      </View>
                      <View style={styles.DateTagAndPriority}>
                        <Text>{item.tag}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* Add any other editable fields here */}
                </View>
              </View>
              <Modal
                visible={isEditPriorityModalVisible}
                transparent={true}
                animationIn={"slideInUp"}
              >
                <View style={styles.editPriorityModal}>
                  <Text>Select your Priority</Text>
                  <Button
                    title="Close"
                    onPress={() => modalLogic.priorityEditModalIsNotVisible()}
                  />
                  <FlatList
                    data={userPriority}
                    renderItem={renderPriorityEditItem}
                  ></FlatList>
                </View>
              </Modal>

              <Modal visible={isEditTagModalVisible} transparent={true}>
                <View style={styles.editPriorityModal}>
                  <Text>Select your Tag</Text>
                  <Button
                    title="Close"
                    onPress={() => modalLogic.tagEditModalIsNotVisible()}
                  />
                  <FlatList
                    data={userTag}
                    renderItem={renderTagEditItem}
                  ></FlatList>
                </View>
              </Modal>

              <Modal visible={isCalenderModalVisible} transparent={true}>
                <View style={styles.calenderModal}>
                  <Text>Calender</Text>
                  <Button
                    title="Close"
                    onPress={() => modalLogic.calenderModalisNotVisible()}
                  />
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"datetime"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                  />
                </View>
              </Modal>
            </Modal>
          </>
        ) : (
          // <GestureHandlerRootView>
          //   {/* <Swipeable
          //     renderRightActions={renderRightActions}
          //     renderLeftActions={renderLeftActions}
          //     friction={2}
          //   > */}

          //   <PanGestureHandler onGestureEvent={PanGestureHandler}>
          //     <Animated.View style={[styles.goalItemContainer, animatedStyle]}>

          <Swipeable
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
            friction={2}

            //This makes it so the moment a swipe is opened, left or right a function is called
            // onSwipeableOpen={() => handleDeleteGoal(index)}
          >
            <TouchableHighlight
              onPress={() => handleEdit(item.id)}
              // {...console.log("Edit index 2 is " + item.id)}
              underlayColor="transparent"
              // onLongPress={drag}
            >
              <View style={styles.goalItemContainer}>
                <View style={styles.goalTextContainer}>
                  {/*Adding checkbox */}
                  {/* This view is the make the checkbox and the text in the same line */}
                  <View style={styles.checkboxAndGoalStyle}>
                    <CheckBox
                      checkedIcon={
                        <Icon
                          name="dot-circle-o"
                          type="font-awesome"
                          color="green"
                          size={40}
                        />
                      }
                      uncheckedIcon={
                        <Icon
                          name="circle-thin"
                          type="font-awesome"
                          size={40}
                          //Chaning the color depending on the priority
                          color={getCheckboxColor(item.priority)}
                        />
                      }
                      //Switching for nowdd to handleDeleteGoal
                      onPress={() => handleSaveGoals(index)}
                    />
                    <Text>{item.goal}</Text>
                  </View>
                  <Text>{item.description}</Text>
                  {/* This view is to make the priority, tag and due date in the
                  same */}
                  <View style={styles.priorityTagAndDueDateStyles}>
                    {/* <Text>Priority: {item.priority}</Text> */}

                    <View style={styles.dateAndTagDisplayContainer}>
                      <View style={styles.dateAndTagDisplay}>
                        <Text style={{ color: "purple" }}>Due Date: </Text>
                        <Text>
                          {new Date(item.dueDate)
                            .toDateString()
                            .substring(4, 10)}
                        </Text>
                      </View>
                      <View style={styles.dateAndTagDisplay}>
                        <Text>Tag: {item.tag}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </Swipeable>
          //     </Animated.View>
          //   </PanGestureHandler>

          //   {/* </Swipeable> */}
          // </GestureHandlerRootView>
        )}
      </View>
    );
  };
  //Function to change the color of the checkbox
  function getCheckboxColor(priority) {
    switch (priority) {
      case "Priority 1":
        return "red";
      case "Priority 2":
        return "orange";
      case "Priority 3":
        return "yellow";
      default:
        return "grey";
    }
  }

  function renderRightActions(index) {
    return (
      <RectButton
        style={styles.swipeToDelete}
        onPress={() => handleDeleteGoal(index)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </RectButton>
    );
  }
  function renderLeftActions(index) {
    return (
      <RectButton style={styles.swipeToDelete}>
        <Text style={styles.deleteButtonText}>SubTask</Text>
      </RectButton>
    );
  }
  function handleDragEnd({ data }) {
    setUserGoalData(data);
  }

  //Animating the addGoal button

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      //context is an object that can be used to store values
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      console.log(event.translationX, event.translationY);
    },
    //Logic to snap the button to the left side of the screen
    onEnd: (event) => {
      console.log(event);
      if (event.translationX < -150) {
        translateX.value = withSpring(-300);
        translateY.value = withSpring(0);
      } else if (event.translationY < 300 && event.translationX > 0) {
        translateX.value = withSpring(27);
        translateY.value = withSpring(-350);
      } else {
        console.log("TranslateX is " + event.translationX);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }

      // translateX.value = withSpring(0);
      // translateY.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  function testTest1() {
    console.log("Test test 1");
  }
  const [modalVisible, setModalVisible] = useState(false);
  const animatedValue = new Animated.Value(0);

  //------------------------------------------------------------------------------------
  return (
    //Flatlist for the goals
    <View style={styles.container}>
      <View style={styles.goalsContainer}>
        <View style={styles.headerContainer}>
          {/* Add the clear all button */}

          {/* New code for sections, inbox and settings */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onBackdropPress={() => {
              setModalVisible(!modalVisible);
            }}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>

                {/* Add the clear all button */}
                <Text> Number of goals: {arraylength()}</Text>
                <TouchableHighlight onPress={() => deleteLogic.clearGoals()}>
                  <Icon name="trash-o" size="30" color="blue"></Icon>
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={() => deleteLogic.handleClearAllGoals()}
                >
                  <Icon name="trash" size="30" color="red"></Icon>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.sectionButtons}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="inbox" size={30} color="#3A2B45" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionButtons}>
            <Icon name="archive" size={30} color={"#3A2B45"} />
          </TouchableOpacity>
          <Text>Trust the Process</Text>

          <TouchableOpacity style={styles.sectionButtons}>
            <Icon name="folder-open-o" size={30} color={"#3A2B45"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButtons}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="ellipsis-h" size={30} color="#3A2B45" />
          </TouchableOpacity>
        </View>
        {/* <DraggableFlatList*/}
        {/* <DraggableFlatList
          data={userGoalData}
          renderItem={({ item, index, drag, isActive }) =>
            renderGoalData({ item, index, drag, isActive })
          }
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => handleDragEnd({ data })}
          // onDragEnd={({ data }) => {
          //   // Update the userGoalData with the new order after dragging
          //   setUserGoalData(data);
          // }}
          onOverLap={console.log("Overlapped")}
        /> */}

        <View style={styles.DraggableFlatListContainer}>
          <DraxProvider>
            <View>
              <DraxList
                data={userGoalData}
                renderItemContent={({ item, index, drag, isActive }) =>
                  renderGoalData({ item, index, drag, isActive })
                }
                //When the item is reordered
                onItemReorder={({ fromIndex, toIndex }) => {
                  // Create a copy of the data array
                  const newData = [...userGoalData];
                  // Remove the item from the fromIndex
                  const [draggedItem] = newData.splice(fromIndex, 1);
                  // Insert the draggedItem at the toIndex
                  newData.splice(toIndex, 0, draggedItem);
                  // Update the userGoalData with the new order
                  setUserGoalData(newData);
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          </DraxProvider>
        </View>
      </View>
      {/* Wrap the content with TouchableWithoutFeedback */}
      <TouchableWithoutFeedback onPress={handleDismissContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          {/* Show the input field and buttons when isInputVisible is true */}
          {isInputVisible ? (
            <View style={styles.showEverything}>
              {/* Goal and Description Inputs */}
              <View style={styles.goalAndDescriptionTextInput}>
                <View>
                  <TextInput
                    style={styles.goalTextInput}
                    placeholder="Add Goal"
                    //onSubmitEditing={handleAddGoal}
                    autoFocus={true}
                    value={enteredGoal}
                    onChangeText={handleInputChangeGoal}
                  />
                </View>
                <View style={{ borderWidth: 0 }}>
                  <TextInput
                    style={styles.descriptiontextInput}
                    placeholder="Description"
                    value={enteredDescription}
                    onChangeText={handleInputChangeDescription}
                  />
                </View>
              </View>
              {/* Buttons for date, goa, priority, tag */}
              {/* <Button title="Add Goal" onPress={addGoalHandler} /> */}
              <View style={styles.addGaolButtons}>
                <TouchableOpacity
                  style={{ marginRight: 50 }}
                  // onPress={modalLogic.calenderModalIsVisible()}
                  onPress={() => modalLogic.calenderModalIsVisible()}
                >
                  <Icon name="calendar" size={25} color="purple" />
                  <Text>{new Date(selectedDate).toDateString()}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginRight: 50 }}
                  onPress={() => modalLogic.priorityModalIsVisible()}
                >
                  <Icon name="bolt" size={25} color="purple" />
                  <Text>{selectedPriority}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginRight: 0 }}
                  onPress={() => modalLogic.tagModalIsVisible()}
                >
                  <Icon name="tag" size={25} color="purple" />
                  <Text>{selectedTag}</Text>
                </TouchableOpacity>
              </View>

              {/* Add Goal Button */}
              <View style={styles.submitGoalButton}>
                <TouchableOpacity onPress={() => addGoalLogic.addGoalHandler()}>
                  <Icon name="chevron-up" size={50} color="purple" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // Show this button when isInputVisible is false
            <View>
              <View style={styles.bottomButtonsContainer}>
                {/* Browse Button */}
                {/* Browse Button */}
                {/* <TouchableOpacity>
                  <Icon name="eye" size={30} style={styles.buttonIcons} />
                  <Text style={styles.buttonText}>Browse</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity>
                  <Icon name="archive" size={30} style={styles.buttonIcons} />
                  <Text style={styles.buttonText}>Sections</Text>
                </TouchableOpacity> */}

                {/* Line between buttons 2 and 3 */}
                <View style={styles.line} />

                {/* <TouchableOpacity>
                  <Icon
                    name="folder-open-o"
                    size={30}
                    style={styles.buttonIcons}
                  />
                  <Text style={styles.buttonText}>Random</Text>
                </TouchableOpacity> */}
              </View>
              <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.addGoalButton, rStyle]}>
                  <TouchableOpacity
                    onPress={() => addGoalLogic.handleAddGoal()}
                    onLongPress={() => testTest1()}
                  >
                    <Icon name="plus-circle" size={45} color="red" />
                  </TouchableOpacity>
                </Animated.View>
              </PanGestureHandler>
            </View>

            // <Button title="Add Goal" onPress={handleAddGoal} />
          )}
          {/* Rendering the undo button conditionally */}
          {isUndoVisible && (
            <View style={styles.undoButtonContainer}>
              <Button title="Undo" onPress={() => deleteLogic.handleUndo()} />
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {/* Priority Modal */}
      <Modal
        visible={isPriorityModalVisible}
        transparent={true}
        animationIn={"slideInUp"}
      >
        <View style={styles.priorityModal}>
          <Text style={styles.PriorityView}> Choose your priority</Text>
          <View style={styles.priorityFlatlist}>
            <FlatList data={userPriority} renderItem={renderPriorityItem} />
            <Button
              title="Close"
              onPress={() => modalLogic.priorityModalIsNotVisible()}
            />
          </View>
        </View>
      </Modal>

      {/* Tag Modal */}
      <Modal visible={isTagModalVisible} transparent={true}>
        <View style={styles.priorityModal}>
          <Text style={styles.PriorityView}> Tag View Text</Text>
          <View style={styles.priorityFlatlist}>
            <FlatList data={userTag} renderItem={renderTagItem}></FlatList>
            <Button
              title="Close"
              onPress={() => modalLogic.tagModalIsNotVisible()}
            />
          </View>
        </View>
      </Modal>

      {/* Calender Modal */}
      <Modal visible={isCalenderModalVisible} transparent={true}>
        <View style={styles.calenderModal}>
          <Text>Calender</Text>
          <Button
            title="Close"
            onPress={modalLogic.calenderModalisNotVisible}
          />
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={"datetime"}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        </View>
      </Modal>

      {/* Add the Flatlist for the priority */}
    </View>
  );
}
export default GoalScreen;
//Another new style code
// Updated Styles
const styles = StyleSheet.create({
  //Style for the whole screen
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff", // Modern purple background color
    alignItems: "center",
    justifyContent: "center",
  },
  goalsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 0,
    width: "100%",
    paddingHorizontal: 10,
    height: "100%",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    paddingBottom: 20,
  },
  editTextInput: {
    borderColor: "#8a6aff", // Lighter purple border color
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#e1d9ff", // Lighter purple background color
  },
  userGoalsDataContainer: {
    // borderBottomWidth: 1,
    borderBottomColor: "#d1c6ff", // Light purple border color
    padding: 5,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  showEverything: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#c7bfff", // Lighter purple background color
    borderRadius: 10,
    padding: 20,
  },
  priorityModal: {
    top: "40%",
    left: "10%",
    transform: [{ translateX: -50 }],
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1,
    width: 200,
    height: 200,
    backgroundColor: "#e1d9ff", // Lighter purple background color
    borderColor: "#8a6aff", // Lighter purple border color
    borderWidth: 1,
  },
  PriorityView: {
    width: "100%",
    height: 40,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8a6aff", // Lighter purple border color
  },
  priorityFlatlist: {
    height: 100,
    borderWidth: 1,
    borderColor: "#8a6aff", // Lighter purple border color
  },
  goalItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e1d9ff", // Lighter purple background color
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    elevation: 2,
    marginBottom: 10,
    marginVertical: 0,
  },
  goalTextContainer: {
    flex: 1,
    fontSize: 20,
  },
  //Styles for the swipe to delete button
  swipeToDelete: {
    backgroundColor: "#CAA3B9", // Set the background color of the swipe button
    justifyContent: "center",
    alignItems: "flex-end",
    //paddingRight: 20, // Adjust the padding for better spacing
    height: "93%", // Make sure the button takes the full height of the swipe area
  },
  deleteButtonText: {
    color: "white", // Set the text color
    fontSize: 16, // Adjust the font size
    fontWeight: "bold", // Add bold font weight for emphasis
    paddingVertical: 10, // Adjust the vertical padding for better spacing
    paddingHorizontal: 20, // Adjust the horizontal padding for better spacing
  },

  //
  editGoalModal: {
    flex: 1,
    //\\justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(138, 106, 255, 1)",
    padding: 20,
    position: "absolute",
    left: 0,
    right: 0,
    top: 200,
    bottom: 0,
    zIndex: 1,
    width: "100%",
    // justifyContent: "flex-end",
    margin: 0,
  },
  editPriorityModal: {
    //  ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8a6aff",
    padding: 20,
    zIndex: 1,
    width: "100%",
    height: 250,
  },
  addButton: {
    backgroundColor: "#8a6aff", // Lighter purple button background color
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  addGoalButton: {
    color: "#FFF",
    borderRadius: 50,
    backgroundColor: "#7a6aff", // Lighter purple button background color
    paddingHorizontal: 15,
    paddingVertical: 15,
    position: "absolute",
    bottom: 20,
    right: -200,
  },
  editTagModal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 40,
  },
  calenderModal: {
    top: "40%",
    left: "10%",
    transform: [{ translateX: -50 }],
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1,
    width: 200,
    height: 200,
    backgroundColor: "#e1d9ff", // Lighter purple background color
    borderColor: "#8a6aff", // Lighter purple border color
    borderWidth: 1,
  },

  //Styles to edit the buttons in the edit goals modal
  editButtonTag: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  editButtonDueDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  editButtonPriority: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  savedeleteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  addGaolButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderColor: "#8a6aff", // Lighter purple border color
    borderWidth: 0,
    left: -70,
    top: -20,
  },
  submitGoalButton: {
    marginLeft: 300,
  },
  goalTextInput: {
    borderColor: "#8a6aff", // Lighter purple border color
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#e1d9ff", // Lighter purple background color
    fontSize: 15,
  },
  descriptiontextInput: {
    borderColor: "#8a6aff", // Lighter purple border color
    borderWidth: 0,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    borderRadius: 8,
    // backgroundColor: "#e1d9ff", // Lighter purple background color
    right: -40,
    fontSize: 20,
  },
  goalAndDescriptionTextInput: {
    marginBottom: 10,
    width: "80%",
  },
  checkboxAndGoalStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  priorityTagAndDueDateStyles: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  //Styles for the draggable flatlist
  DraggableFlatListContainer: {
    flex: 0.9,
    width: "100%",
  },
  //Undo Button Style
  undoButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "50%",
    padding: 20,
    right: -120,
  },

  // line: {
  //   flex: 1,
  //   height: 3,
  //   backgroundColor: "purple",
  // },

  buttonIcons: {
    color: "purple",
  },

  buttonText: {
    color: "purple",
    // marginTop: 5, // Adjust as needed
  },

  //Styles for the Date and Tag displayed on the screen
  dateAndTagDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderRadius: 5,
    padding: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateAndTagDisplayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "100%",
  },

  //Settings Modal - Ellipsis
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%", // Add this line
    height: "50%", // Add this line
  },

  //Styles for the edit goal modal
  iconAndName: {
    flexDirection: "row",
    alignItems: "center",
  },
  DateTagAndPriority: {
    flexDirection: "row",
    alignItems: "center",
  },
});
