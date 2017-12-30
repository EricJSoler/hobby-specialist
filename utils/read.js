import database from '../config/database/firebase';

function getAllFromDB(api) {
    return database.database().ref('/' + api + '/').once('value');
}

function getFromDB(api, lookupId) {
    return database.database().ref('/' + api + '/' + lookupId).once('value');
}

export function getPosts() {
    return getAllFromDB('post');
}

export function getPostSummaries() {
    return getAllFromDB('postSummary');
}

export function getPostSummaryContents() {
    return getAllFromDB('postSummaryContent');
}

export function getPostSummaryContent(lookupId) {
    return getFromDB('postSummaryContent', lookupId);
}



