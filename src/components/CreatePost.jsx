"use client";

import React, { useState } from "react";

import { db } from "../../firebase.config"; //Firestoreのインスタンス
import { collection, addDoc } from "firebase/firestore"; //SDKからFirestore関連メソッドをインポート
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const CreatePost = () => {
  // フォームの内容を格納するステートを用意
  const [title, setTitle] = useState(""); // 投稿者名
  const [content, setContent] = useState(""); // 投稿内容

  ///////////////////////////////
  // 保存（Save in Firestore）
  ///////////////////////////////
  const handleSave = async (e) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ

    try {
      // データベースに保存するデータを準備
      const data = {
        createdAt: new Date().toISOString(), // 作成日時
        title: title, // フォームから取得したnameをdataに
        content: content, // フォームから取得したcontentをdataに
      };
      // "posts" という名前のコレクションにアクセスし、新しいドキュメントを追加
      const docRef = await addDoc(collection(db, "posts"), data);
      // フォームを空にする
      setTitle("");
      setContent("");
      // 成功した場合：追加されたドキュメントのIDと送信データをコンソールに返す
      console.log({ id: docRef.id, ...data });
    } catch (error) {
      // エラーが発生した場合：コンソールにエラー内容を表示して、
      console.error("Error adding document:", error);
      //呼び出し元にエラーを伝える
      throw error;
    }
  };

  return (
    <div className="max-w-sm mx-auto my-16">
      <h1 className="text-4xl font-bold mb-8 text-center">
        FirebaseのCrud処理
      </h1>
      <form onSubmit={handleSave}>
        <div className="space-y-6">
          <Label className="block">
            タイトル
            <Input
              placeholder="タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 入力内容を更新
              type="text"
            />
          </Label>
          <Label className="block">
            本文
            <Textarea
              placeholder="つぶやきましょう！"
              value={content}
              onChange={(e) => setContent(e.target.value)} // 入力内容を更新
              className="min-h-40"
            />
          </Label>
          {/* formに設定したhandleSaveを呼び出す */}
          <Button type="submit" className="block ml-auto">
            投稿
          </Button>
        </div>
      </form>
    </div>
  );
};
