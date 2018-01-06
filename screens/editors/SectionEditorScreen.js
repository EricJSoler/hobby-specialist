import React from 'react';
import { Text } from 'react-native';
import { Container, Header, Footer, Content, Left, Body, Title, Right, Button, Form, Item, Input, Label} from "native-base";
import * as SectionContentConstants from '../../config/constants/SectionContentConstants';

// TODO: Add preview
export default class SectionEditorScreen extends React.Component {

    constructor(props)
    {
        super(props);
        // TODO: validation
        this.state = {
          headerText: '',
          footerText: '',
          imageUrl: '',
          bodyText: '',
        };
    }

    // componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     componentDidMount()
     {
        // Will check appropriate params specified through navigator and overwrite existing state to match
        // if we are editing an existing section
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
            
            switch (this.props.navigation.state.params.complexSection.section.content.type)
            {
              case SectionContentConstants.IMAGE_TEXT: this.setState(previousState => {
                return { 
                  imageUrl: this.props.navigation.state.params.complexSection.section.content.image,
                  bodyText: this.props.navigation.state.params.complexSection.section.content.text
                };
              });
            }
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
            <Text>Save Section</Text>
          </Button>
        </Content>
        <Footer>
            <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
        </Footer>
      </Container>
    );
  }

  // invokes updateComplexSectionCallback effectively saving the section created
  // navigates back to previous screen should be PostEditor
  saveSection()
  {
    this.props.navigation.state.params.complexSection.section = this.createSectionJSON();
    console.log(this.props.navigation.state.params.complexSection);
    this.props.navigation.state.params.updateComplexSectionCallback(this.props.navigation.state.params.complexSection);
    this.props.navigation.goBack();
  }

  createSectionJSON()
  {
    return {
	    header: this.state.headerText,
	    content: this.createSectionContentJSON(),
	    footer: this.state.footerText
    }
  }

  createSectionContentJSON()
  {
    // TODO: Needs logic based on fields filled from ui
    computedContentType = SectionContentConstants.IMAGE_TEXT;
    return {
      type: computedContentType, 
      image: this.state.imageUrl,
      text: this.state.bodyText
    }
  }
  
}
