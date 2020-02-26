import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput
} from "react-native";

export default function ChangeNumberModal(props) {
  const {
    confirmText,
    setModalVisible,
    processTransaction,
    modalVisible
  } = props;
  const [quantity, setQuantity] = useState("1");

  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.background}>
          <Text style={{ flex: 0.2, color: "white" }}>{confirmText}</Text>
          <TextInput
            value={quantity}
            onChangeText={text => setQuantity(text)}
            autoFocus={true}
            style={styles.input}
            keyboardType="phone-pad"
          ></TextInput>
          <View style={styles.footer}>
            <TouchableOpacity
              style={{
                flex: 0.5
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.5
              }}
              onPress={quantity => processTransaction(quantity)}
            >
              <Text style={styles.saveBtn}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  input: {
    textAlign: "center",
    flex: 0.3,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
    width: 100
  },
  footer: {
    flex: 0.3,
    alignItems: "flex-end",
    flexDirection: "row"
  },
  cancelBtn: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#e74c3c"
  },
  saveBtn: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#2ecc71"
  }
});
