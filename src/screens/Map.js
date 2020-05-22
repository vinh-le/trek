import * as React from 'react';
import { Button, View, Text } from 'react-native';
import MapView, {Polyline} from "react-native-maps";
import { StyleSheet} from "react-native";

function MapScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          flex: 1
        }}
        provider = "google"
        initialRegion={{
          latitude: 33.082050,
          longitude: -96.751740,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0121
        }}>
      <Polyline
          coordinates={[
            { latitude: 33.082050, longitude: -96.751740},
            { latitude: 33.083500, longitude: -96.767740}
          ]}
          strokeColor="#000"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={1}/>
        </MapView>
      <View style={styles.myButton}>
        <Button
          title="Start New Trek"
          color="#FFFFFF"
          onPress={() => navigation.navigate('Trek')}
        />
      </View>
    </View>
    /*
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hi Screen</Text>
      <Button
        title="Start New Trek"
        onPress={() => navigation.navigate('Trek')}
        />
    </View> */
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