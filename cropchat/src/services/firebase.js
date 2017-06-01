import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCqM9bPtHmERf7Zcf2kL-ktaJZu8711Rng',
  authDomain: 'cropchat-50ff7.firebaseapp.com',
  databaseURL: 'https://cropchat-50ff7.firebaseio.com',
  storageBucket: 'cropchat-50ff7.appspot.com',
  messagingSenderId: '187222083715'
}

firebase.initializeApp(config)

export default {
  database: firebase.database()
}
