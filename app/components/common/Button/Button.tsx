import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 35,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  buttonText: {
    color: '#1E90FF',
    paddingVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    right: 10,
  },
});

interface ButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({onPress, title, disabled, isLoading}: ButtonProps) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
    <View style={styles.button}>
      <Text
        style={[styles.buttonText, {color: disabled ? '#B4BDF9' : '#1E90FF'}]}>
        {title}
      </Text>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#B4BDF9" />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default Button;
