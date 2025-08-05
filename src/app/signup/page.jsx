"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "../../lib/firebase-auth"; // Firebase Authenticationのメソッドをインポート
import { useAuthStore } from "@/store/auth-store"; // Zustandストアをインポート
import { auth } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth"; // Firebase Authenticationのメソッドをインポート
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthStore(); // Zustandストアからユーザー情報を設定する関数を取得
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);

      // 自動ログイン後のユーザーを Zustand に反映
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({ uid: user.uid, email: user.email }); // Zustandストアにユーザー情報を保存
          router.push("/"); // サインアップ後にホームへリダイレクト
        }
      });
    } catch (error) {
      alert("登録失敗: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded">
      <h1 className="text-2xl font-bold mb-4">新規ユーザー登録</h1>

      <Input
        type="email"
        placeholder="メールアドレス"
        className="w-full p-2 mb-4 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="パスワード"
        className="w-full p-2 mb-4 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSignUp} className="w-full">
        登録
      </Button>
      <Separator className="my-10" />
      <p className="mt-4 text-center">
        すでにアカウントをお持ちですか？{" "}
        <a href="/login" className="text-blue-600 underline">
          ログイン
        </a>
      </p>
    </div>
  );
}
