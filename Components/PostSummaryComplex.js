import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Thumbnail, Card, CardItem, Left, Body, Right, Button } from "native-base";
import * as PostSummaryConstants from '../config/constants/PostSummaryConstants';
import { generateDefaultPostSummary } from '../utils/defaultObjGenerator';


const CLAZZ_NAME = '[PostSummary]';

// Returns html for rendering card to represent a post summary
// Inputs:
// postSummary:PostSummary: {
// 	postSummaryLookupId: uuid
// 	title: string
// 	content: {
// 		image:
// 		text:
// 	}
// }
// onEditPressCallback: optional: a call back function for when this component is pressed 
// onPublishPressCallback: optional: a call back function for wh
export default class PostSummaryComplex extends React.Component {
    
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
                <Card style={{flex: 1}} >
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: this.props.postSummary.content.image}} />  
                            <Body>  
                                <Text>{ this.props.postSummary.title}</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Left>
                                <Button light onPress={this.props.onEditPressCallback}>
                                    <Text>
                                        Edit
                                    </Text> 
                                </Button>
                            </Left>
                            <Right>
                                <Button light onPress={this.props.onPublishPressCallback}>
                                    <Text>
                                        Publish 
                                    </Text> 
                                </Button>
                            </Right>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.props.postSummary.content.text}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>  
        );
    }

}
