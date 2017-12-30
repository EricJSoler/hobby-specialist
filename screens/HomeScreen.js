import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostSummary from '../Components/PostSummary'
import { signOut } from '../utils/auth';
import { getPostSummaries, getPostSummaryContent } from '../utils/read';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button } from "native-base";

export default class HomeScreen extends React.Component {

  navigateToPostScreen(postLookupId, postSummary)
  {
    this.props.navigation.navigate("Post", {postLookupId: postLookupId, postSummaryContent: postSummary});
  }

  navigateToAuthoringScreen()
  {
    this.props.navigation.navigate("Authoring");
  }

  constructor() {
    super();
    this.state = {
      ready: false,
      postSummaryContents: []
    }
  }

  componentWillMount() {
    var postSummaryContents = [];
    getPostSummaries().then((postSummaries) => {
      var promises = [];
      postSummaries.forEach((postSummary) => {
        promises.push(getPostSummaryContent(postSummary.val().postSummaryContentLookupId));
      });
      Promise.all(promises).then((values) => {
        values.forEach((value) => {
          postSummaryContents.push(value.val());
        });
        this.setState(previousState => {
          return { ready: true, postSummaryContents: postSummaryContents };
        });
      });
    });
  }

  render() {
    if (!this.state.ready) {
      return (
        <Container>
          <Header>
            <Left>
              <Button onPress={this.onSignOutPress.bind(this)}>
                <Text>
                  Sign Out
                </Text>
              </Button>
            </Left>
            <Body>
              <Title>Home Llama</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content padder>
            <Text>
              Loading
            </Text>
          </Content>
          <Footer>
            <Left>
            </Left>
            <Body>
              <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
            </Body>
            <Right>
            </Right>
          </Footer>
        </Container>
      );
    }
    else {
      return (
        <Container>
          <Header>
            <Left>
              <Button onPress={this.onSignOutPress.bind(this)}>
                <Text>
                  Sign Out
                </Text>
              </Button>
            </Left>
            <Body>
              <Title>Hobby Specialist</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content padder>
            {this.renderAuthoringMode()}
            {this.renderListOfPostSummaries(this.state.postSummaryContents)}
          </Content>
          <Footer>
            <Left>
            </Left>
            <Body>
              <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
            </Body>
            <Right>
            </Right>
          </Footer>
        </Container>
      );
    }
  }

  onSignOutPress() {
    signOut()
      .then(() => {
          this.props.navigation.navigate('Auth');
      })
      .catch(() => {
          this.props.navigation.navigate('Home');
      });
  }

  renderAuthoringMode() {
    return (
      (
        <Card>
          <CardItem button onPress={() => this.navigateToAuthoringScreen()}>
            <Body>
              <Text>
                Authoring Mode
              </Text>
            </Body>
          </CardItem>
        </Card>
      )
    );
  }

  // invokes getListOfPostSummaries to get the json
  // and constructs/returns the post summary components
  renderListOfPostSummaries(listOfPostSummaryContents) { //TODO: this list of post summaries is using incorrect object schema
    return listOfPostSummaryContents.map((postSummary, index) => {
      return (
        (
          <PostSummary key={index} postSummary={postSummary} onPressCallback={() => this.navigateToPostScreen(postSummary.postLookupId, postSummary)} />
        )
      );
    }, this);
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