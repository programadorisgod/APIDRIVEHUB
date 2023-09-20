import firebaseAdmin from 'firebase-admin'
import readFromJson from './readFromJson.js'

const serviceAccount = readFromJson('../../../config/firebase.json')

const app = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
})
export const verifyIdToken = async (idToken) => {
  try {
    const { uid } = await app.auth().verifyIdToken(idToken)
    return uid
  } catch (error) {
    return null
  }
}
