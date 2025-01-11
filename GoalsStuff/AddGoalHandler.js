const AddGoalHandler = ({
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
}) => {
  function addGoalHandler() {
    if (enteredGoal.trim() !== "") {
      console.log(enteredGoal);
      const newUserGoalData = {
        id: Math.random().toString(), // Generate a unique ID (you might want to use a better method)
        goal: enteredGoal.trim(),
        description: enteredDescription.trim(),
        priority: selectedPriority,
        tag: selectedTag,
        dueDate: selectedDate,
      };
      setUserGoalData((prevData) => [...prevData, newUserGoalData]);
      removeText(); // Move this line outside the if blocks
      setSelectedPriority("");
      setSelectedTag("");
      setSelectedDate(null);
    }
  }

  function handleAddGoal() {
    setInputVisible(true); // Show the input field and buttons when this button is clicked
  }
  return {
    addGoalHandler,
    handleAddGoal,
  };
};

export default AddGoalHandler;
