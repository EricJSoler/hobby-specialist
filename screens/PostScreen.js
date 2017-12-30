import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon} from "native-base";
import Section from '../Components/Section'

export default class PostScreen extends React.Component {

  navigateToPostScreen(postLookupId)
  {
    this.props.navigation.navigate("Home");
  }

  constructor(props) {
    super(props);
    this.state = {
        postLookupId: this.props.navigation.state.params.postLookupId,
        postSummary: this.props.navigation.state.params.postSummary
    };
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
            <Title>post</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
          {this.renderPostSummary(this.state.postSummary, 0)}
          {this.renderListOfSections(this.state.postLookupId)}
        </Content>
        <Footer>
          <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
        </Footer>
      </Container>
    );
  }

  getListOfSections(postLookupId) {
    var post = this.getPost(postLookupId);
    var sectionIds = post.sectionLookupIdList;
    var sections = [];
    sectionIds.forEach(function(sectionLookupId) {
        sections.push(this.getSection(sectionLookupId));
    }, this);
    return sections;
  }

  getPost(postLookupId) {
      return {
        postLookupId: 'text2',
        sectionLookupIdList: ['text1', 'text2', 'text3', 'text4']
      }
  }

  getSection(sectionLookupId) {
      return {
        sectionLookupId: 'text1',
        header: 'hi',
        contentLookupId: 'text5',
        footer: 'bye'
      }
  }

  renderListOfSections(postLookupId) {
    return this.getListOfSections().map((section, index) => {
        return this.renderSection(section, index);
    }, this);
  }

  getSectionContent(contentLookupId) {
    return {
        contentLookupId: 'text5',
        type: 'ImageAndTextNoVideo',
        image: 'https://i.pinimg.com/originals/52/e1/59/52e1592132e0a069cdd5482a3f22f1cb.gif',
        text: 'Llamas are cool'
    };
  }

  renderSection(section, index) {
    sectionContent = this.getSectionContent(section.sectionLookupId);

    return (
        (
          <Section key={index} section={section} sectionContent={sectionContent} />
        )
    );
  }

  renderPostSummary(postSummary, index) {
    return (
      (
        <Card key={index} style={{flex: 1}} >
        <CardItem>
          <Left>
            <Thumbnail source={{uri: postSummary.postSummaryContent.image}} />  
            <Body>  
              <Text>{postSummary.postSummaryContent.title}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
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