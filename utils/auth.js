import database from '../config/database/firebase';

export function signOut() {
    return database.auth().signOut();
}

export function signInWithEmailAndPassword(email, password) {
    return database.auth().signInWithEmailAndPassword(email, password);
}

export function createUserWithEmailAndPassword(email, password) {
    return database.auth().createUserWithEmailAndPassword(email, password)
}

export function getCurrentUser() {
    return database.auth().currentUser;
}