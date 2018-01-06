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

export function getSectionById(lookupId) {
    return getFromDB('section', lookupId);
}



