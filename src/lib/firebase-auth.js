// firebase/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth"; // Firebase Authenticationのメソッドをインポート
import { auth } from "../../firebase.config"; // Firestoreのインスタンス

const googleProvider = new GoogleAuthProvider(); // Google認証プロバイダーのインスタンスを作成

///////////////////////////////
// ログイン/Email and Password
// （login in Firebase Authentication）
///////////////////////////////
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

///////////////////////////////
// ログイン/Google認証
// （login in Firebase Authentication）
///////////////////////////////

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

///////////////////////////////
// ログアウト
// （login out Firebase Authentication）
///////////////////////////////
export const logout = () => {
  return signOut(auth);
};

///////////////////////////////
// 新規ユーザー登録/Email and Password
///////////////////////////////
export const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
