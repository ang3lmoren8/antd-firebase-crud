import firebase from '../firebase'

class FirebaseApi {
  constructor() {
    this.firestore = firebase.firestore()
  }

  fetchTasks = async () => {
    const data = await this.firestore.collection('tasks').get()
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  }

  editTask = task => {
    this.firestore.collection('tasks').doc(task.id).set(task)
  }

  deleteTask = id => {
    this.firestore.collection('tasks').doc(id).delete()
  }

  addTask = task => {
    console.log(task)
    this.firestore.collection('tasks').add(task)
  }
}

export default new FirebaseApi()
