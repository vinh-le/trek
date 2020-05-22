import * as React from 'react';
import { Button, View, Text } from 'react-native';

function TrekScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>What is your target distance?</Text>
      <Button
        title="Enter"
        onPress={() => navigation.navigate('TrekRoute')}
        />
    </View>
  );
}

export default TrekScreen;