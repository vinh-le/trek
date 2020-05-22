import * as React from 'react';
import { Button, View, Text } from 'react-native';

function TrekScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Generate a new route"
        onPress={() => navigation.navigate('TrekRoute')}
        />
        <Button
        title="Start trekking"
        onPress={() => navigation.navigate('TrekRoute')}
        />
    </View>
  );
}

export default TrekScreen;