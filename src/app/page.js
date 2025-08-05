"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { logout } from "../lib/firebase-auth"; // Firebase Authenticationのメソッドをインポート
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  // Zustandストアからユーザー情報とログアウト関数を取得
  // Firebaseのlogutと関数名が被るので、別名clearUserでインポート
  const { user, logout: clearUser } = useAuthStore();
  const router = useRouter();
  const handleLogout = async () => {
    await logout(); // Firebaseからログアウト
    clearUser(); // Zustandストアからユーザー情報をクリア
    router.push("/login");
  };

  return (
    <div className="max-w-sm mx-auto my-4">
      {!user ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインしてください</h1>
          <Button asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ようこそ, {user.email}</h1>
          <Button onClick={handleLogout}>ログアウト</Button>
        </div>
      )}
      <ul className="min-h-screen flex justify-center items-center gap-4">
        <li>
          <Button asChild>
            <Link href="/create-post">Create Post</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/post">Display Posts</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
