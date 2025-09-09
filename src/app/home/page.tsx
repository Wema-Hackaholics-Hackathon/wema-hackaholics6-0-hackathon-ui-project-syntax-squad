"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeaderGreeting from "@/components/ui/HeaderGreeting";
import QuickActions from "@/components/ui/QuickActions";
import Shortcuts from "@/components/ui/Shortcuts";
import HistoryCard from "@/components/ui/HistoryCard";

export default function HomePage() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#0f1115", color: "#f3f4f6", paddingBottom: "84px" }}>
      {/* Top bar (time and status omitted for web) */}
      <div style={{ height: 12 }} />

      {/* Header greeting */}
      <HeaderGreeting scale={scale} name="Hello, Syntax Squad!" />

      {/* Quick actions */}
      <QuickActions />

      {/* Shortcuts */}
      <Shortcuts />
      <div style={{ padding: "14px 16px" }}>
        <Link href="/savings-insight" style={{
          textDecoration: "none",
          display: "inline-block",
          padding: "12px 16px",
          borderRadius: 12,
          background: "linear-gradient(135deg,#22c55e,#0ea5e9)",
          color: "white",
          fontWeight: 700
        }}>Savings insight</Link>
      </div>

      {/* Transaction history */}
      <HistoryCard latest={null} />

      {/* Investments */}
      <div style={{ padding: "18px 16px 0 16px" }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Investments</h3>
        <div
          style={{
            marginTop: 12,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #2a2f37"
          }}
        >
          <div style={{ backgroundColor: "#fda4af", height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 140,
                height: 100,
                borderRadius: 16,
                backgroundColor: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#374151",
                fontWeight: 800
              }}
            >
              SAFE
            </div>
          </div>
          <div style={{ backgroundColor: "#0f1115", padding: 12, color: "#cbd5e1", fontSize: 14 }}>
            Make your money work and earn more! Open a
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      {/* Bottom nav moved to global layout */}
    </div>
  );
}
