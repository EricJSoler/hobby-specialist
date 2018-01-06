import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator'
import { writePostSummary, writePost, writeSection } from './utils/write';
import uuid from 'uuid/v4';

export default class App extends React.Component {
  constructor() {
    super();
    var m = uuid();
    var section = {
      sectionLookupId: m,
      header: 'poop', // V2 may get componatized
      footer: 'beans', // V2 may get componatized
        content: {
          image: 'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png',
          text: 'eric sucks',
          type: 'ImageAndTextNoVideo' //x number of properties dependent upon hardcoded named type	
        }
      };
    var t = uuid();
    var post = {
      postLookupId: t,
      sectionLookupIdList: [m], //list of uuid strings, maintains ordering
      postSummary: {
        title: 'goodbye',
        content: {
          image: 'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png',
          text: 'eric sucks',
        }
      },
      authorLookupId: 'poop'
    }
    writePost(post, t);
    writeSection(section, m);
  }

  render() {
    return (
      <Navigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
