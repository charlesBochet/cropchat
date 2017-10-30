import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCqM9bPtHmERf7Zcf2kL-ktaJZu8711Rng',
  authDomain: 'cropchat-50ff7.firebaseapp.com',
  databaseURL: 'https://cropchat-50ff7.firebaseio.com',
  projectId: 'cropchat-50ff7',
  storageBucket: 'cropchat-50ff7.appspot.com',
  messagingSenderId: '187222083715'
}
firebase.initializeApp(config)

const database = firebase.database()
const storage = firebase.storage()

export {
  database,
  storage
}
