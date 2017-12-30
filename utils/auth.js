import database from '../config/database/firebase';

export function signOut() {
    return database.auth().signOut();
}