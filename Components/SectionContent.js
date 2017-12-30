import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import * as SectionContentConstants from '../config/constants/SectionContentConstants';
// import {createSectionContent } from '../utils/sectionContentFactory'

// Returns html for rendering a card that displays a preview view of a section 
// Inputs: 
// sectionContent: a section content object abiding by the following schema
// Content {
// 	contentLookupId: uuid
// 	type: StringNamedType //x number of properties dependent upon hardcoded named type
// }
export default class SectionContent extends React.Component {
    
    constructor(props)
    {
        super(props);
        if (!props.sectionContent)
        {
            console.log('Section content expects a sectionContent as a property')
        }
    }

    render() {
        return this.createSectionContent(this.props.sectionContent);
    }

    createSectionContent(sectionContent)
    {
        console.log('hit here');
        if(!sectionContent)
        {
            console.log("cannot create section content for null section content");
        }
    
        switch(sectionContent.type)
        {
            case SectionContentConstants.IMAGE_AND_TEXT:
            return (
                (
                    <CardItem>
                        <Body>
                            <View style={{flex: 1, width: 200, height: 200, margin: 5}}>         
                                <Image 
                                style={{flex:1, height: undefined, width: undefined, resizeMode: 'contain'}}
                                source={{uri: sectionContent.image}}
                                />
                            </View>
                            <Text>
                                {sectionContent.text}
                            </Text>
                        </Body>
                    </CardItem>
                )
            );
            default:
                return (
                    (
                        <CardItem />
                    )
                );
        }
    }
}