import React from 'react';
import {  Text } from 'react-native';
import { Card, CardItem, Left, Body }  from "native-base";
import SectionContentImageText from './SectionContentImageText';
import * as SectionContentConstants from '../config/constants/SectionContentConstants';
import * as _defaultObjGenerator from '../utils/defaultObjGenerator'; 

const CLAZZ_NAME = '[Section]';

// Returns html for rendering a card that displays a section
// Inputs: 
// section: a section object abiding by the following schema
//  {
//  	sectionLookupId: uuid
// 	    header: string
// 	    footer: string
//      content {
// 		    type: StringNamedType //x number of properties dependent upon hardcoded named type	
// 	 }
// }
export default class Section extends React.Component {
    
    constructor(props)
    {
        super(props);

        this.state = {
            header: this.props.section.header,
            footer: this.props.section.footer,
            content: this.props.section.content,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(previousState => {
            return {header: nextProps.section.header, footer: nextProps.section.footer, content: nextProps.section.content};
          });
    }

    render() {
        return (
            <Card style={{flex: 1}} >
                <CardItem>
                    <Body>  
                        <Text>{this.state.header}</Text>
                    </Body>
                </CardItem>
                {this.renderSectionContent(this.state.content)} 
                <CardItem>
                    <Body>
                        <Text>
                            {this.state.footer}
                        </Text>
                    </Body>
                </CardItem>
            </Card> 
        );
    }

    renderSectionContent(content)
    {
        switch(content.type)
        {
            case SectionContentConstants.IMAGE_TEXT:
            return (
                (
                    <SectionContentImageText content={content}/>
                )
            );
        }
    }

}
