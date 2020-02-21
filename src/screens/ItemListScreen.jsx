import React, { useState } from "react";
import { View, Text, Button } from "react-native";

import AddModal from "../components/AddModal";

export default function ItemListScreen(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Item List</Text>
      <Button title="Show Modal" onPress={() => setShowModal(true)} />
      <AddModal visible={showModal} setVisible={setShowModal}></AddModal>
    </View>
  );
}
