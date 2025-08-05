import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const BackToButton = ({ url = "/", label = "ホーム" }) => {
  return (
    <Button asChild className="p-4 mb-10">
      <Link href={url}>{label}</Link>
    </Button>
  );
};
