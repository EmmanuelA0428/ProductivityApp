// // GoalItem.js
// import React from "react";
// import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
// import { Swipeable, RectButton } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { CheckBox } from "react-native-elements";
// import Animated from "react-native-reanimated";

// function handleEditGoal(text, index) {
//   setUserGoalData((prevData) => {
//     const newData = [...prevData];
//     newData[index][0] = text;
//     return newData;
//   });
// }
// function handleEditDescription(text, index) {
//   setUserGoalData((prevData) => {
//     const newData = [...prevData];
//     newData[index][1] = text;
//     return newData;
//   });
// }
// function handleSaveGoal(index) {
//   setEditIndex(null);
//   console.log("Goal saved");
// }
// function handleDeleteGoal(index) {
//   // Store the deleted goal temporarily
//   setUndoData(userGoalData[index]);

//   // Show the undo button
//   setIsUndoVisible(true);

//   // Start a timer to hide the undo button after 10 seconds
//   setTimeout(() => {
//     setIsUndoVisible(false);
//     setUndoData(null); // Clear undo data
//   }, 10000);

//   //Adding the deleted Goal to the DeletedGaol storage
//   addDeletedGoal(userGoalData[index]);
//   console.log(deletedUserGoals);

//   //Removing the deleted goal.
//   setUserGoalData((prevData) => {
//     const newData = [...prevData];
//     newData.splice(index, 1);

//     //When the goal is deleted, we need to add the deleted gaol to
//     //the new Async storage called "DeletedGoalsData"

//     return newData;
//   });
// }

// const renderGoalData = ({ item, index, drag, isActive }) => {

//   const isEditing = editIndex === index;
//   return (
//     <View style={styles.userGoalsDataContainer}>
//       {isEditing ? (
//         <>
//           <Modal visible={isEditGoalModalVisible} transparent={true}>
//             <View style={styles.editGoalModal}>
//               <TextInput
//                 style={styles.editTextInput}
//                 placeholder="Edit Goal"
//                 value={item[0]}
//                 onChangeText={(text) => handleEditGoal(text, index)}
//               />

//               <TextInput
//                 placeholder="Edit Description"
//                 value={item[1]}
//                 onChangeText={(text) => handleEditDescription(text, index)}
//               />

//               <TouchableOpacity onPress={priorityEditModalIsVisible}>
//                 <Icon name="exclamation"></Icon>
//                 <Text>Priority: {item[2]}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={tagEditModalIsVisible}>
//                 <Icon name="tag"></Icon>
//                 <Text>Tag: {item[3]}</Text>
//               </TouchableOpacity>

//               {/* Add any other editable fields here */}
//               <Button title="Save" onPress={() => handleSaveGoal(index)} />
//               <Button title="Cancel" onPress={handleCancelEdit} />
//               <Button title="Delete" onPress={() => handleDeleteGoal(index)} />
//             </View>
//             <Modal visible={isEditPriorityModalVisible} transparent={true}>
//               <View style={styles.editPriorityModal}>
//                 <Text>Priority</Text>
//                 <Button title="Close" onPress={priorityEditModalIsNotVisible} />
//                 <FlatList
//                   data={userPriority}
//                   renderItem={renderPriorityEditItem}
//                 ></FlatList>
//               </View>
//             </Modal>

//             <Modal visible={isEditTagModalVisible} transparent={true}>
//               <View style={styles.editPriorityModal}>
//                 <Text>Tag</Text>
//                 <Button title="Close" onPress={tagEditModalIsNotVisible} />
//                 <FlatList
//                   data={userTag}
//                   renderItem={renderTagEditItem}
//                 ></FlatList>
//               </View>
//             </Modal>
//           </Modal>
//         </>
//       ) : (
//         // <GestureHandlerRootView>
//         //   {/* <Swipeable
//         //     renderRightActions={renderRightActions}
//         //     renderLeftActions={renderLeftActions}
//         //     friction={2}
//         //   > */}

//         //   <PanGestureHandler onGestureEvent={PanGestureHandler}>
//         //     <Animated.View style={[styles.goalItemContainer, animatedStyle]}>

//         <Swipeable
//           renderRightActions={renderRightActions}
//           onSwipeableOpen={() => handleDeleteGoal(index)}
//         >
//           <TouchableHighlight
//             onPress={() => handleEdit(index)}
//             underlayColor="transparent"
//             onLongPress={drag}
//           >
//             <View style={styles.goalItemContainer}>
//               <View style={styles.goalTextContainer}>
//                 {/*Adding checkbox */}
//                 <CheckBox
//                   checkedIcon={
//                     <Icon
//                       name="dot-circle-o"
//                       type="font-awesome"
//                       color="green"
//                       size={40}
//                     />
//                   }
//                   uncheckedIcon={
//                     <Icon
//                       name="circle-thin"
//                       type="font-awesome"
//                       color="grey"
//                       size={40}
//                     />

//                     //onPress - calls a function when the checkbox is clicked
//                     //Add an undo feature
//                   }
//                   onPress={() => handleSaveGoals(index)}
//                 />
//                 <Text>{item[0]}</Text>
//                 <Text>{item[1]}</Text>
//                 <Text>Priority: {item[2]}</Text>
//                 <Text>Tag: item: {item[3]}</Text>
//               </View>
//             </View>
//           </TouchableHighlight>
//         </Swipeable>
//         //     </Animated.View>
//         //   </PanGestureHandler>

//         //   {/* </Swipeable> */}
//         // </GestureHandlerRootView>
//       )}
//     </View>
//   );
// };
// export default renderGoalData;
