import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

///////////////////////////////
// 更新（Update in Firestore）
///////////////////////////////
export const updatePostById = async (id, data) => {
  const ref = doc(db, "posts", id);
  await updateDoc(ref, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
};
