// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Existing content */}
        
        {/* Link to Admin Login */}
        <Link href="/admin/home/login" className="text-blue-600 hover:underline">
          Go to Admin Login
        </Link>
      </main>
      {/* Existing footer */}
    </div>
  );
}
