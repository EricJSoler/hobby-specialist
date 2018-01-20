import database from './firebase';
import * as DatabaseConstants from '../constants/DatabaseConstants';

var refs = {}

export function setRef(api) {
    refs[api] = database.database().ref().child(api); 
}

export function getRef(api) {
    if (!refs[api]) {
        setRef(api);
    }
    return refs[api];
}

export function getSectionsRef() {
    return getRef(DatabaseConstants.SECTION);
}

export function getPostsRef() {
    return getRef(DatabaseConstants.POST);
}