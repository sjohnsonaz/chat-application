import firebase from 'firebase';

import config from './config';

export function run() {
    firebase.initializeApp(config);
    firebase.auth();
    firebase.storage();
    firebase.database();
    return 'Application started...';
}

window.onload = function () {
    console.log(run());
}