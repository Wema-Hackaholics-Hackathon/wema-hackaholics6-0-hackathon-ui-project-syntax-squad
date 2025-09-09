"use client";
import { motion } from "framer-motion";

export default function QuickActions() {
  const items = [
    { label: "Fund account", color: "#ea580c" },
    { label: "Transfer", color: "#ea580c" },
    { label: "FX Swap", color: "#ea580c" }
  ];

  return (
    <div style={{ padding: "8px 12px 4px 12px", display: "flex", gap: 10, overflowX: "auto" }}>
      {items.map((item, idx) => (
        <motion.button
          key={idx}
          whileTap={{ scale: 0.98 }}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderRadius: 22,
            border: "1px solid #3f2a21",
            backgroundColor: "#1e1410",
            color: item.color,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          <span style={{ width: 20, height: 20, borderRadius: 999, backgroundColor: item.color, display: "inline-block" }} />
          {item.label}
        </motion.button>
      ))}
    </div>
  );
}


