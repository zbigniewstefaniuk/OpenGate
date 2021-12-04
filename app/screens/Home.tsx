import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  AppState,
  ImageBackground,
} from 'react-native';

// @ts-ignore
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import BackgroudService from '../BackgroundServices/BackgroundService';
import DetectCall from '../components/DetectCall';
import BG from '../images/homeBG.png';

export const handleCall = () =>
  RNImmediatePhoneCall.immediatePhoneCall('60261204');

const Home = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState<string>(
    appState.current,
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        BackgroudService.Stop();
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
    BackgroudService.Start();

    return () => {
      subscription.remove();
    };
  }, []);

  console.log(appStateVisible);

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground style={styles.backgroundImage} source={BG}>
        <DetectCall />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
});

export default Home;
