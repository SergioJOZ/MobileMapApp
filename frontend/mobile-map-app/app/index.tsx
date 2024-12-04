import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Link } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Configure google sigin
  GoogleSignin.configure({
    webClientId: process.env.GOOGLE_CLIENT_ID,
  });
  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      console.log(err.message);
      if (err.message.includes("invalid-credential")) {
        alert("Correo o contraseña incorrecta.");
      } else {
        alert("El campo correo o contraseña estan vacios.");
      }
    } finally {
      setLoading(false);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      //Check if the device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();

      var idToken = signInResult.data?.idToken;

      if (idToken) {
        const credential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);
      } else {
        throw new Error("No se pudo iniciar sesion con google");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1 mx-5 justify-center">
      <Text className="text-3xl font-bold text-center">Mobile Map App</Text>
      <Text className="text-center text-xl">Bienvenido, inicia sesion:</Text>
      <KeyboardAvoidingView behavior="padding" className="">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {loading ? (
          <ActivityIndicator size={"small"} className="m-7" />
        ) : (
          <>
            <TouchableHighlight
              onPress={signIn}
              className="bg-orange-400 rounded-md py-2 mt-2"
            >
              <Text className="text-white text-center p-2">INICIAR SESION</Text>
            </TouchableHighlight>

            <View className="flex-1 justify-center items-center pt-10 pb-10">
              <GoogleSigninButton
                onPress={SignInWithGoogle}
                size={GoogleSigninButton.Size.Wide}
              />
            </View>

            <Text className="text-center text-xl pt-6 pb-2">O registrate:</Text>

            <Link
              href={"/(register)/register"}
              className="bg-orange-400 rounded-md py-2 mt-2"
            >
              <Text className="text-white text-center p-2">REGISTRARSE</Text>
            </Link>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
