import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import Button from '../components/common/Button';
import {useAppContext} from '../context/AppContext';

// TODO add local storage for settings and selecting switch options to calls

const Settings = () => {
  const {setRedirectPhoneNumber, redirectPhoneNumber} = useAppContext();
  const [number, onChangeNumber] = useState<string | undefined>(
    redirectPhoneNumber,
  );

  const handleSubmit = () => {
    setRedirectPhoneNumber(number);
    onChangeNumber('');
  };

  console.log(number);
  console.log('redirectPhoneNumber', redirectPhoneNumber);
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

      <Button
        title="Potwierdz"
        onPress={handleSubmit}
        disabled={number?.length > 9 ? false : true}
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
