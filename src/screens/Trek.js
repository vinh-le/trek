import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';

function TrekScreen({ navigation }) {

  const [text, setText] = useState('');

  return (
    // <View style={{padding: 10}}>
    //   <TextInput
    //     style={{height: 40}}
    //     placeholder="Type here to translate!"
    //     onChangeText={text => setText(text)}
    //     defaultValue={text}
    //   />
    //   <Text style={{padding: 10, fontSize: 42}}>
    //     {text.split(' ').map((word) => word && '🍕').join(' ')}
    //   </Text>
    // </View>
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
          onPress={() => navigation.navigate('Map')}
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