"use client";

import Link from "next/link";
import { usePlanContext } from "../providers";

export default function ReviewPage() {
  const { reviewItems } = usePlanContext();

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
          REVIEW
        </p>
        <h1 style={{ margin: "0 0 16px 0", color: "#183c2b" }}>
          Dinner fit status and why
        </h1>
        <p style={{ color: "#5f7d68", lineHeight: 1.7, marginBottom: "28px" }}>
          Each dinner is marked Fits, Needs review, or Does not fit with a
          plain-English explanation.
        </p>

        <div style={{ display: "grid", gap: "20px" }}>
          {reviewItems.map((item) => (
            <div
              key={item.dinner.id}
              style={{
                padding: "24px",
                borderRadius: "18px",
                background: item.status === "Fits" ? "#eef5eb" : "#fff6ef",
                border:
                  item.status === "Fits"
                    ? "1px solid #d5e7d1"
                    : "1px solid #f1d6b4",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <h2 style={{ margin: 0 }}>{item.dinner.name}</h2>
                <span
                  style={{
                    color: "#183c2b",
                    fontWeight: 700,
                    background: item.status === "Fits" ? "#dff2dd" : "#fbe7da",
                    borderRadius: "999px",
                    padding: "8px 14px",
                  }}
                >
                  {item.status}
                </span>
              </div>
              <p style={{ marginTop: "14px", color: "#5f7d68" }}>
                {item.reason}
              </p>
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
              background: "#5f7d68",
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
            href="/grocery-list"
            style={{
              background: "#183c2b",
              color: "#fff",
              borderRadius: "999px",
              padding: "12px 18px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            View grocery list
          </Link>
        </div>
      </section>
    </main>
  );
}
