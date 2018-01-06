import database from '../config/database/firebase';

function writeToDB(collection, uuid, json) {
    return database.database().ref(collection + '/' + uuid).set(json);
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