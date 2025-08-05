"use client";

import React, { useState, use } from "react";
import { BackToButton } from "@/components/BackToButton";
import { getPostById } from "@/components/DisplayPost";
import { updatePostById } from "@/components/UpdatePost";
import { deletePostById } from "@/components/DeletePost";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function PostDetailPage({ params }) {
  // params から id を取得
  // use() を使うことで、Promiseを解決して値を取得できます
  const { id } = use(params); // use() で Promise を展開
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthStore();

  // 初回読み込み
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id);
      setPost(data);
    };
    if (id && user) fetchPost(); // ユーザーがログインしている場合のみデータを取得
  }, [id, user]);

  // 編集フォーム submit
  const handleUpdate = async (formData) => {
    const title = formData.get("title");
    const content = formData.get("content");
    await updatePostById(id, { title, content });
    setIsEditing(false); // 編集モード解除
    const updated = await getPostById(id);
    setPost(updated);
  };

  const handleDelete = async () => {
    await deletePostById(id);
    router.push("/post"); // 投稿一覧へ戻る
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">ログインが必要です</h2>
        <Button onClick={() => router.push("/login")}>
          ログインページへ移動
        </Button>
      </div>
    );
  }

  if (!post) return <p>読み込み中...</p>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <BackToButton url="/post" label="投稿一覧へ" />
      <h1 className="text-2xl font-bold mb-4">投稿詳細</h1>

      {!isEditing ? (
        <div>
          <p className="text-sm text-gray-500 mb-2">
            投稿日時: {post.createdAt}
          </p>
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2">{post.content}</p>

          <Button
            className="mt-4 bg-gray-200 px-4 py-2 rounded text-gray-800 hover:text-gray-50"
            onClick={() => setIsEditing(true)}
          >
            編集モード
          </Button>
        </div>
      ) : (
        <>
          {/* 編集フォーム */}
          <form action={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm">タイトル</label>
              <input
                name="title"
                defaultValue={post.title}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm">本文</label>
              <textarea
                name="content"
                defaultValue={post.content}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                更新する
              </Button>

              <Button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                この投稿を削除
              </Button>
              <Button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                キャンセル
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
