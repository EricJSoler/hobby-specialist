import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";

// Returns html for rendering a card that displays a preview view of a section 
// Inputs: a section object abiding by the following schema
//  Section: {
//	sectionLookupId: uuid
//	header: string
//	content: contentLookupId
//	footer: string
//  }
export default class SectionSummaryPreview extends React.Component {
    
    constructor(props)
    {
        super(props);
        if (!props.section)
        {
            console.log('Section summary preview expects a section as a property')
        }
    }

    render() {
        return (
            <Card style={{flex: 1}} >
            <CardItem>
                <Body>  
                    <Text>{this.props.section.header}</Text>
                </Body>
            </CardItem>
        </Card> 
        );
    }
}