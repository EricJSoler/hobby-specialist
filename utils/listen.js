import database from '../config/database/firebase';
import * as DatabaseConstants from '../config/constants/DatabaseConstants';
import { getRef } from '../config/database/ref';

function listenForAdded(api, addCallback) {
    getRef(api).on(DatabaseConstants.CHILD_ADDED, function(snapshot) {
        addCallback(snapshot.key, snapshot.val());
     });
}

function listenForChanged(api, changedCallback) {
    getRef(api).on(DatabaseConstants.CHILD_CHANGED, function(snapshot) {
        changedCallback(snapshot.key, snapshot.val());
    });
}
function listenForRemoved(api, removeCallback) {
    getRef(api).on(DatabaseConstants.CHILD_REMOVED, function(snapshot) {
        removeCallback(snapshot.key);
    });
}

function stopListening(api, event) {
    getRef(api).off(event);
}

export function listenForAddedPosts(addPostCallBack) {
    listenForAdded(DatabaseConstants.POST, addPostCallBack);
}

export function listenForChangedPosts(changedPostCallBack) {
    listenForChanged(DatabaseConstants.POST, changedPostCallBack);
}

export function listenForRemovedPosts(removePostCallBack) {
    listenForRemoved(DatabaseConstants.POST, removePostCallBack);
}

export function stopListeningForAddedPosts() {
    stopListening(DatabaseConstants.POST, DatabaseConstants.CHILD_ADDED);
}

export function stopListeningForChangedPosts() {
    stopListening(DatabaseConstants.POST, DatabaseConstants.CHILD_CHANGED);
}

export function stopListeningForRemovedPosts() {
    stopListening(DatabaseConstants.POST, DatabaseConstants.CHILD_REMOVED);
}