import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
export default function map() {
  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const origin = { latitude: 8.6502508, longitude: -70.2466383 };
  const destination = { latitude: 8.7594924, longitude: -70.4126976 };
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

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey=""
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 1000,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
