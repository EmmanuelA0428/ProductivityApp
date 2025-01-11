//Logic for deleting
const DeleteGoalLogic = ({
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
}) => {
  function handleClearAllGoals() {
    // Clear all goals from state and storage
    setUserGoals([]);
    setUserDescription([]);
    setUserGoalData([]);
    setDeletedUserGoals([]);
    setCompletedUserGoals([]);
    // You may need to add more logic based on your application requirements
  }
  function clearGoals() {
    setUserGoals([]);
    setUserDescription([]);
    setUserGoalData([]);
    console.log("Goals cleared");
  }
  function handleUndo() {
    if (undoData) {
      // Use the saved index to add the goal back at the correct position
      if (deletedGoalIndex !== null) {
        setUserGoalData((prevData) => [
          ...prevData.slice(0, deletedGoalIndex),
          undoData,
          ...prevData.slice(deletedGoalIndex),
        ]);
      } else if (savedGoalIndex !== null) {
        setUserGoalData((prevData) => [
          ...prevData.slice(0, savedGoalIndex),
          undoData,
          ...prevData.slice(savedGoalIndex),
        ]);
      } else {
        // If neither index is saved, simply add the goal to the end
        setUserGoalData((prevData) => [...prevData, undoData]);
      }
    }
    // Hide the undo button and clear undo data and saved indexes
    setIsUndoVisible(false);
    setUndoData(null);
    setDeletedGoalIndex(null);
    setSavedGoalIndex(null);
  }
  return {
    handleClearAllGoals,
    clearGoals,
    handleUndo,
  };
};

export default DeleteGoalLogic;
