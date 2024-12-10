import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

export default function Page() {
  const user = auth().currentUser;
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation().catch(console.error);
  }, []);

  useEffect(() => {
    console.log(user);
    const getUserFromDB = async () => {
      const userDB = await axios.get(
        "http://localhost:4000/users/findByEmail/" + user?.email
      );

      if (userDB && userDB.data?.initialConfigMade === false)
        router.replace("/(auth)/decisition");
    };

    getUserFromDB().catch(console.error);
  }, []);

  return (
    <View>
      <Text>Welcome back, {user?.email}</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
      <Pressable onPress={() => router.replace("/(auth)/map")}>
        <Text>Go to map</Text>
      </Pressable>
    </View>
  );
}
