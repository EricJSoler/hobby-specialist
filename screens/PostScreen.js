import React from 'react';
import { Text } from 'react-native';
import { Container, Header, Footer, Content, Left, Body, Title, Right, Button, Icon } from "native-base";
import Section from '../Components/Section'
import PostSummary from '../Components/PostSummary'
import { generateDefaultPostSummary, generateDefaultSection } from '../utils/defaultObjGenerator';

const CLAZZ_NAME = '[PostScreen]';

  // Database
function getPost(postLookupId) {
    return {
      postLookupId: 'text2',
      sectionLookupIdList: ['text1', 'text2', 'text3', 'text4']
    }
}

function getSection(sectionLookupId) {
    return generateDefaultSection();
}


export default class PostScreen extends React.Component {

  constructor(props) {
    super(props);

    stateToValidate = {
      postLookupId: this.props.navigation.state.params.postLookupId,
      postSummary: this.props.navigation.state.params.postSummary
    };

    var defaultObjectsUsed = [];

    if(!stateToValidate.postSummary)
    {
      console.log(CLAZZ_NAME, 'Unspecified navigation.state.paramspostSummary ');
      stateToValidate.postSummary = generateDefaultPostSummary();
      defaultObjectsUsed.push({ key: 'stateToValidate.postSummary', value: stateToValidate.postSummary});
    }

    if(defaultObjectsUsed.length > 0)
    {
      console.warn(CLAZZ_NAME, 'Default objects used ', defaultObjectsUsed);
    }

    this.state = stateToValidate;
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.navigateBack()}>
                <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>PostScreen</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
          <PostSummary postSummary={this.state.postSummary} />
          {this.renderListOfSections(this.state.postLookupId)}
        </Content>
        <Footer>
          <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
        </Footer>
      </Container>
    );
  }

  renderListOfSections() {
    return this.getListOfSections().map((section, index) => {
      return (
        (
          <Section key={index} section={section} />
        )
      );
    }, this);
  }

  getListOfSections(postLookupId) {
    var post = getPost(postLookupId);
    var sectionIds = post.sectionLookupIdList;
    var sections = [];
    sectionIds.forEach(function(sectionLookupId) {
        sections.push(getSection(sectionLookupId));
    });
    return sections;
  }

    // Navigation
    navigateBack()
    {
      console.log(CLAZZ_NAME, 'Navigating back');
      this.props.navigation.goBack()
    }
  
}
