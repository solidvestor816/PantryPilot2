import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        background: "#f6f1e7",
        color: "#183c2b",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <p
        style={{
          color: "#5f7d68",
          fontWeight: 700,
          letterSpacing: "0.08em",
          marginBottom: "16px",
        }}
      >
        PANTRYPILOT
      </p>
      <h1
        style={{
          maxWidth: "760px",
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          lineHeight: 1.05,
          margin: "24px 0",
        }}
      >
        Plan meals around what your household can actually eat.
      </h1>
      <p
        style={{
          maxWidth: "620px",
          fontSize: "1.2rem",
          lineHeight: 1.6,
          marginBottom: "32px",
        }}
      >
        PantryPilot helps families plan restriction-aware meals, understand what
        needs review, swap a single dinner, and shop from one organized list.
      </p>
      <Link
        href="/household"
        style={{
          display: "inline-flex",
          borderRadius: "999px",
          padding: "14px 22px",
          background: "#183c2b",
          color: "#fff",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Start household beta
      </Link>
    </main>
  );
}
