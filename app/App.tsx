import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import BackgroudService from './BackgroundService';

import DetectCall from './DetectCall';
export const handleCall = () =>
  RNImmediatePhoneCall.immediatePhoneCall('60261204');

const App = () => {
  BackgroudService.Start();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button onPress={handleCall} title="Call gate" />
      <DetectCall />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
