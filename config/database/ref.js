import database from './firebase';

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