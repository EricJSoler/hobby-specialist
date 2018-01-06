import React from 'react';
import { Text } from 'react-native';
import { Footer, Card, CardItem, Body, Title, Right, Button } from "native-base";

const CLAZZ_NAME = '[SectionSummaryPreviewEdit]';

// Returns html for rendering a card that displays a preview view of a section 
// Inputs: 
// section: a section object abiding by the following schema
// {
// 	sectionLookupId: uuid
// 	header: string // V2 may get componatized
// 	footer: string // V2 may get componatized
//     content: {
// 		type: StringNamedType //x number of properties dependent upon hardcoded named type	
// 	}
// }
//  editCallback: a callback function that will be invoked when the edit button is pressed
export default class SectionSummaryPreviewEdit extends React.Component {
    
    constructor(props)
    {
        super(props);
        
        if (!props.section)
        {
            console.warn(CLAZZ_NAME, 'Expects a section as a property')
        }

        if (!props.editExistingSectionCallback)
        {
            console.warn(CLAZZ_NAME, 'Expects a editExistingSectionCallback as a property')
        }
    }

    render() {
        return (
            <Card style={{flex: 1}} >
            <CardItem>
                <Body>  
                    <Title>{this.props.section.header}</Title>
                </Body>
                <Footer>
                    <Right>
                        <Button light onPress={this.props.editExistingSectionCallback}>
                            <Text>
                                Edit Section
                            </Text> 
                        </Button>
                    </Right>
                </Footer>
            </CardItem>
        </Card> 
        );
    }

}
