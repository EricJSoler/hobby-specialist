import React from 'react'
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';

const RootNavigator = StackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Details: {
        screen: HomeScreen,
      }
    },
    {
        headerMode: 'none'
    }
  );
  
  export default RootNavigator;