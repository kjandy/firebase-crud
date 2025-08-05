"use client";
import React, { useEffect, useState } from "react";
import { getAllPosts, getPostById } from "@/components/DisplayPost";
import { formatDate } from "@/lib/formatDate";
import { BackToButton } from "@/components/BackToButton";
import { CreatePost } from "@/components/CreatePost";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export default function PostList() {
  // Zustandストアからユーザー情報を取得
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Firestoreのリアルタイム監視を開始
    // setPosts() をコールバックに渡す
    const unsubscribe = getAllPosts(setPosts);
    // コンポーネントのアンマウント時に監視を解除
    return () => unsubscribe();
  }, []); // 依存配列を空にして、コンポーネントの初回マウント時のみ実行

  return (
    <div>
      <BackToButton url="/" label="ホーム" />
      {/* <CreatePost /> */}
      <h1 className="text-3xl font-bold mb-6">投稿一覧</h1>
      {!user ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインしてください</h1>
          <Button asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-4">
          {/* postsが配列であることを確認 */}
          {Array.isArray(posts) &&
            posts.map((post) => (
              <li key={post.id} className="border rounded-md">
                <Link
                  href={`/post/${post.id}`}
                  className="p-4 flex justify-between items-center hover:bg-gray-100"
                >
                  <div className="post__content">
                    <p className="text-sm text-gray-500">
                      投稿日:{" "}
                      {post.createdAt ? formatDate(post.createdAt) : "日付不明"}
                    </p>
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    {/* <p className="mt-2">{post.content}</p> */}
                  </div>
                  <ArrowRight />
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
