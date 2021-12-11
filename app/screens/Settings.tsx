import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Button from '../components/common/Button';
import {useAppContext} from '../context/AppContext';
import homeBG from '../images/homeBG.png';

// TODO add local storage for settings and selecting switch options to calls

const Settings = () => {
  const {setRedirectPhoneNumber, redirectPhoneNumber} = useAppContext();
  const [number, onChangeNumber] = useState<string | undefined>(
    redirectPhoneNumber,
  );
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const handleSubmit = () => {
    setRedirectPhoneNumber(number);
    onChangeNumber('');
  };

  console.log(number);
  console.log('redirectPhoneNumber', redirectPhoneNumber);
  return (
    <ImageBackground style={styles.backgroundImage} source={homeBG}>
      <SafeAreaView>
        <Text style={styles.inputTitle}>
          Tutaj możesz zmienic numeer do kórgo aplikacja będzie dzwonić
        </Text>

        <TextInput
          style={[styles.input, isInputFocused && styles.inputFocused]}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Numer do Bramy"
          keyboardType="numeric"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />

        <Button
          title="Potwierdz"
          onPress={handleSubmit}
          disabled={number?.length > 9 ? false : true}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'transparent',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  inputFocused: {
    borderColor: 'dodgerblue',
    borderWidth: 1,
  },
  inputTitle: {
    marginHorizontal: 12,
  },
});

export default Settings;
