import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to BankingApp</h1>
      <p>Manage your finances with ease.</p>
      <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "12px" }}>
        <Link href="/login"><button className="primary">Login</button></Link>
        <Link href="/signup"><button className="secondary">Signup</button></Link>
      </div>
    </div>
  );
}
