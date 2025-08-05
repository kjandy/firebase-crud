"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.jsのルーターをインポート
import { onAuthStateChanged } from "firebase/auth"; // Firebase Authenticationのメソッドをインポート
import { useAuthStore } from "@/store/auth-store"; // Zustandストアをインポート
import { loginWithEmail, loginWithGoogle } from "../../lib/firebase-auth"; // Firebase Authenticationのメソッドをインポート
import { auth } from "../../../firebase.config"; // Firebase Authenticationのインスタンス
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// ログインページコンポーネント
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    // ユーザーの認証状態を監視
    // 認証状態が変わったときに呼び出されるコールバック関数を設定
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合、ストアにユーザー情報を保存
        setUser(user);
        // ユーザーがログインしている場合、ユーザー情報をストアに保存し、TOPページにリダイレクト
        router.push("/");
      }
    });
    // クリーンアップ関数で監視を解除
    return () => unsubscribe();
  }, [router, setUser]);

  // Emailとパスワードでログインする関数
  const handleEmailLogin = async () => {
    try {
      // Firebase Authenticationを使用してEmailとパスワードでログイン
      await loginWithEmail(email, password);
    } catch (e) {
      alert(e.message);
    }
  };

  // Googleでログインする関数
  const handleGoogleLogin = async () => {
    try {
      // Firebase Authenticationを使用してGoogleでログイン
      await loginWithGoogle();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button onClick={handleEmailLogin} className="mx-auto block">
        Emailでログイン
      </Button>
      <br />
      <br />
      <Separator className="my-8" />
      <Button onClick={handleGoogleLogin} className="mx-auto block">
        Googleでログイン
      </Button>
      <Separator className="my-8" />
      <p className="mt-4 text-center">
        <Link href="/signup" className="text-blue-600 underline">
          新規ユーザー登録
        </Link>
      </p>
    </div>
  );
}
