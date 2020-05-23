import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import TrekScreen from "./Trek";

const getDirections = async (lat, lon, d) => {
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

const TrekRouteScreen = () => {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    getDirections("33.081650", "-96.754750", "1")
      .then(coords => setCoords(coords))
      .catch(err => console.log("Something went wrong"));
  }, []);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        provider = "google"
        initialRegion={{
          latitude: 33.082050,
          longitude: -96.751740,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {coords.length > 0 && <Polyline coordinates={coords} strokeColor="#000"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={4} />}
      </MapView>
    </>
  );
};

export default TrekRouteScreen;

