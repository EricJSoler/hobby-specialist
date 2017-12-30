import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import * as ContentConstants from '../config/constants/Content';

export default class SectionEditorScreen extends React.Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
          addSectionCallback: this.props.navigation.state.params.addSectionCallback,
          headerText: '',
          footerText: '',
          imageUrl: '',
          bodyText: ''
        };
    }

    // componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    componentDidMount()
    {
      this.tryConfigureForEditingExistingSection();
    }

    // Will check appropriate params specified through navigator and overwrite existing state to match
    // if we are editing an existing section
    tryConfigureForEditingExistingSection()
    {

      if (this.props.navigation.state.params.existingSection && !this.props.navigation.state.params.existingContent)
      {
        console.warn('an existing section is being editing but has no existing content');
      }

      if (this.props.navigation.state.params.existingSection)
      {
        this.setState(previousState => {
          return { 
            headerText:  this.props.navigation.state.params.existingSection.header,
            footerText: this.props.navigation.state.params.existingSection.footer
          };
        });
      }

      if (this.props.navigation.state.params.existingContent)
      {
        switch (this.props.navigation.state.params.existingContent.type)
        {
          case ContentConstants.IMAGE_AND_TEXT: this.setState(previousState => {
            return { 
              imageUrl:  this.props.navigation.state.params.existingContent.image,
              bodyText: this.props.navigation.state.params.existingContent.text
            };
          });
        }
      }
    }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Text>Discard</Text>
            </Button>
          </Left>
          <Body>
            <Title>Section Editor</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Header</Label>
              <Input  onChangeText={(text) => this.setState({headerText: text})}
                      value={this.state.headerText}/>
            </Item>
            <Item stackedLabel>
              <Label>Image URL</Label>
              <Input  onChangeText={(text) => this.setState({imageUrl: text})}
                      value={this.state.imageUrl}/>
            </Item>
            <Item stackedLabel>
              <Label>Body</Label>
              <Input  onChangeText={(text) => this.setState({bodyText: text})}
                      value={this.state.bodyText}/>
            </Item>
            <Item stackedLabel>
              <Label>Footer</Label>
                <Input  onChangeText={(text) => this.setState({footerText: text})}
                        value={this.state.footerText}/>
            </Item>
          </Form>
          <Button onPress={() => this.doneAddingSectionClick()}>
            <Text>Done adding section</Text>
          </Button>
          {this.tryPreview()}
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

  // TODO: add child component
  tryPreview()
  {
    return this.renderSectionAndContentTrash(this.createSectionJSON('doesntmatter'), 0, this.createSectionContentJSON());  
  }

  renderSectionAndContentTrash(section, index, content) {
    return (
        (
            <Card key={index} style={{flex: 1}} >
                <CardItem>
                    <Body>  
                        <Text>{section.header}</Text>
                    </Body>
                </CardItem>
                {this.renderContent(content)}
                <CardItem>
                    <Body>
                        <Text>
                            {section.footer}
                        </Text>
                    </Body>
                </CardItem>
            </Card> 
        )
    );
  }

  renderContent(content) {
    switch(content.type) {
        case ContentConstants.IMAGE_AND_TEXT:
            return (
                (
                <CardItem>
                    <Body>
                        <View style={{flex: 1, width: 200, height: 200, margin: 5}}>         
                            <Image 
                            style={{flex:1, height: undefined, width: undefined, resizeMode: 'contain'}}
                            source={{uri: content.image}}
                            />
                        </View>
                        <Text>
                            {content.text}
                        </Text>
                    </Body>
                </CardItem>
                )
            );
        default:
            return;
    }
  }


  doneAddingSectionClick()
  {
    var content = this.createSectionContentJSON(); 
    this.state.addSectionCallback(this.createSectionJSON(content.contentLookupId), content);
    this.props.navigation.goBack();
  }

  createSectionJSON(contentLookupId)
  {
    return {
      sectionLookupId: 'SectionLookUpID_01',
	    header: this.state.headerText,
	    content: contentLookupId,
	    footer: this.state.footerText
    }
  }

  createSectionContentJSON()
  {
    // Needs logic based on fields filled from ui
    computedContentType = 'ImageAndTextNoVideo';
    return {
      contentLookupId: '',
      type: computedContentType, //x number of properties dependent upon hardcoded named type      
      image: this.state.imageUrl,
      text: this.state.bodyText
    }
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