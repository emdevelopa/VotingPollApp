import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Cagram Robo Poll</h1>
      <div className="space-x-4">
        <Link href="/register">
          <p className="px-4 py-2 bg-blue-500 text-white rounded">Register</p>
        </Link>
        <Link href="/login">
          <p className="px-4 py-2 bg-green-500 text-white rounded">Login</p>
        </Link>
      </div>
    </div>
  );
}
