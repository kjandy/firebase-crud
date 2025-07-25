import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-sm mx-auto my-4">
      <ul className="min-h-screen flex justify-center items-center">
        <li>
          <Button asChild>
            <Link href="/home">Home</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
