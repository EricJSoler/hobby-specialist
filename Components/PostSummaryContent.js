import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label} from "native-base";

// Returns html for rendering a post summary content
// Inputs:
// a post summary content
// postSummaryContent: PostSummaryContent: {
// 	postSummaryContentLookupId: uuid
// 	title: 
// 	image:
// 	text:
// }
// onPressCallback: a call back function for when this component is pressed 
export default class PostSummaryContent extends React.Component {
    
    constructor(props)
    {
        super(props);
        if (!props.postSummaryContent)
        {
            console.warn('PostSummaryContent expects a postSummaryContent as a property');
        }
    }

    render() {
        return (
                <Card style={{flex: 1}} >
                    <CardItem button onPress={this.props.onPressCallback}>
                        <Left>
                            <Thumbnail source={{uri: this.props.postSummaryContent.image}} />  
                            <Body>  
                                <Text>{this.props.postSummaryContent.title}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem button onPress={this.props.onPressCallback}>
                        <Body>
                            <Text>
                                {this.props.postSummaryContent.text}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>  
        );
    }
}