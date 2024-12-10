import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
export default function DecisitionPage() {
  const user = auth().currentUser;
  const router = useRouter();

  const handleSelect = (value: string) => {
    if (value === "client") {
      try {
        axios.put(
          `http://localhost:4000/users/initialConfig/${user?.email}/${value}`,
          {
            initialConfigMade: true,
            role: "client",
          }
        );

        alert("Configuracion guardada");

        router.replace("/(auth)/home");
      } catch (e) {
        alert("Error al guardar la configuracion");
      }
    } else if (value === "server") {
      try {
        axios.put(
          `http://localhost:4000/users/initialConfig/${user?.email}/${value}`,
          {
            initialConfigMade: true,
            role: "server",
          }
        );

        alert("Configuracion guardada");

        router.replace("/(auth)/home");
      } catch (e) {
        alert("Error al guardar la configuracion");
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">
        Bienvenido a la app, quieres ser un cliente o un servidor?
      </Text>

      <Pressable
        className="bg-blue-500 p-2 rounded-md mt-5"
        onPress={() => {
          handleSelect("client");
        }}
      >
        <Text>Cliente</Text>
      </Pressable>

      <Pressable
        className="bg-blue-500 p-2 rounded-md mt-5"
        onPress={() => {
          handleSelect("server");
        }}
      >
        <Text>Servidor</Text>
      </Pressable>
    </View>
  );
}
