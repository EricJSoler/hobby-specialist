import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Header, Footer, Content, Left, Body, Title, Right, Button, Icon, Card, CardItem} from "native-base";
import { getAllPosts } from '../utils/pull';
import PostSummary  from '../Components/PostSummary';

export default class AuthoringScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      ready: false,
      publishedPosts: [],
      complexPosts: []
    }
  }

  componentWillMount() {
    getAllPosts().then(function(posts) {
      this.setState(previousState => {
        return { ready: true, publishedPosts: posts };
      });
    }.bind(this));
}

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Authoring</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
            <Button style={{marginBottom: 10}} light block onPress={() => this.navigateToPostEditor()}>
                <Text>
                    Add Post 
                </Text> 
            </Button>
            {this.renderComplexPostsPreview(this.state.complexPosts)}
            <Card>
              <CardItem>
                <Body>
                  <Text>
                    Published Posts:
                  </Text>
                </Body>
              </CardItem>
            </Card>
            {this.renderPublishedPostsPreview(this.state.publishedPosts)}
        </Content>
        <Footer>
          <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
        </Footer>
      </Container>
    );
  }

  // Rendering
  renderPublishedPostsPreview(publishedPosts)
  {
    if(this.state.ready)
    {
      return publishedPosts.map((publishedPost, index) => {
          return (
              (
                <PostSummary key={index} postSummary={publishedPost.postSummary} onPressCallback={() => this.navigateToPostEditor(this.createComplexPostFromPost(publishedPost), true)} />
              )
          );
      });
    }
  }

  renderComplexPostsPreview(complexPosts) { 
    return complexPosts.map((complexPost, index) => {
      return (
        (
          <PostSummary key={index} postSummary={complexPost.post.postSummary} onPressCallback={() => this.navigateToPostEditor(complexPost)} />
        )
      );
    }, this);
  }

  // Navigation
  navigateToPostEditor(complexPost, isPublishedPost)
  {
      var editing = true;
      if (!complexPost)
      {
          complexPost = this.createEmptyComplexPost();
          editing = false;
      }

      this.props.navigation.navigate("PostEditor", {complexPost: complexPost, updateComplexPostCallback: this.updateComplexPostCallback.bind(this), shouldInitializeFromComplexPost: editing, isPublishedPost: isPublishedPost});
  }

  // Callbacks invoked from other components
  editExistingPostCallback(complexPost)
  {
    if(!complexPost)
    {
        console.error('Complex post null');
    }

    if(!!complexPost.post)
    {
        console.warn( 'Post passed to edit existing post callback should not be undefined');
    }

    if(!complexSection.post.postSummary)
    {
        console.warn( 'postSummary passed to edit existing post callback should not be undefined');
    }

    this.navigateToPostEditor(complexPost); 
  }

  updateComplexPostCallback(complexPost)
  {
      tempPosts = this.state.complexPosts;

      if(complexPost.index === -1)
      {
        complexPost.index = tempPosts.length;
        tempPosts.push(complexPost);
      }
      else
      {
        tempPosts[complexPost.index] = complexPost;
      }

      this.setState(previousState => {
          return { complexPosts: tempPosts };
      });
  }

  // Utilities
  createEmptyComplexPost()
  {
      return {
        post: {
          postSummary: {
          },
        },
        sections: [],
        index: -1
      }
  }

  createComplexPostFromPost(post)
  {
    var emptyComplexPost = this.createEmptyComplexPost();
    emptyComplexPost.post = post;

    return emptyComplexPost;
  }

}
