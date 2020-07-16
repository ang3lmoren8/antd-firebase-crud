import firebase from 'firebase'

// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyD4rpABoCFt8esoyDxhKJtBnMHGsL9FkpA',
  authDomain: 'prueba-c8410.firebaseapp.com',
  databaseURL: 'https://prueba-c8410.firebaseio.com',
  projectId: 'prueba-c8410',
  storageBucket: 'prueba-c8410.appspot.com',
  messagingSenderId: '381707889598',
  appId: '1:381707889598:web:156347008e19215428e7ef',
  measurementId: 'G-QP53R2QG4C'
}
// Initialize Firebase
firebase.initializeApp(config)
firebase.analytics()

export default firebase
