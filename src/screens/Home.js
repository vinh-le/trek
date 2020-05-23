import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Trek</Text>
        <Text/>
        <Text style={styles.description}>Explore your community through personalized routes.</Text>
        <Text/>
        <View style={styles.myButton}>
        <Button
          title="Get Started"
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

export default HomeScreen;