import React from 'react';
import { Text } from 'react-native';
import { Container, Header, Footer, Content, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import SectionSummaryPreviewEdit  from '../../Components/SectionSummaryPreviewEdit';
import { getSectionById } from '../../utils/read';

// TODO: add validation
// TODO: add remove
export default class PostEditorScreen extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = { 
            complexSections: [],
            titleText: '',
            image: '',
            summaryText: ''
        }


    }

    componentDidMount() {
        // TODO: move to appropriate lifecycle method
        if (!this.props.navigation.state.params.shouldInitializeFromComplexPost)
        {
          return;
        }
        else
        {
            console.log('updating existing');
            this.setState(previousState => {
                return { 
                  titleText:  this.props.navigation.state.params.complexPost.post.postSummary.title,
                  image: this.props.navigation.state.params.complexPost.post.postSummary.content.image,
                  summaryText: this.props.navigation.state.params.complexPost.post.postSummary.content.text
                };
              });

            this.props.navigation.state.params.complexPost.sections.forEach(function(section) {
                var complexSection = {
                    section: section,
                    index: this.state.complexSections.length
                }

                this.state.complexSections.push(complexSection);
            }.bind(this));

            if (this.props.navigation.state.params.isPublishedPost)
            {
                var sections = [];
                var promises = [];
            
                this.props.navigation.state.params.complexPost.post.sectionLookupIdList.forEach(function(sectionId) {
                  promises.push(getSectionById(sectionId));
                });
            
                Promise.all(promises).then((values) => {
                  values.forEach((value) => {
                    sections.push(value.val());
                  });
                
                    sections.forEach((section) => {
                        var complexSection = {
                            section: section,
                            index: this.state.complexSections.length
                        }
        
                        this.state.complexSections.push(complexSection);
                        this.setState(previousState => {
                            return this.state; 
                          });
                    });
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
                    <Input  onChangeText={(text) => this.setState({image: text})}
                            value={this.state.image}/>
                </Item>
                <Item stackedLabel>
                    <Label>Summary</Label>
                    <Input  onChangeText={(text) => this.setState({summaryText: text})}
                            value={this.state.summaryText}/>
                </Item>
            </Form>
            <Button block light style={{marginBottom: 10}} onPress={() => this.savePost()}>
                <Text>
                    Save Post
                </Text> 
            </Button>
            {this.renderSectionsPreview()}
            <Button block light style={{marginTop: 10}} onPress={() => this.navigateToSectionEditor()}>
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

  savePost()
  {
    this.props.navigation.state.params.complexPost.post = this.createPostJSON();
    this.props.navigation.state.params.complexPost.sections = this.createSectionsJSON();

    this.props.navigation.state.params.updateComplexPostCallback(this.props.navigation.state.params.complexPost);
    this.props.navigation.goBack();
  }

  createPostJSON()
  {
      return {
        postSummary: {
            title: this.state.titleText,
            content: {
                image: this.state.image,
                text: this.state.summaryText,
            }
        },
        sectionLookupIdList: this.props.navigation.state.params.complexPost.post.sectionLookupIdList
      }
  }

  createSectionsJSON()
  {
      var sections = []
      this.state.complexSections.forEach(function(complexSection) {
        sections.push(complexSection.section)
      });

      return sections;
  }

  // Utilities
  createEmptyComplexSection()
  {
      return {
          section: {
              content: {
                  
              }                
          },
          index: -1
      }
  }
  
} 
