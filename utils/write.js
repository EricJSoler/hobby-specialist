import database from '../config/database/firebase';
import * as DatabaseConstants from '../config/constants/DatabaseConstants';

function writeToDB(collection, uuid, json) {
    return database.database().ref(collection + DatabaseConstants.SLASH + uuid).set(json);
}

function writeSectionToDB(section, uuid) {
    return writeToDB(DatabaseConstants.SECTION, uuid, section);
}

export function writeSection(section, uuid) {
    return writeSectionToDB(section, uuid);
}

function writePostToDB(post, uuid) {
    return writeToDB(DatabaseConstants.POST, uuid, post);
}

export function writePost(post, uuid) {
    return writePostToDB(post, uuid);
}