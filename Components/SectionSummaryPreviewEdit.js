import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";

// Returns html for rendering a card that displays a preview view of a section 
// Inputs: 
// section: a section object abiding by the following schema
//  Section: {
//	sectionLookupId: uuid
//	header: string
//	content: contentLookupId
//	footer: string
//  }
// content:a section content object abiding by the following schema
// Content {
//	contentLookupId: uuid
//	type: StringNamedType //x number of properties dependent upon hardcoded named type
//  }
//  editCallback: a callback function that will be invoked when the edit button is pressed
export default class SectionSummaryPreviewEdit extends React.Component {
    
    constructor(props)
    {
        super(props);
        
        if (!props.section)
        {
            console.log('Section summary preview edit expects a section as a property')
        }

        if (!props.content)
        {
            console.log('Section summary preview edit expects a content as a property')
        }

        if (!props.editExistingSectionCallback)
        {
            console.log('Section summary preview edit expects a section as a property')
        }
    }

    render() {
        return (
            <Card style={{flex: 1}} >
            <CardItem>
                <Body>  
                    <Text>{this.props.section.header}</Text>
                </Body>
                <Footer>
                    <Right>
                        <Button onPress={this.props.editExistingSectionCallback}>
                            <Text>
                                Edit Section
                            </Text> 
                        </Button>
                    </Right>
                </Footer>
            </CardItem>
        </Card> 
        );
    }
}