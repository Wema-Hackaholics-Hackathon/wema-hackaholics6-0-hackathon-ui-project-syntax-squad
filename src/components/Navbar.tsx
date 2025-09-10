"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("alerts");
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <nav style={{
      position: "fixed",
      top: 12,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginInline: "auto",
      maxWidth: 800,
      padding: 10,
      background: "rgba(15,17,21,0.8)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid #1f2430",
      borderRadius: 12,
      color: "#e5e7eb",
      // transform: "translateX(210px)" 
    }}>
      <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>Spendlens</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link href="/home" style={{ color: "#cbd5e1" }}>Home</Link>
        <Link href="/history" style={{ color: "#cbd5e1" }}>History</Link>
        <button onClick={handleLogout} style={{
          padding: "8px 10px",
          borderRadius: 10,
          border: "1px solid #2a2f37",
          background: "linear-gradient(135deg,#22c55e,#0ea5e9)",
          color: "white",
          cursor: "pointer",
          fontWeight: 700
        }}>Logout</button>
      </div>
    </nav>
  );
}
