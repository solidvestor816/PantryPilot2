"use client";

import Link from "next/link";
import { usePlanContext } from "../providers";

export default function GroceryListPage() {
  const { groceryByAisle } = usePlanContext();

  return (
    <main
      style={{
        padding: "40px 32px",
        maxWidth: "920px",
        margin: "0 auto",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <section
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 18px 50px rgba(24, 60, 43, 0.08)",
        }}
      >
        <p
          style={{
            color: "#5f7d68",
            fontWeight: 700,
            letterSpacing: "0.08em",
            marginBottom: "14px",
          }}
        >
          GROCERY LIST
        </p>
        <h1 style={{ margin: "0 0 16px 0", color: "#183c2b" }}>
          One consolidated grocery list
        </h1>
        <p style={{ color: "#5f7d68", lineHeight: 1.7, marginBottom: "28px" }}>
          Items are grouped by aisle and kept in sync with the current dinner
          plan.
        </p>

        <div style={{ display: "grid", gap: "24px" }}>
          {groceryByAisle.map((group) => (
            <div key={group.aisle}>
              <h2 style={{ marginBottom: "12px", color: "#183c2b" }}>
                {group.aisle}
              </h2>
              <ul style={{ margin: 0, paddingLeft: "18px", color: "#5f7d68" }}>
                {group.items.map((item) => (
                  <li key={`${group.aisle}-${item.name}`}>
                    {item.name} — {item.amount}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "34px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <Link
            href="/dinner-plan"
            style={{
              background: "#183c2b",
              color: "#fff",
              borderRadius: "999px",
              padding: "12px 18px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Edit plan
          </Link>
          <Link
            href="/review"
            style={{
              background: "#5f7d68",
              color: "#fff",
              borderRadius: "999px",
              padding: "12px 18px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Back to review
          </Link>
        </div>
      </section>
    </main>
  );
}
