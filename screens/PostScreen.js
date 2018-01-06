import React from 'react';
import { Text } from 'react-native';
import { Container, Header, Footer, Content, Left, Body, Title, Right, Button, Icon } from "native-base";
import Section from '../Components/Section'
import PostSummary from '../Components/PostSummary'
import update from 'immutability-helper';
import { getAllSections } from '../utils/pull';
import { listenForAddedSections, stopListeningForAddedSections, listenForChangedSections, stopListeningForChangedSections, listenForRemovedSections, stopListeningForRemovedSections } from '../utils/listen';
import { generateDefaultPost, generateDefaultPostSummary, generateDefaultSection } from '../utils/defaultObjGenerator';

const CLAZZ_NAME = '[PostScreen]';


export default class PostScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      post: this.props.navigation.state.params.post,
      sections: {}
    }
  }

  componentWillMount() {
    this.setDefaults();
    getAllSections(this.state.post).then(function(sections) {
      this.setState(previousState => {
        return { ready: true, sections: sections }
      });
    }.bind(this));
  }

  upsertToListOfSections(key, section) {
    var upsert = {};
    upsert[key] = {$set: section};
    this.setState(previousState => ({
      sections: update(this.state.sections, upsert)
    }));
  }

  removeFromListOfSections(key) {
    this.setState(previousState => ({
      sections: update(previousState.sections, {$unset: [key]})
    }));
  }

  componentDidMount() {
    listenForAddedSections(this.upsertToListOfSections.bind(this));
    listenForChangedSections(this.upsertToListOfSections.bind(this));
    listenForRemovedSections(this.removeFromListOfSections.bind(this));
  }

  componentWillUnmount() {
    stopListeningForAddedSections();
    stopListeningForChangedSections();
    stopListeningForRemovedSections();
  }

  setDefaults() {
    stateToValidate = {
      post: this.state.post
    };
    var defaultObjectsUsed = [];
    if(!stateToValidate.post)
    {
      console.log(CLAZZ_NAME, 'Unspecified navigation.state.params.post');
      stateToValidate.post = generateDefaultPost();
      defaultObjectsUsed.push({ key: 'stateToValidate.post', value: stateToValidate.post});
    }
    if (!stateToValidate.post.postSummary) {
      console.log(CLAZZ_NAME, 'Unspecified navigation.state.params.post.postSummary');
      stateToValidate.post.postSummary = generateDefaultPostSummary();
      defaultObjectsUsed.push({ key: 'stateToValidate.post.postSummary', value: stateToValidate.post.postSummary});
    }
    if(defaultObjectsUsed.length > 0)
    {
      console.warn(CLAZZ_NAME, 'Default objects used ', defaultObjectsUsed);
    }
    this.setState(previousState => {
      return stateToValidate;
    });
  }

  render() {
    if (!this.state.ready) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.navigateBack()}>
                  <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Posts</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content padder>
            <PostSummary postSummary={this.state.post.postSummary} />
            <Text>
              Loading Sections
            </Text>
          </Content>
          <Footer>
            <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
          </Footer>
        </Container>
      );
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.navigateBack()}>
                <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Posts</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
          <PostSummary postSummary={this.state.post.postSummary} />
          {this.renderListOfSections(this.state.sections)}
        </Content>
        <Footer>
          <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
        </Footer>
      </Container>
    );
  }

  renderListOfSections(sections) {
    return Object.values(sections).map((section, index) => {
      return (
        (
          <Section key={index} section={section} />
        )
      );
    }, this);
  }

    // Navigation
    navigateBack()
    {
      console.log(CLAZZ_NAME, 'Navigating back');
      this.props.navigation.goBack()
    }
  
}
