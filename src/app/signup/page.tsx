"use client";
import { useRouter } from "next/navigation";
import HeaderGreeting from "@/components/ui/HeaderGreeting";
import QuickActions from "@/components/ui/QuickActions";
import Shortcuts from "@/components/ui/Shortcuts";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => (prev === 1 ? 1.1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "true");
    router.push("/home");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#000000", color: "#f3f4f6" }}>
      <HeaderGreeting scale={scale} name="Join Spendlens" />
      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            marginTop: 8,
            borderRadius: 14,
            backgroundColor: "#12161d",
            border: "1px solid #20242d",
            padding: 16,
            maxWidth: 420,
            marginInline: "auto"
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Create account</h2>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <input type="text" placeholder="Full name" style={{ padding: 10, borderRadius: 10, border: "1px solid #2a2f37", backgroundColor: "#0f1115", color: "#e5e7eb" }} />
            <input type="text" placeholder="Email" style={{ padding: 10, borderRadius: 10, border: "1px solid #2a2f37", backgroundColor: "#0f1115", color: "#e5e7eb" }} />
            <input type="password" placeholder="Password" style={{ padding: 10, borderRadius: 10, border: "1px solid #2a2f37", backgroundColor: "#0f1115", color: "#e5e7eb" }} />
            <button className="primary" style={{ padding: "12px 16px", borderRadius: 12, background: "linear-gradient(135deg,#22c55e,#0ea5e9)", color: "white", border: 0, cursor: "pointer", fontWeight: 700 }}>Create account</button>
          </form>
        </div>
      </div>
      {/* Removed bottom quick UI per request */}
    </div>
  );
}
