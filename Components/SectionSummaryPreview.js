import React from 'react';
import { Text } from 'react-native';
import { Card, CardItem, Body } from "native-base";

const CLAZZ_NAME = '[SectionSummaryPreview]';

// Returns html for rendering a card that displays a preview view of a section 
// Inputs: a section object abiding by the following schema
//  section: {
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
            console.warn(CLAZZ_NAME, 'Expects a section as a property')
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
