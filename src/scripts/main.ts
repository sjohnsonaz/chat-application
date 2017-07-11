import firebase from 'firebase';

import config from './config';

export function run() {
    try {
        firebase.initializeApp(config);
        firebase.auth();
        firebase.storage();
        firebase.database();
    }
    finally {
        return 'Application started...';
    }
}

window.onload = function () {
    console.log(run());
}