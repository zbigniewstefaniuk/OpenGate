import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';

const Settings = () => {
  const [number, onChangeNumber] = useState<number>();
  console.log(number);
  return (
    <SafeAreaView>
      <Text>Tutaj możesz zmienic numeer do kórgo aplikacja będzie dzwonić</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Numer do Bramy"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Settings;
