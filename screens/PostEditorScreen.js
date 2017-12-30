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

    navigateToSectionEditor(complexSection)
    {
        if (!complexSection)
        {
            complexSection = this.createEmptyComplexSection();
        }

        this.props.navigation.navigate("SectionEditor", {complexSection: complexSection, updateComplexSectionCallback: this.updateComplexSectionCallback.bind(this)});
    }

    createEmptyComplexSection()
    {
        return {
            section: {
                
            },
            content: {
                
            }
            ,
            index : -1
        }
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

  renderSectionsPreview()
  {
    return this.state.complexSections.map((complexSection, index) => {
        return (
            (
                <SectionSummaryPreviewEdit key={index} content={complexSection.content} section={complexSection.section} editExistingSectionCallback={() => this.editExistingSectionCallback(complexSection)}/>
            )
        );
    });
  }

  editExistingSectionCallback(complexSection)
  {
    if(!complexSection)
    {
        console.error('complex section null');
    }

    if(!complexSection.section)
    {
        console.warn( 'section passed to edit existing section callback should not be undefined');
    }

    if(!complexSection.content)
    {
        console.warn( 'content passed to edit existing section callback should not be undefined');
    }

    this.navigateToSectionEditor(complexSection); // this.props.navigation.navigate("SectionEditor", {saveSectionCallback: this.sectionUpdation.bind(this, complexSection), existingSection: section, existingContent: content});
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