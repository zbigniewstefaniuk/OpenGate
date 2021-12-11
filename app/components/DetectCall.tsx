//Import React
import React, {useState} from 'react';

//Import required component
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import KeepAwake from 'react-native-keep-awake';

//Import Call Detector
import CallDetectorManager from 'react-native-call-detection';
import Button from './common/Button';
import {useAppContext} from '../context/AppContext';

const handleCall = (number: string) =>
  RNImmediatePhoneCall.immediatePhoneCall(number);

// TODO FIXME user after chainging settings have to restart facility

const DetectCall = () => {
  const {
    redirectPhoneNumber,
    isReCallAfterMissedCall,
    isReCallAfterAnsweredCall,
  } = useAppContext();

  //to keep callDetector reference
  let callDetector: any;

  const [callStates, setCallStates] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [flatListItems, setFlatListItems] = useState([]);

  const startStopListener = () => {
    if (!isStart) {
      console.log('Stop');
      callDetector && callDetector.dispose();
    } else {
      console.log('Start');
      callDetector = new CallDetectorManager(
        (event: string, number: string) => {
          console.log('event -> ', event + (number ? ' - ' + number : ''));
          let updatedCallStates = callStates;
          updatedCallStates.push(event + (number ? ' - ' + number : ''));
          setFlatListItems(updatedCallStates);
          setCallStates(updatedCallStates);

          // For iOS event will be either "Connected",
          // "Disconnected","Dialing" and "Incoming"

          // For Android event will be either "Offhook",
          // "Disconnected", "Incoming" or "Missed"
          // phoneNumber should store caller/called number

          if (event === 'Disconnected') {
            // Do something call got disconnected
          } else if (event === 'Connected') {
            // Do something call got connected
            // This clause will only be executed for iOS
          } else if (event === 'Incoming') {
            // Do something call got incoming
          } else if (event === 'Dialing') {
            // Do something call got dialing
            // This clause will only be executed for iOS
          } else if (event === 'Offhook') {
            //Device call state: Off-hook.
            // At least one call exists that is dialing,
            // active, or on hold,
            // and no calls are ringing or waiting.
            // This clause will only be executed for Android
            isReCallAfterAnsweredCall && handleCall(redirectPhoneNumber);
          } else if (event === 'Missed') {
            // Do something call got missed
            // This clause will only be executed for Android
            isReCallAfterMissedCall && handleCall(redirectPhoneNumber);
          }
        },
        true, // To detect incoming calls [ANDROID]
        () => {
          // If your permission got denied [ANDROID]
          // Only if you want to read incoming number
          // Default: console.error
          console.log('Permission Denied by User');
        },
        {
          title: 'Phone State Permission',
          message:
            'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
        },
      );
    }
    setIsStart(!isStart);
  };

  React.useEffect(() => {
    // this is for app to stay awake and dont put in sleep mode
    isStart ? KeepAwake.activate() : KeepAwake.deactivate();
  }, [isStart]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTextLarge}>Ostatnie połączenia</Text>
        </View>
        <FlatList
          style={{flex: 1}}
          data={flatListItems}
          renderItem={({item}) => (
            <View style={styles.phoneLog}>
              <Text style={styles.callLogs}>{JSON.stringify(item)}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          style={styles.button}
          onPress={startStopListener}
          title={isStart ? 'Wyłącz ReCall' : 'Włącz ReCall'}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCall(redirectPhoneNumber)}
          style={styles.fabStyle}>
          <Image
            source={require('../images/phone-call.png')}
            style={styles.fabImageStyle}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetectCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  headerTextLarge: {
    textAlign: 'center',
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#1E90FF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff8c21',
    padding: 10,
    justifyContent: 'center',
    height: 60,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  phoneLog: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginVertical: 5,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
  },
  callLogs: {
    padding: 16,
    fontSize: 16,
    color: 'dodgerblue',
  },
  fabStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 90,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 10,
  },
  fabImageStyle: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});
