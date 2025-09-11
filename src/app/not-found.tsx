// import React from "react";
// import Link from "next/link";
// import { Button } from "../components/ui/button";

// export default function NotFound() {
//   return (
//     <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "2rem" }}>
//       <div>
//         <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>404</h1>
//         <p style={{ fontSize: "1.25rem", color: "#888" }}>Page Not Found</p>
//       </div>
//       <Link href="/">
//         <Button>Go Home</Button>
//       </Link>
//     </div>
//   );
// }

import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div
      suppressHydrationWarning
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "2rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>404</h1>
        <p style={{ fontSize: "1.25rem", color: "#888" }}>Page Not Found</p>
      </div>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
