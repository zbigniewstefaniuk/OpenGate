import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from '../components/common/Button';
import {useAppContext} from '../context/AppContext';
import homeBG from '../images/homeBG.png';

// TODO add local storage for settings and selecting switch options to calls

const Settings = ({navigation}) => {
  const {
    setRedirectPhoneNumber,
    redirectPhoneNumber,
    isReCallAfterMissedCall,
    setIsReCallAfterMissedCall,
    isReCallAfterAnsweredCall,
    setIsReCallAfterAnsweredCall,
  } = useAppContext();
  const [number, onChangeNumber] = useState<string | undefined>(
    redirectPhoneNumber,
  );
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [missedCallEnabled, setMissedCallEnabled] = useState<boolean>(
    isReCallAfterMissedCall,
  );
  const [answeredCallEnabled, setAnsweredCallEnabled] = useState<boolean>(
    isReCallAfterAnsweredCall,
  );

  const handleSubmit = () => {
    setRedirectPhoneNumber(number);
    navigation.navigate('Home');
  };

  useEffect(() => {
    // setting this value to global context and localstorage
    setIsReCallAfterAnsweredCall(answeredCallEnabled);
  }, [answeredCallEnabled]);

  useEffect(() => {
    // setting this value to global context and localstorage
    setIsReCallAfterMissedCall(missedCallEnabled);
  }, [missedCallEnabled]);

  console.log(number);
  console.log('redirectPhoneNumber', redirectPhoneNumber);
  return (
    <ImageBackground style={styles.backgroundImage} source={homeBG}>
      <SafeAreaView>
        <View style={styles.settingsPanel}>
          <Text style={styles.inputTitle}>
            Tutaj możesz zmienic numer do kórgo aplikacja będzie dzwonić
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
          <Text style={styles.switchContainerHeader}>
            Kiedy ma wykonywać połączenia? Zaznacz opcje
          </Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchTitle}>Po nieodebranym połączeniu</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={missedCallEnabled ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setMissedCallEnabled(previousState => !previousState)
              }
              value={missedCallEnabled}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchTitle}>Po zakoczeniu rozmowy</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={answeredCallEnabled ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setAnsweredCallEnabled(previousState => !previousState)
              }
              value={answeredCallEnabled}
            />
          </View>
        </View>

        <Button
          title="Potwierdz"
          onPress={handleSubmit}
          disabled={number?.length < 9}
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

  settingsPanel: {
    margin: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'transparent',
    paddingVertical: 26,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },

  // Input
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
    fontWeight: 'bold',
    fontSize: 15,
  },

  // Switches

  switchContainerHeader: {
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },

  switchTitle: {
    fontWeight: '600',
  },
});

export default Settings;
