import { Button, View, Text } from 'react-native';
import MapView from "react-native-maps";
import Polyline from "react-native-maps";
import { StyleSheet} from "react-native";
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import getDirections from "react-native-google-maps-directions";


function MapScreen({ navigation }) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  var lat = 0, lon = 0;
  if (location) {
    lon = location["coords"]["longitude"];
    lat = location["coords"]["latitude"];
  }
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          flex: 1
        }}
        provider = "google"
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0121
        }}>
      </MapView>
      <View style={styles.myButton}>
        <Button
          title="Start New Trek"
          color="#FFFFFF"
          onPress={() => navigation.navigate('Trek', {
            latitude: lat,
            longitude: lon
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myButton:{
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius:25,
    backgroundColor:'#87BC5E',
    position: 'absolute',
    alignSelf: 'center',
    top: 560,  // CHANGE THIS TO PERCENTAGE VALUE SOMEHOW
  }
});

export default MapScreen;