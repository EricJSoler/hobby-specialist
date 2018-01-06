import * as PostSummaryConstants from '../config/constants/PostSummaryConstants';
import * as SectionConstants from '../config/constants/SectionConstants';
import * as SectionContentConstants from '../config/constants/SectionContentConstants';

export function generateDefaultPostSummary()
{
    return {
        title: PostSummaryConstants.DEFAULT_TITLE,
        content: {
            image: PostSummaryConstants.DEFAULT_IMAGE,
            text: PostSummaryConstants.DEFAULT_TEXT
        }
    }
}

export function generateDefaultPost()
{
    return {
        postLookupId: 'DEFAULT', // TODO
        authorLookupId: 'DEFAULT',
        sectionLookupIdList: ['DEFAULT'],
        postSummary: generateDefaultPostSummary()
    };
}

export function generateDefaultSection()
{
    return {
        sectionLookupId: SectionConstants.DEFAULT_LOOKUP_ID,
        header: SectionConstants.DEFAULT_HEADER, // V2 may get componatized
        footer: SectionConstants.DEFAULT_FOOTER, // V2 may get componatized
        content: generateDefaultSectionContent(SectionContentConstants.IMAGE_TEXT)
    }
}

export function generateDefaultSectionContent(type)
{
    switch(type)
    {
        case SectionContentConstants.IMAGE_TEXT:
            return {
                type: SectionContentConstants.IMAGE_TEXT,
                image: SectionContentConstants.DEFAULT_IMAGE,
                text: SectionContentConstants.DEFAULT_TEXT
            }
    }
}
