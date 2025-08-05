///////////////////////////////
// @/conponents/DisplayPost.jsx
//
// １、getAllPosts（全件取得用コンポーネント）
//　2、getPostById（単一投稿取得用コンポーネント）
//
///////////////////////////////

import { db } from "../../firebase.config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

///////////////////////////////
// 全件取得（Display All Data from Firestore）
///////////////////////////////

export const getAllPosts = (callback) => {
  // createdAt(日時)でソート（新しい順）
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(posts); //コールバックで受取ったsetPosts()にpostsを代入
  });

  return unsubscribe;
};

///////////////////////////////
// 単一投稿データ取得（Display single Data from Firestore）
///////////////////////////////

export const getPostById = async (id) => {
  // 指定されたIDの投稿ドキュメントを取得するための参照を作成
  const docRef = doc(db, "posts", id);

  // ドキュメントの中身を取得
  const docSnap = await getDoc(docRef);

  // データが存在するか確認
  if (docSnap.exists()) {
    // 存在する場合：IDとデータをオブジェクトとして返す
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } else {
    // 存在しない場合：エラーを投げる（例：URL直打ちなどで無効なID指定）
    throw new Error("No such document!（該当する投稿が存在しません）");
  }
};
