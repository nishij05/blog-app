
"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-sm mt-5 text-blue-500 hover:underline mb-4"
    >
      ← Back
    </button>
  );
}
