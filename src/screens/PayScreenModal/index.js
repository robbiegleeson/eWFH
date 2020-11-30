import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PayScreenModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Button onPress={() => {setModalVisible(true)}}
        buttonStyle={styles.buttonStyle}
        icon={
          <Ionicons name="plus" color="#000" />
        }
      />
      {modalVisible && (
        <View style={styles.container}>
          <Modal
            backdropOpacity={0.3}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.contentView}
          >
            <View style={styles.content}>
              <Text style={styles.contentTitle}>Hi 👋!</Text>
              <Text>Hello from Overlay!</Text>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}

export default PayScreenModal;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
	buttonStyle: {
    height: 90,
    width: 90,
    backgroundColor: 'grey',
    borderRadius: 100
  }
});