import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Header, Footer, Content, Left, Body, Title, Right, Button, Icon, Card, CardItem} from "native-base";
import { getAllPosts } from '../utils/pull';
import PostSummaryComplex  from '../Components/PostSummaryComplex';
import uuid from 'uuid/v4';
import { writeSection, writePost } from '../utils/write';

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
        return { ready: true, publishedPosts: Object.values(posts) };
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
                <PostSummaryComplex key={index} postSummary={publishedPost.postSummary} onEditPressCallback={() => this.navigateToPostEditor(this.createComplexPostFromPost(publishedPost), true)}   onPublishPressCallback={console.log()} />
              )
          );
      });
    }
  }

  renderComplexPostsPreview(complexPosts) { 
    return complexPosts.map((complexPost, index) => {
      return (
        (
          <PostSummaryComplex key={index} postSummary={complexPost.post.postSummary} onEditPressCallback={() => this.navigateToPostEditor(complexPost)}   onPublishPressCallback={() => this.publishComplexPost(complexPost)}  />
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

  // TODO:
  publishComplexPost(complexPost)
  {

    var post = complexPost.post;

    if(!post.sectionLookupIdList)
    {
      post.sectionLookupIdList = []
    }

    complexPost.sections.forEach(function(section) {
      if(section.sectionLookupId)
      {
        // Upsert over section
        writeSection(section, section.sectionLookupId);
      }
      else
      {
        // Insert new section and saveId
        var sectionId = uuid();
        var sectionWithUUID = section;
        sectionWithUUID.sectionLookupId = sectionId;
        writeSection(sectionWithUUID, sectionId); 
        post.sectionLookupIdList.push(sectionId);
      }
    });

    if(!post.postLookupId)
    {
      post.postLookupId = uuid();
    }

    console.log("POST", post, "\n", "SECTIONLIST", post.sectionLookupIdList);
    writePost(post, post.postLookupId);
    this.removeFromComplexPosts(complexPost);
  }

  removeFromComplexPosts(complexPost)
  {
     var tempComplexPosts = this.state.complexPosts;
     tempComplexPosts.splice(complexPost.index, 1);

     tempComplexPosts.forEach(function(val, index){
       val.index = index;
     });

     this.setState((previousState) => {
       return {complexPosts: tempComplexPosts};
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
