import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
// @ts-ignore
import BG from '../images/homeBG.png';

const Info = () => {
  return (
    <ImageBackground style={styles.backgroundImage} source={BG}>
      <View>
        <Text>Informacja</Text>
        <Text>SUPER WAŻNE</Text>
        <Text>
          Po zmianie w ustawieniach trzeba wyłączyć i włączyć ReCall inaczej
          aplikacje nie odświeży sobie tego
        </Text>
      </View>
    </ImageBackground>
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
export default Info;
