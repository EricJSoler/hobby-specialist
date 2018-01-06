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
        
        stateToValidate = {
            section: this.props.section,
          };
      
        var defaultObjectsUsed = [];

        if (!stateToValidate.section)
        {
            console.log(CLAZZ_NAME, 'Expects section as a property');
            stateToValidate.section = _defaultObjGenerator.generateDefaultSection();
            defaultObjectsUsed.push({ key: 'props.section', value: stateToValidate.section});
        }

        if (!stateToValidate.section.content)
        {
            console.log(CLAZZ_NAME, 'Expects valid section.content as a property');
            stateToValidate.section.content = _defaultObjGenerator.generateDefaultSectionContent(SectionContentConstants.IMAGE_TEXT);
            defaultObjectsUsed.push({ key: 'props.section.content', value: stateToValidate.section.content});
        }

        if (!stateToValidate.section.content.type)
        {
            console.log(CLAZZ_NAME, 'Expects valid section.content.type as a property');
            stateToValidate.section.content = _defaultObjGenerator.generateDefaultSectionContent(SectionContentConstants.IMAGE_TEXT);
            defaultObjectsUsed.push({ key: 'props.section.content', value: stateToValidate.section.content});
        }

        if(defaultObjectsUsed.length > 0)
        {
          console.warn(CLAZZ_NAME, 'Default objects used ', defaultObjectsUsed);
        }

        this.state = stateToValidate;
    }

    render() {
        return (
            <Card style={{flex: 1}} >
                <CardItem>
                    <Body>  
                        <Text>{this.state.section.header}</Text>
                    </Body>
                </CardItem>
                {this.renderSectionContent(this.state.section.content)} 
                <CardItem>
                    <Body>
                        <Text>
                            {this.state.section.footer}
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
