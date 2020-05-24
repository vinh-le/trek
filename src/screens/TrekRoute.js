import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import TrekScreen from "./Trek";
import { StyleSheet} from "react-native";
import getDirections from "react-native-google-maps-directions";

const getDirection = async (lat, lon, d, parks, water, nature, drinks) => {
  try {
    let resp = await fetch(
      `https://trek-api.herokuapp.com/route/${lat}/${lon}/${d}/${parks}/${water}/${nature}/${drinks}`
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
  const [count, setCount] = useState(0);

  const { latitude } = route.params;
  const { longitude } = route.params;
  const { distance } = route.params;
  const { parks } = route.params;
  const { nature } = route.params;
  const { water } = route.params;
  const { drinks } = route.params;

  useEffect(() => {
    getDirection(latitude, longitude, distance, parks, water, nature, drinks)
      .then(coords => setCoords(coords))
      .catch(err => console.log("Something went wrong"));
  }, [count]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider = "google"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0121
        }}
      >
        {coords.length > 0 && <Polyline coordinates={coords} strokeColor="#000"
          fillColor="#3155A6"
          strokeWidth={5} />}
      </MapView>
      <View style={styles.myButton2}>
      <View style={{backgroundColor: '#87BC5E', paddingVertical: 4,
    paddingHorizontal: 10,}}>
      <Button
          title="Done Trekking"
          color="#FFFFFF"
          onPress={() => navigation.navigate('Map', {
            coordinates: coords
          })}
        />
      </View>
      </View>
      <View style={styles.myButton}>
        <View style={{backgroundColor: '#5eafbc', paddingVertical: 2,
    paddingHorizontal: 10,}}>
        <Button
          style = {{alignSelf: 'flex-start'}}
          title="Get New Route"
          color="#FFFFFF"
          onPress={() => setCount(count+1)}
        />
        </View>
        <View style={{backgroundColor: '#87BC5E', paddingVertical: 2,
    paddingHorizontal: 10,}}>
        <Button
          style = {{alignSelf: 'baseline'}}
          title="Start Trekking"
          color="#FFFFFF"
          onPress={() => handleGetDirections(latitude, longitude, distance)}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myButton:{
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius:25,
    position: 'absolute',
    alignSelf: 'center',
    top: 560,  // CHANGE THIS TO PERCENTAGE VALUE SOMEHOW
  },
  myButton2:{
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius:25,
    position: 'absolute',
    alignSelf: 'center',
    top: 50,  // CHANGE THIS TO PERCENTAGE VALUE SOMEHOW
  }
});

export default TrekRouteScreen;

