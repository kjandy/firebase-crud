"use client";
import React from "react";
import { CreatePost } from "@/components/CreatePost";
import { BackToButton } from "@/components/BackToButton";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function createPost() {
  // Zustandストアからユーザー情報を取得
  const { user } = useAuthStore();
  return user ? (
    <div>
      <BackToButton url="/" label="ホーム" />
      <CreatePost />
    </div>
  ) : (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">ログインしてください</h1>
      <Button asChild>
        <Link href="/login">ログイン</Link>
      </Button>
    </div>
  );
}
