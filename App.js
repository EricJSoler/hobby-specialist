import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator'
import { writePostSummaryContent, writePostSummary } from './utils/write';
import { getPosts, getPostSummaryContent, getPostSummaries } from './utils/read';
import uuid from 'uuid/v4';

export default class App extends React.Component {
  constructor() {
    super();
    var postSummaryContentLookupUUID = uuid();
    var postSummaryContent = {
      title: 'hello',
      image: 'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png',
      text: 'eric sucks',
      type: 'ImageAndTextNoVideo'
    }
    writePostSummaryContent(postSummaryContent, postSummaryContentLookupUUID);
    var postSummaryLookupUUID = uuid();
    var postSummary = {
      postSummaryContentLookupId: postSummaryContentLookupUUID
    }
    writePostSummary(postSummary, postSummaryLookupUUID);
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
