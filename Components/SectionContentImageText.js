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
        this.state = {
            image: this.props.content.image,
            text: this.props.content.text,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(previousState => {
            return {image: nextProps.content.image, text: nextProps.content.text};
          });
    }

    render() {
        return (
            (
                <CardItem>
                    <Body>
                        <View style={{flex: 1, width: 200, height: 200, margin: 5}}>         
                            <Image 
                            style={{flex:1, height: undefined, width: undefined, resizeMode: 'contain'}}
                            source={{uri: this.state.image}}
                            />
                        </View>
                        <Text>
                            { this.state.text}
                        </Text>
                    </Body>
                </CardItem>
            )
        );
    }

}
