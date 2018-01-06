import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";
import * as SectionContentImageTextConstants from '../config/constants/SectionContentImageTextConstants';
import { generateDefaultSectionContent } from '../utils/defaultObjGenerator'

CLAZZ_NAME = '[SectionContentImageText]';

// Returns html for rendering a card that displays a preview view of a section 
// Inputs: 
// content: a section.content object abiding by the following schema
// {
// 	type: StringNamedType //x number of properties dependent upon hardcoded named type
//  image: string // uri
//  text: string
// }
export default class SectionContentImageText extends React.Component {
    
    constructor(props)
    {
        super(props);

        stateToValidate = {
            content: this.props.content,
          };
      
        var defaultObjectsUsed = [];

        if (!stateToValidate.content)
        {
            console.log(CLAZZ_NAME, 'Expects content as a property');
            stateToValidate.content = generateDefaultSectionContent(SectionContentConstants.IMAGE_TEXT);
            defaultObjectsUsed.push({ key: 'props.content', value: stateToValidate.content});
        }

        if (!stateToValidate.content.image)
        {
            console.log(CLAZZ_NAME, 'Expects  content.image as a property');
            stateToValidate.content.image = SectionContentImageTextConstants.DEFAULT_IMAGE;
            defaultObjectsUsed.push({ key: 'content.image', value: stateToValidate.content.image});
        }

        if (!stateToValidate.content.text)
        {
            console.log(CLAZZ_NAME, 'Expects content.text as a property setting to empty string');
            stateToValidate.content.text = '';
        }

        if(defaultObjectsUsed.length > 0)
        {
          console.warn(CLAZZ_NAME, 'Default objects used ', defaultObjectsUsed);
        }

        this.state = stateToValidate;
    }

    render() {
        return (
            (
                <CardItem>
                    <Body>
                        <View style={{flex: 1, width: 200, height: 200, margin: 5}}>         
                            <Image 
                            style={{flex:1, height: undefined, width: undefined, resizeMode: 'contain'}}
                            source={{uri: this.state.content.image}}
                            />
                        </View>
                        <Text>
                            { this.state.content.text}
                        </Text>
                    </Body>
                </CardItem>
            )
        );
    }

}
