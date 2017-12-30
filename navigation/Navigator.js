import React from 'react'
import { StackNavigator } from 'react-navigation';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import AuthoringScreen from '../screens/AuthoringScreen';
import PostEditorScreen from '../screens/PostEditorScreen';
import SectionEditorScreen from '../screens/SectionEditorScreen';

const RootNavigator = StackNavigator(
    {
      Auth: {
        screen: AuthScreen
      },
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