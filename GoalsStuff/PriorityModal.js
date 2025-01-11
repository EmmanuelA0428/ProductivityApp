// import React from 'react';
// import { Modal, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
// const PriorityModal = ({ visible, onClose, priorities, onSelectPriority }) => {
//     return (
//         <Modal visible={visible} transparent={true} animationType="slide">
//             <View style={styles.modalView}>
//                 <Text style={styles.modalTitle}>Select Priority</Text>
//                 <FlatList
//                     data={priorities}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => onSelectPriority(item)}>
//                             <Text style={styles.item}>{item.name}</Text>
//                         </TouchableOpacity>
//                     )}
//                 />
//                 <Button title="Close" onPress={onClose} />
//             </View>
//         </Modal>
//     );
// };
// const styles = {
//     modalView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalTitle: {
//         fontSize: 20,
//         marginBottom: 15,
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//     },
// };
// export default PriorityModal;
