import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import SectionContent from './SectionContent';

// Returns html for rendering a card that displays a section
// Inputs: 
// section: a section object abiding by the following schema
//  Section: {
//	sectionLookupId: uuid
//	header: string
//	content: contentLookupId
//	footer: string
//  }
//  sectionContent: a section content object abiding by the following schema
// Content {
// 	contentLookupId: uuid
// 	type: StringNamedType //x number of properties dependent upon hardcoded named type
// }
export default class Section extends React.Component {
    
    constructor(props)
    {
        super(props);
        
        if (!props.section)
        {
            console.warn('Section expects section as a property');
        }

        if (!props.sectionContent)
        {
            console.warn('Section expects section content as a property');
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
                <SectionContent sectionContent={this.props.sectionContent} />
                <CardItem>
                    <Body>
                        <Text>
                            {this.props.section.footer}
                        </Text>
                    </Body>
                </CardItem>
            </Card> 
        );
    }
}