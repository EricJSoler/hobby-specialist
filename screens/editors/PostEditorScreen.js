import React from 'react';
import { Text } from 'react-native';
import { Container, Header, Footer, Content, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import SectionSummaryPreviewEdit  from '../../Components/SectionSummaryPreviewEdit';

// TODO: Allow for editing of pre-existing posts
// TODO: Add publishing to database
export default class PostEditorScreen extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            complexSections: [],
            titleText: '',
            thumbNailUrl: '',
            summaryText: ''
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
            <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
        </Footer>
      </Container>
    );
  }

  // Rendering
  renderSectionsPreview()
  {
    return this.state.complexSections.map((complexSection, index) => {
        return (
            (
                <SectionSummaryPreviewEdit key={index} section={complexSection.section} editExistingSectionCallback={() => this.editExistingSectionCallback(complexSection)}/>
            )
        );
    });
  }

  // Navigation
  navigateToSectionEditor(complexSection)
  {
      if (!complexSection)
      {
          complexSection = this.createEmptyComplexSection();
      }

      this.props.navigation.navigate("SectionEditor", {complexSection: complexSection, updateComplexSectionCallback: this.updateComplexSectionCallback.bind(this)});
  }

  // Callbacks invoked from other components
  editExistingSectionCallback(complexSection)
  {
    if(!complexSection)
    {
        console.error('Complex section null');
    }

    if(!complexSection.section)
    {
        console.warn( 'Section passed to edit existing section callback should not be undefined');
    }

    if(!complexSection.section.content)
    {
        console.warn( 'Content passed to edit existing section callback should not be undefined');
    }

    this.navigateToSectionEditor(complexSection); // this.props.navigation.navigate("SectionEditor", {saveSectionCallback: this.sectionUpdation.bind(this, complexSection), existingSection: section, existingContent: content});
  }

  updateComplexSectionCallback(complexSection)
  {
      tempSections = this.state.complexSections;

      if(complexSection.index === -1)
      {
          complexSection.index = tempSections.length;
          tempSections.push(complexSection);
      }
      else
      {
          tempSections[complexSection.index] = complexSection;
      }

      this.setState(previousState => {
          return { complexSections: tempSections };
      });
  }

  // Utilities
  createEmptyComplexSection()
  {
      return {
          section: {
              content: {
                  
              }                
          },
          index : -1
      }
  }
  
} 
