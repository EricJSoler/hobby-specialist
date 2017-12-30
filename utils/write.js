import database from '../config/database/firebase';

function writeToDB(collection, uuid, json) {
    return database.database().ref(collection + '/' + uuid).set(json);
}

function writeContentToDB(content, uuid) {
    return writeToDB('content', uuid, content);
}

export function writeContent(content, uuid) {
    if (content.type) {
        return writeContentToDB(content, uuid);
    }
    else {
        return Promise.reject('Content Type must be defined')
    }
}

function writeSectionToDB(section, uuid) {
    return writeToDB('section', uuid, section);
}

export function writeSection(section, uuid) {
    return writeSectionToDB(section, uuid);
}

function writePostToDB(post, uuid) {
    return writeToDB('post', uuid, post);
}

export function writePost(post, uuid) {
    return writePostToDB(post, uuid);
}

function writePostSummaryContentToDB(postSummaryContent, uuid) {
    return writeToDB('postSummaryContent', uuid, postSummaryContent);
}

export function writePostSummaryContent(postSummaryContent, uuid) {
    if (postSummaryContent.type) {
        return writePostSummaryContentToDB(postSummaryContent, uuid);
    }
    else {
        return Promise.reject('Post Summary Content Type must be defined');
    }
}

function writePostSummaryToDB(postSummary, uuid) {
    return writeToDB('postSummary', uuid, postSummary);
}

export function writePostSummary(postSummary, uuid) {
    return writePostSummaryToDB(postSummary, uuid);
}