import { Button, View, Text } from 'react-native';
import MapView, { Polyline } from "react-native-maps";
import { StyleSheet} from "react-native";
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import getDirections from "react-native-google-maps-directions";


function MapScreen({ navigation, route }) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);

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

  useEffect(() => {
    if (route.params?.coordinates) {
      const newCoords = [...coords, ...route.params.coordinates];
      setCoords(newCoords);
    }
  }, [route.params?.coordinates]);

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
          {coords.length > 0 && <Polyline coordinates={coords} strokeColor="#000"
          fillColor="#3155A6"
          strokeWidth={5} />}
      </MapView>
      <View style={styles.container}>
        <Text style={styles.description}>My Completed Routes</Text>
      </View>
      <View style={styles.myButton}>
        <Button
          title="Start New Trek"
          color="#FFFFFF"
          onPress={() => navigation.navigate('Trek', {
            latitude: lat,
            longitude: lon,
            coordinates: coords
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
  },
  description: {
    fontSize:22,
    textAlign: 'center'
  },
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor:'#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    top: 50,  // CHANGE THIS TO PERCENTAGE VALUE SOMEHOW
  }
});

export default MapScreen;