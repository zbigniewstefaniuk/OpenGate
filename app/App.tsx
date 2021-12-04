import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image} from 'react-native';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Info from './screens/Info';
import AppProvider from './context/AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => (
  <AppProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            switch (route.name) {
              case 'Home':
                return (
                  <Image
                    source={require('./images/navigation/home.png')}
                    style={[
                      {width: 24, height: 24},
                      focused && {tintColor: 'dodgerblue'},
                    ]}
                  />
                );
              case 'Info':
                return (
                  <Image
                    source={require('./images/navigation/info.png')}
                    style={[
                      {width: 24, height: 24},
                      focused && {tintColor: 'dodgerblue'},
                    ]}
                  />
                );
              case 'Ustawienia':
                return (
                  <Image
                    source={require('./images/navigation/setting.png')}
                    style={[
                      {width: 24, height: 24},
                      focused && {tintColor: 'dodgerblue'},
                    ]}
                  />
                );
              default:
                return null;
            }
          },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Info"
          component={Info}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Ustawienia"
          component={Settings}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </AppProvider>
);

export default App;
