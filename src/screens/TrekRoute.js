import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import TrekScreen from "./Trek";
import { StyleSheet} from "react-native";
import getDirections from "react-native-google-maps-directions";

const getDirection = async (lat, lon, d) => {
  try {
    let resp = await fetch(
      `https://trek-api.herokuapp.com/route/${lat}/${lon}/${d}`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};

const handleGetDirections = async (lat, lon, d) => {
  new_lat = (lat) + (d) / 69
  const data = {
    source: {
      latitude: lat,
      longitude: lon
    },
    destination: {
      latitude: lat,
      longitude: lon
    },
    params: [
      {
        key: "travelmode",
        value: "walking"
      },
      {
        key: "dir_action",
        value: "navigate"
      }
    ],
    waypoints: [
      {
        latitude: new_lat,
        longitude: lon
      }
    ]
  }

  getDirections(data)
}

const TrekRouteScreen = ({ route, navigation }) => {
  const [coords, setCoords] = useState([]);

  const { latitude } = route.params;
  const { longitude } = route.params;
  const { distance } = route.params;

  useEffect(() => {
    getDirection(latitude, longitude, distance)
      .then(coords => setCoords(coords))
      .catch(err => console.log("Something went wrong"));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider = "google"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {coords.length > 0 && <Polyline coordinates={coords} strokeColor="#000"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={4} />}
      </MapView>
      <View style={styles.myButton}>
        <Button
          title="Start Trekking"
          color="#FFFFFF"
          onPress={() => handleGetDirections(latitude, longitude, distance)}
        />
      </View>
    </View>
  );
};

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

export default TrekRouteScreen;

