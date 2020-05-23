import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';

function TrekScreen({ route, navigation }) {

  const [text, setText] = useState('');
  const { latitude } = route.params;
  const { longitude } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.description}>What is your target distance?</Text>
      <Text/>
      <TextInput
        style={{height: 40, width: 110, fontSize: 18}}
        textAlign='center'
        placeholder="Eg. 5 (miles)"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text/>
      <View style={styles.myButton}>
        <Button
          title="Generate Trek"
          color="#FFFFFF"
          onPress={() => navigation.navigate('TrekRoute', {
            latitude: latitude,
            longitude: longitude,
            distance: text
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