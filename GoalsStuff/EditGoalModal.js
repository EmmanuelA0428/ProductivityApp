// import React from "react";
// import {
//   Modal,
//   View,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   Text,
// } from "react-native";

// const EditGoalModal = ({
//   isEditGoalModalVisible,
//   setEditGoalModalVisible,
//   item,
//   handleEditGoal,
//   handleEditDescription,
//   priorityEditModalIsVisible,
//   tagEditModalIsVisible,
//   handleSaveGoal,
//   handleCancelEdit,
//   handleDeleteGoal,
//   styles,
// }) => {
//   return (
//     <Modal visible={isEditGoalModalVisible} transparent={true}>
//       <View style={styles.editGoalModal}>
//         <TextInput
//           style={styles.editTextInput}
//           placeholder="Edit Goal"
//           value={item[0]}
//           onChangeText={(text) => handleEditGoal(text)}
//         />
//         <TextInput
//           placeholder="Edit Description"
//           value={item[1]}
//           onChangeText={(text) => handleEditDescription(text)}
//         />
//         <TouchableOpacity onPress={priorityEditModalIsVisible}>
//           <Text>Priority: {item[2]}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={tagEditModalIsVisible}>
//           <Text>Tag: {item[3]}</Text>
//         </TouchableOpacity>
//         <Button title="Save" onPress={handleSaveGoal} />
//         <Button title="Cancel" onPress={handleCancelEdit} />
//         <Button title="Delete" onPress={handleDeleteGoal} />
//       </View>
//     </Modal>
//   );
// };

// export default EditGoalModal;
