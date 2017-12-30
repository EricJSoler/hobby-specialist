import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import SectionSummaryPreviewEdit  from '../Components/SectionSummaryPreviewEdit';

export default class PostEditorScreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            complexSections : [],
            titleText: '',
            thumbNailUrl: '',
            summaryText: ''
        }
    }

    navigateToSectionEditor()
    {
        this.props.navigation.navigate("SectionEditor", {addSectionCallback: this.addSectionCallback.bind(this)});
    }

    addSectionCallback(section, content, modifiedIndex) {
        if(modifiedIndex)
        {

        }
        else
        {        
            tempSections = this.state.complexSections;
            tempSections.push({
                section: section,
                content: content}
            );
            this.setState(previousState => {
                return { complexSections: tempSections };
            });
        }
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
            <Title>Post Editor</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
            <Form>
                <Item stackedLabel>
                <Label>Title</Label>
                <Input  onChangeText={(text) => this.setState({titleText: text})}
                        value={this.state.titleText}/>
                </Item>
                <Item stackedLabel>
                <Label>Thumbnail Image URL</Label>
                <Input  onChangeText={(text) => this.setState({thumbNailUrl: text})}
                        value={this.state.thumbNailUrl}/>
                </Item>
                <Item stackedLabel>
                <Label>Summary</Label>
                <Input  onChangeText={(text) => this.setState({summaryText: text})}
                        value={this.state.summaryText}/>
                </Item>
            </Form>
            {this.renderSectionsPreview()}
            <Button onPress={() => this.navigateToSectionEditor()}>
                <Text>
                    Add Section
                </Text> 
            </Button>
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

  renderSectionsPreview()
  {
    return this.state.complexSections.map((complexSection, index) => {
        return (
            (
                <SectionSummaryPreviewEdit key={index} content={complexSection.content} section={complexSection.section} editExistingSectionCallback={this.editExistingSectionCallback.bind(this)}/>
            )
        );
    });
  }

  editExistingSectionCallback(section, content)
  {
    if(!section)
    {
        console.log( 'section passed to edit existing section callback should not be undefined');
    }

    if(!content)
    {
        console.log( 'content passed to edit existing section callback should not be undefined');
    }

    this.props.navigation.navigate("SectionEditor", {addSectionCallback: this.addSectionCallback.bind(this), existingSection: section, existingContent: content});
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