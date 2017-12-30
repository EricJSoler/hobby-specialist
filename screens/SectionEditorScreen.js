import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import * as SectionContentConstants from '../config/constants/SectionContentConstants';

export default class SectionEditorScreen extends React.Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
          headerText: '',
          footerText: '',
          imageUrl: '',
          bodyText: '',
          modifyingExisting: this.props.navigation.state.params.modifyingExisting
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
      if(this.props.navigation.state.params.complexSection.index === -1)
      {
        return;
      }
      else
      {
        this.setState(previousState => {
          return { 
            headerText:  this.props.navigation.state.params.complexSection.section.header,
            footerText: this.props.navigation.state.params.complexSection.section.footer
          };
        });

        switch (this.props.navigation.state.params.complexSection.content.type)
        {
          case SectionContentConstants.IMAGE_AND_TEXT: this.setState(previousState => {
            return { 
              imageUrl: this.props.navigation.state.params.complexSection.content.image,
              bodyText: this.props.navigation.state.params.complexSection.content.text
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
          <Button onPress={() => this.saveSection()}>
            <Text>Done adding section</Text>
          </Button>
        </Content>
        <Footer>
            <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
        </Footer>
      </Container>
    );
  }

  saveSection()
  {
    this.props.navigation.state.params.complexSection.content = this.createSectionContentJSON();
    this.props.navigation.state.params.complexSection.section= this.createSectionJSON(this.props.navigation.state.params.complexSection.content.contentLookupId);
    this.props.navigation.state.params.updateComplexSectionCallback(this.props.navigation.state.params.complexSection);
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