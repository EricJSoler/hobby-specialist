import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Thumbnail, Card, CardItem, Left, Body } from "native-base";
import * as PostSummaryConstants from '../config/constants/PostSummaryConstants';
import {getDefaultPostSummary} from '../utils/defaultObjGenerator';

const CLAZZ_NAME = '[PostSummaryList]';

// Returns html for rendering card to represent a post summary
// Inputs:
// postSummarys:[ PostSummary: {
//     	postSummaryLookupId: uuid
//     	title: string
//     	content: {
//     		image:
//     		text:
// 	    }
//  }
// ]
// onPressCallback: optional: a call back function for when this component is pressed 
export default class PostSummaryList extends React.Component {
    
    constructor(props)
    {
        super(props);

        if (!this.props.postSummarys)
        {
            var postSummaryList = [];
            postSummaryList.push(getDefaultPostSummary());
            this.props.postSummarys = postSummaryList;

            console.warn(CLAZZ_NAME, 'Expects a postSummarys as a property', {usingPostSummarys: this.props.postSummarys});
        }

        if (!this.props.postSummary.content)
        {
            this.props.postSummary.content = {
                image: undefined,
                text: undefined
            }
        }

        if (!this.props.postSummary.content.image && !this.props.postSummary.content.text) 
        {
            this.props.postSummary.content.image = PostSummaryConstants.DEFAULT_IMAGE; 
            this.props.postSummary.content.text = PostSummaryConstants.DEFAULT_TEXT;
        }
    }

    render() {
        return (
                <Card style={{flex: 1}} >
                    <CardItem button onPress={this.props.onPressCallback}>
                        <Left>
                            <Thumbnail source={{uri: this.props.postSummary.content.image}} />  
                            <Body>  
                                <Text>{ this.props.postSummary.title}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem button onPress={this.props.onPressCallback}>
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
