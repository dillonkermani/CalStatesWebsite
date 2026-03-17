import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBMWbZajueDlcM9L8OSCPj_rLfxw1-aUIs',
  authDomain: 'calstateyoyo.firebaseapp.com',
  projectId: 'calstateyoyo',
  storageBucket: 'calstateyoyo.firebasestorage.app',
  messagingSenderId: '462946574306',
  appId: '1:462946574306:web:36f8557290f6d20bd723bb',
  measurementId: 'G-EEC32WQHBF',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
