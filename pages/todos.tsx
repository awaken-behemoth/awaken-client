import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-red-500 h-screen w-screen">
      <Link href="/"> todos page</Link>
    </div>
  );
}
