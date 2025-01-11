//Logic for deleting
const AllModals = ({
  setEditGoalModalVisible,
  setEditPriorityModalVisible,
  setPriorityModalVisible,
  setTagModalVisible,
  setEditTagModalVisible,
  setCalenderModalVisible,
  setAddGoalModalIsOpen,
}) => {
  //Edit Goal Modal Visibility
  function setEditGoalModalVisibleTrue() {
    setEditGoalModalVisible(true);
  }
  function setEditGoalModalVisibleFalse() {
    setEditGoalModalVisible(false);
  }
  //Edit Priority Modal Visibility
  function priorityEditModalIsVisible() {
    setEditPriorityModalVisible(true);
    console.log("Priority modal is visible");
  }
  function priorityEditModalIsNotVisible() {
    setEditPriorityModalVisible(false);
  }
  //Priority Modal Visibility
  function priorityModalIsVisible() {
    setPriorityModalVisible(true);
  }
  function priorityModalIsNotVisible() {
    setPriorityModalVisible(false);
    console.log("Priority modal is not visible");
  }
  //Tag Modal Visibility
  function tagModalIsVisible() {
    setTagModalVisible(true);
  }
  function tagModalIsNotVisible() {
    setTagModalVisible(false);
  }
  //Edit Tag Modal Visibility
  function tagEditModalIsVisible() {
    setEditTagModalVisible(true);
    console.log("Tag modal is visible");
  }
  function tagEditModalIsNotVisible() {
    setEditTagModalVisible(false);
  }

  // Calender modal
  function calenderModalIsVisible() {
    setCalenderModalVisible(true);
  }
  function calenderModalisNotVisible() {
    setCalenderModalVisible(false);
    console.log("Calender modal is not visible");
  }
  // Add Goal Modal Visibility
  function addGoalModalIsVisible() {
    setAddGoalModalIsOpen(true);
  }

  return {
    //Modal Visibilities
    setEditGoalModalVisibleTrue,
    setEditGoalModalVisibleFalse,
    priorityEditModalIsVisible,
    priorityEditModalIsNotVisible,
    priorityModalIsVisible,
    priorityModalIsNotVisible,
    tagModalIsVisible,
    tagModalIsNotVisible,
    tagEditModalIsVisible,
    tagEditModalIsNotVisible,
    calenderModalIsVisible,
    calenderModalisNotVisible,
    addGoalModalIsVisible,
  };
};

export default AllModals;
