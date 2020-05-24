import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'

function TrekScreen({ route, navigation }) {

  const [text, setText] = useState('');
  const [parks, setParks] = useState(false);
  const [water, setWater] = useState(false);
  const [nature, setNature] = useState(false);
  const [drinks, setDrinks] = useState(false);
  const { latitude } = route.params;
  const { longitude } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.description}>What is your target distance?</Text>
      <Text/>
      <TextInput
        style={{height: 40, width: 180, fontSize: 18, backgroundColor: '#FFFFFF'}}
        textAlign='center'
        placeholder="Eg. 5 (miles)"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text/>
      <Text/>
      <Text style={styles.description}>What would you like to see?</Text>
      <View style={{alignItems:'left'}}>
      <CheckBox
      title='Parks'
      checked={parks}
      containerStyle={{width:180}}
      textStyle={{fontWeight:'400'}}
      onPress={() =>
        setParks(!parks)
      }
      />
      <CheckBox
      title='Bodies of Water'
      checked={water}
      containerStyle={{width:180}}
      textStyle={{fontWeight:'400'}}
      onPress={() =>
        setWater(!water)
      }
      />
      <CheckBox
      title='Nature Preserves'
      checked={nature}
      containerStyle={{width:180}}
      textStyle={{fontWeight:'400'}}
      onPress={() =>
        setNature(!nature)
      }
      />
      <CheckBox
      title='Refreshments'
      checked={drinks}
      containerStyle={{width:180}}
      textStyle={{fontWeight:'400'}}
      onPress={() =>
        setDrinks(!drinks)
      }
      />
      </View>
      <Text/>
      <Text/>
      <View style={styles.myButton}>
        <Button
          title="Generate Trek"
          color="#FFFFFF"
          onPress={() => navigation.navigate('TrekRoute', {
            latitude: latitude,
            longitude: longitude,
            distance: text,
            parks: parks,
            nature: nature,
            drinks: drinks,
            water: water,
            coordinates: route.params.coordinates
          })}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 60,
    fontWeight: '500',
    letterSpacing: 2
  },
  description: {
    fontSize:22,
    textAlign: 'center'
  },
  myButton:{
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius:25,
    backgroundColor:'#87BC5E',
  }
});

export default TrekScreen;