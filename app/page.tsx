import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Link href="/public">Public Page</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
