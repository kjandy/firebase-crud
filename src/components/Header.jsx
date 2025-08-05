import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold">
        <Link href="/">App ID</Link>
      </h1>
    </div>
  );
};
