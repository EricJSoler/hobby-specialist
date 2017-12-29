import React from 'react'
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import AuthoringScreen from '../screens/AuthoringScreen';
import PostEditorScreen from '../screens/PostEditorScreen';
import SectionEditorScreen from '../screens/SectionEditorScreen';

const RootNavigator = StackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Post: {
        screen: PostScreen,
      },
      Authoring: {
        screen: AuthoringScreen
      },
      PostEditor: {
        screen: PostEditorScreen
      },
      SectionEditor: {
        screen: SectionEditorScreen
      }
    },
    {
        headerMode: 'none'
    }
  );
  
  export default RootNavigator;