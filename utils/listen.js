import database from '../config/database/firebase';
import { getRef } from '../config/database/ref';

function listenForAdded(api, addCallback) {
    getRef(api).on('child_added', function(snapshot) {
        addCallback(snapshot.key, snapshot.val());
     });
}

function listenForChanged(api, changedCallback) {
    getRef(api).on('child_changed', function(snapshot) {
        changedCallback(snapshot.key, snapshot.val());
    });
}
function listenForRemoved(api, removeCallback) {
    getRef(api).on('child_removed', function(snapshot) {
        removeCallback(snapshot.key);
    });
}

function stopListening(api, event) {
    getRef(api).off(event);
}

export function listenForAddedPosts(addPostCallBack) {
    listenForAdded('post', addPostCallBack);
}

export function listenForChangedPosts(changedPostCallBack) {
    listenForChanged('post', changedPostCallBack);
}

export function listenForRemovedPosts(removePostCallBack) {
    listenForRemoved('post', removePostCallBack);
}

export function stopListeningForAddedPosts() {
    stopListening('post', 'child_added');
}

export function stopListeningForChangedPosts() {
    stopListening('post', 'child_changed');
}

export function stopListeningForRemovedPosts() {
    stopListening('post', 'child_removed');
}