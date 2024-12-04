import { View, Text, Button } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
export default function Page() {
  const user = auth().currentUser;

  return (
    <View>
      <Text>Welcome back, {user?.email}</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
}
