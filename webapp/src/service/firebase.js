import firebase from 'firebase'

var config = {
  apiKey: '<Your api key here>',
  authDomain: '<Your auth Domain here>',
  databaseURL: '<Your databaseUrl here>',
  storageBucket: '<Your storageBucket here>',
  messagingSenderId: '<Your messagingSenderId here>'
}

firebase.initializeApp(config)

export default {
  database: firebase.database()
}
