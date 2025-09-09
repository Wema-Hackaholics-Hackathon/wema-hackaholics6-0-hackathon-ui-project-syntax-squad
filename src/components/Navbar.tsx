"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("alerts");
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 16px",
      backgroundColor: "#0b0d11",
      borderBottom: "1px solid #1f2430",
      color: "#e5e7eb"
    }}>
      <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>Spendlens</div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link href="/home" style={{ color: "#cbd5e1" }}>Home</Link>
        <Link href="/history" style={{ color: "#cbd5e1" }}>History</Link>
        <DarkModeToggle />
        <button onClick={handleLogout} className="danger">Logout</button>
      </div>
    </nav>
  );
}
