"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const items = [
    { label: "Home", href: "/home" },
    { label: "Products", href: "/products" },
    { label: "Payments", href: "/payments" },
    { label: "Transfers", href: "/transfers" },
    { label: "Finances", href: "/finances" }
  ];

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 64,
        backgroundColor: "#0b0d11",
        borderTop: "1px solid #1f2430",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 30
      }}
    >
      {items.map(item => {
        const active = pathname?.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: active ? "#ef4444" : "#1f2937" }} />
              <span style={{ fontSize: 11, color: active ? "#f3f4f6" : "#94a3b8" }}>{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}


