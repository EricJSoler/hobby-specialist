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
// buttonLeftText: optional: text for the first button. If undefined is specified the button will not render
// buttonLeftCallback: optional: a call back function for when the fist button is pressed 
// buttonRightText: optional: text for the second button. If undefined is specified the button will not render
// buttonRightCallback: optional: a call back function for when the second button is pressed
export default class PostSummaryComplex extends React.Component {
    
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
                <Card style={{flex: 1}} >
                    <CardItem>
                        <Thumbnail source={{uri: this.props.postSummary.content.image}} />  
                        <Body>  
                            <Text>{ this.props.postSummary.title}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.props.postSummary.content.text}
                            </Text>
                        </Body>
                    </CardItem>
                    {this.renderButtonCardItem()}
                </Card>  
        );
    }

    renderButtonCardItem() {
        if (this.props.buttonLeftText && this.props.buttonRightText) {
            return (
                (
                    <CardItem>
                        <Body>
                            {this.renderButton(this.props.buttonLeftCallback, this.props.buttonLeftText)}
                            {this.renderButton(this.props.buttonRightCallback, this.props.buttonRightText)}
                        </Body>
                    </CardItem>
                )
            );
        }
        else if (this.props.buttonLeftText) {
            return (
                (
                    <CardItem>
                        <Body>
                            {this.renderButton(this.props.buttonLeftCallback, this.props.buttonLeftText)}
                        </Body>
                    </CardItem>
                )
            );
        }
        else if (this.props.buttonRightText) {
            return (
                (
                    <CardItem>
                        <Body>
                            {this.renderButton(this.props.buttonRightCallback, this.props.buttonRightText)}
                        </Body>
                    </CardItem>
                )
            );
        }
    }

    renderButton(buttonOnPress, buttonText) {
        return (
            (
                <Button style={{marginBottom: 10}} light block onPress={buttonOnPress}>
                    <Text>
                        {buttonText}
                    </Text> 
                </Button>
            )
        );
    }

}