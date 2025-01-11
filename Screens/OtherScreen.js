import React, { createContext, useState, useEffect, useContext } from "react";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import userPriorityContext from "../StoreAppData/PriorityData";
import userTagContext from "../StoreAppData/TagData";
import DeletedUserGoalsContext from "../StoreAppData/DeletedGoalsData";
import CompletedUserGoalsContext from "../StoreAppData/CompletedGoalsData";
//import DraggableButton from './DraggableButton'; // Adjust the path accordingly

function OtherScreen({ navigation }) {
  const [isPriorityModalVisible, setIsPriorityModalVisible] = useState(false);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [enteredTag, setEnteredTag] = useState("");
  const [isViewSavedGoalModalVisible, setisViewSavedGoalModalVisible] =
    useState(false);
  const [isViewDeletedGoalModalVisible, setisViewDeletedGoalModalVisible] =
    useState(false);

  const { userPriority, setUserPriority } = useContext(userPriorityContext);
  const { userTag, setUserTag } = useContext(userTagContext);
  const { deletedUserGoals, setDeletedUserGoals } = useContext(
    DeletedUserGoalsContext
  );
  const { completedUserGoals, setCompletedUserGoals } = useContext(
    CompletedUserGoalsContext
  );

  function handleTagChange(text) {
    setEnteredTag(text);
  }

  function priorityModalIsVisible() {
    setIsPriorityModalVisible(true);
  }

  function priorityModalIsNotVisible() {
    setIsPriorityModalVisible(false);
  }

  function tagModalIsVisible() {
    setIsTagModalVisible(true);
  }

  function tagModalIsNotVisible() {
    setIsTagModalVisible(false);
  }

  function addNewPriority() {
    const newPriorityValue = `Priority ${userPriority.length + 1}`;
    const newId = Math.max(...userPriority.map((item) => item.id), 0) + 1;

    setUserPriority((prevPriority) => [
      ...prevPriority,
      { id: newId, value: newPriorityValue },
    ]);
    console.log(userPriority);
  }

  function removePriority() {
    if (userPriority.length === 0) {
      return;
    }

    const newPriorityList = userPriority.slice(0, -1);
    setUserPriority(newPriorityList);

    console.log(userPriority);
  }

  function addNewTag() {
    const newTag = enteredTag;
    const newId = Math.max(...userTag.map((item) => item.id), 0) + 1;
    if (newTag === "") {
      return;
    }
    setUserTag((prevTag) => [...prevTag, { id: newId, tag: newTag }]);
    console.log(userTag);
    setEnteredTag("");
  }

  function removeTag(id) {
    const newTagList = userTag.filter((item) => item.id !== id);
    setUserTag(newTagList);
  }

  function renderPriorityItem({ item }) {
    return (
      <View>
        <Text>{item.value}</Text>
      </View>
    );
  }

  function renderSavedUserGoals() {
    return (
      <View style={styles.savedGoalsContainer}>
        <Text>Saved Goals</Text>
        <FlatList
          data={completedUserGoals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.savedGoalItem}>
              <Text style={styles.savedGoalText}>Goal: {item.goal}</Text>
              <Text style={styles.savedGoalText}>
                Description: {item.description}
              </Text>
              <Text style={styles.savedGoalText}>
                Priority: {item.priority}
              </Text>
              <Text style={styles.savedGoalText}>Tag: {item.tag}</Text>
            </View>
          )}
        />
        <Button title="Close" onPress={closeSavedGoalsModal} />
      </View>
    );
  }

  function renderDeletedUserGoals() {
    return (
      <View style={styles.savedGoalsContainer}>
        <Text>Deleted Goals</Text>

        <FlatList
          data={deletedUserGoals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.savedGoalItem}>
              <Text style={styles.savedGoalText}>Goal: {item.goal}</Text>
              <Text style={styles.savedGoalText}>
                Description: {item.description}
              </Text>
              <Text style={styles.savedGoalText}>
                Priority: {item.priority}
              </Text>
              <Text style={styles.savedGoalText}>Tag: {item.tag}</Text>
            </View>
          )}
        />
        <Button title="Close" onPress={closeDeletedGoalsModal} />
      </View>
    );
  }

  function closeDeletedGoalsModal() {
    setisViewDeletedGoalModalVisible(false);
  }
  function closeSavedGoalsModal() {
    setisViewSavedGoalModalVisible(false);
  }

  function renderTagItem({ item }) {
    const renderRightActions = () => (
      <RectButton
        style={styles.swipeToDelete}
        onPress={() => removeTag(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </RectButton>
    );

    return (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.tagItemContainer}>
            <Text>{item.tag}</Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }

  function savedGoalsModalIsVisible() {
    setisViewSavedGoalModalVisible(true);
  }

  function deletedGoalsModalIsVisible() {
    setisViewDeletedGoalModalVisible(true);
  }

  return (
    <View>
      <Text>Settings Screen</Text>
      <Button title="Account" />
      <Button title="General" />
      <Button title="Edit Priority" onPress={priorityModalIsVisible} />
      <Button title="Edit Tags" onPress={tagModalIsVisible} />
      <Button title="View Saved Goals" onPress={savedGoalsModalIsVisible} />
      <Button title="View Deleted Goals" onPress={deletedGoalsModalIsVisible} />

      <Modal visible={isPriorityModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Priority</Text>
            <Button title="Add more priority" onPress={addNewPriority} />
            <Button title="Remove priority" onPress={removePriority} />
            <Button title="Close" onPress={priorityModalIsNotVisible} />
            <FlatList
              data={userPriority}
              renderItem={renderPriorityItem}
            ></FlatList>
          </View>
        </View>
      </Modal>

      <Modal visible={isTagModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Tags</Text>
            <TextInput
              placeholder="Add new tag"
              onChangeText={handleTagChange}
              value={enteredTag}
            />
            <Button title="Add tag" onPress={addNewTag} />
            <Button title="Close" onPress={tagModalIsNotVisible} />
            <View style={styles.tagFlatList}>
              <FlatList data={userTag} renderItem={renderTagItem}></FlatList>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isViewSavedGoalModalVisible} transparent={true}>
        <View style={styles.savedGoalsModalContainer}>
          {renderSavedUserGoals()}
        </View>
      </Modal>

      <Modal visible={isViewDeletedGoalModalVisible} transparent={true}>
        <View style={styles.savedGoalsModalContainer}>
          {renderDeletedUserGoals()}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  tagItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  swipeToDelete: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FF0000",
    padding: 10,
    marginLeft: 15,
    marginRight: -15,
  },
  tagFlatList: {
    height: 300,
  },
  savedGoalsContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "100%",
    maxHeight: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  savedGoalItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  savedGoalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  savedGoalsModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OtherScreen;
