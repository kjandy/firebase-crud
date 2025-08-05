import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

///////////////////////////////
// 削除（Delete in Firestore）
///////////////////////////////
export const deletePostById = async (id) => {
  // Firestoreのドキュメントを参照
  const ref = doc(db, "posts", id);
  await deleteDoc(ref);
};
