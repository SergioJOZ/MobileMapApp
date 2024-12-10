import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUserInDatabase = async () => {
    try {
      const user = await axios.post("http://localhost:4000/users", {
        realname: name,
        email: email,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <View className="flex-1 mx-5 justify-center">
      {loading ? (
        <ActivityIndicator size={"small"} className="m-7" />
      ) : (
        <KeyboardAvoidingView>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electronico"
            autoCapitalize="none"
            keyboardType="email-address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre real"
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar contraseña"
            autoCapitalize="none"
            secureTextEntry
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <Pressable
            className="bg-orange-400 rounded-md py-4 mt-4"
            disabled={
              email === "" ||
              name === "" ||
              password === "" ||
              (confirmPassword === "" && password === confirmPassword)
            }
            onPress={() => {
              createUserInDatabase();
              signUp();
            }}
          >
            <Text className="text-center text-white">Registrarme</Text>
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}
