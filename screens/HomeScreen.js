import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right} from "native-base";

export default class HomeScreen extends React.Component {

  navigateToPostScreen(postLookupId, postSummary)
  {
    this.props.navigation.navigate("Post", {postLookupId: postLookupId, postSummary: postSummary});
  }

  navigateToAuthoringScreen()
  {
    this.props.navigation.navigate("Authoring");
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Hobby Specialist</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
          {this.renderAuthoringMode()}
          {this.renderListOfPostSummaries()}
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

  // returns list of json for the post summaries
  getListOfPostSummaries() {
    return [
      {
        postSummaryContent: {
          title: 'eric',
          image: 'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png',
          text: 'sucks'
        },
	      postSummaryLookupId: 'text',
	      postLookupId: 'text2'
      },
      {
        postSummaryContent: {
          title: 'eric',
          image: 'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png',
          text: 'sucks'
        },
	      postSummaryLookupId: 'text',
	      postLookupId: 'text2'
      },
      {
        postSummaryContent: {
          title: 'eric',
          image: 'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png',
          text: 'sucks'
        },
	      postSummaryLookupId: 'text',
	      postLookupId: 'text2'
      }
    ];
  }

  // invokes getListOfPostSummaries to get the json
  // and constructs/returns the post summary components
  renderListOfPostSummaries() {
    return this.getListOfPostSummaries().map((postSummary, index) => {
      return this.renderPostSummary(postSummary, index);
    }, this);
  }

  renderPostSummary(postSummary, index) {
    return (
      (
        <Card key={index} style={{flex: 1}} >
        <CardItem button onPress={() => this.navigateToPostScreen(postSummary.postLookupId, postSummary)}>
          <Left>
            <Thumbnail source={{uri: postSummary.postSummaryContent.image}} />  
            <Body>  
              <Text>{postSummary.postSummaryContent.title}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem button onPress={() => this.navigateToPostScreen(postSummary.postLookupId, postSummary)}>
          <Body>
            <Text>
            {postSummary.postSummaryContent.text}
            </Text>
          </Body>
        </CardItem>
      </Card>  
      )
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