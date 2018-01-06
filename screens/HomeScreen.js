import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostSummary from '../Components/PostSummary'
import { signOut } from '../utils/auth';
import { getAllPosts } from '../utils/pull';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button } from "native-base";

export default class HomeScreen extends React.Component {

  navigateToPostScreen(post)
  {
    this.props.navigation.navigate("Post", {post: post});
  }

  navigateToAuthoringScreen()
  {
    this.props.navigation.navigate("Authoring");
  }

  constructor() {
    super();
    this.state = {
      ready: false,
      posts: []
    }
  }

  componentWillMount() {
      getAllPosts().then(function(posts) {
        this.setState(previousState => {
          return { ready: true, posts: posts };
        });
      }.bind(this));
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
              <Title>Home</Title>
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
            <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
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
              <Title>Home</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content padder>
            {this.renderAuthoringMode()}
            {this.renderListOfPosts(this.state.posts)}
          </Content>
          <Footer>
            <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
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
  renderListOfPosts(listOfPosts) { //TODO: this list of post summaries is using incorrect object schema
    return listOfPosts.map((post, index) => {
      return (
        (
          <PostSummary key={index} postSummary={post.postSummary} onPressCallback={() => this.navigateToPostScreen(post)} />
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