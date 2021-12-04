import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Button, StyleSheet, AppState} from 'react-native';

// @ts-ignore
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import BackgroudService from './BackgroundService';

import DetectCall from './DetectCall';
export const handleCall = () =>
  RNImmediatePhoneCall.immediatePhoneCall('60261204');

const App = () => {
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
      <Button onPress={handleCall} title="Call gate" />
      <DetectCall />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
