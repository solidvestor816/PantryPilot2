"use client";

import Link from "next/link";
import { usePlanContext } from "../providers";

export default function DinnerPlanPage() {
  const { dinners, availableDinners, replaceDinner } = usePlanContext();

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
          DINNER PLAN
        </p>
        <h1 style={{ margin: "0 0 16px 0", color: "#183c2b" }}>
          Editable 3-dinner plan
        </h1>
        <p style={{ color: "#5f7d68", lineHeight: 1.7, marginBottom: "28px" }}>
          Swap one dinner and the review and grocery list update automatically.
        </p>

        <div style={{ display: "grid", gap: "22px" }}>
          {dinners.map((dinner, index) => (
            <div
              key={dinner.id}
              style={{
                borderRadius: "18px",
                padding: "24px",
                background: "#f0f6ec",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2 style={{ margin: "0 0 10px 0" }}>{dinner.name}</h2>
                  <p style={{ margin: 0, color: "#5f7d68" }}>
                    {dinner.description}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {dinner.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "999px",
                        background: "#e7efe5",
                        color: "#183c2b",
                        fontSize: "0.85rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <label
                style={{
                  display: "block",
                  marginTop: "18px",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                Replace this dinner
              </label>
              <select
                value={dinner.id}
                onChange={(event) => replaceDinner(index, event.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid #d5d1c4",
                  background: "#fff",
                }}
              >
                {availableDinners.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
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
            href="/review"
            style={{
              background: "#183c2b",
              color: "#fff",
              borderRadius: "999px",
              padding: "12px 18px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            View review
          </Link>
          <Link
            href="/grocery-list"
            style={{
              background: "#5f7d68",
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
