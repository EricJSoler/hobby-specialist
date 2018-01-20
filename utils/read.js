import database from '../config/database/firebase';
import * as DatabaseConstants from '../config/constants/DatabaseConstants';

function getAllFromDB(api) {
    return database.database().ref(DatabaseConstants.SLASH + api + DatabaseConstants.SLASH).once(DatabaseConstants.VALUE);
}

function getFromDB(api, lookupId) {
    return database.database().ref(DatabaseConstants.SLASH + api + DatabaseConstants.SLASH + lookupId).once(DatabaseConstants.VALUE);
}

export function getPosts() {
    return getAllFromDB(DatabaseConstants.POST);
}

export function getPostsWithAuthor(uid) {
    return getAllFromDB(...TODO);
}

export function getSectionById(lookupId) {
    return getFromDB(DatabaseConstants.SECTION, lookupId);
}



