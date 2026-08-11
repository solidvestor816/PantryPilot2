"use client";

import Link from "next/link";
import { usePlanContext } from "../providers";

export default function HouseholdPage() {
  const { members, restrictions, updateMember, addMember, toggleRestriction } =
    usePlanContext();

  const restrictionOptions = ["Gluten", "Dairy", "Peanuts", "Vegetarian"];

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
          HOUSEHOLD
        </p>
        <h1 style={{ margin: "0 0 16px 0", color: "#183c2b" }}>
          Who’s eating and what should be checked
        </h1>
        <p style={{ color: "#5f7d68", lineHeight: 1.7, marginBottom: "28px" }}>
          Update household members and dietary notes so the plan can highlight
          what fits and what needs review.
        </p>

        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ marginBottom: "12px", color: "#183c2b" }}>
            Household members
          </h2>
          {members.map((member, index) => (
            <label
              key={`${member}-${index}`}
              style={{
                display: "block",
                marginBottom: "14px",
                fontSize: "1rem",
              }}
            >
              <span style={{ display: "block", marginBottom: "8px" }}>
                Member {index + 1}
              </span>
              <input
                value={member}
                onChange={(event) => updateMember(index, event.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid #d5d1c4",
                  fontSize: "1rem",
                }}
              />
            </label>
          ))}
          <button
            type="button"
            onClick={addMember}
            style={{
              marginTop: "6px",
              border: "0",
              borderRadius: "999px",
              padding: "12px 18px",
              background: "#5f7d68",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Add household member
          </button>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ marginBottom: "12px", color: "#183c2b" }}>
            Dietary restrictions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
            }}
          >
            {restrictionOptions.map((restriction) => (
              <label
                key={restriction}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  background: "#eef5eb",
                }}
              >
                <input
                  type="checkbox"
                  checked={restrictions.includes(restriction)}
                  onChange={() => toggleRestriction(restriction)}
                />
                <span>{restriction}</span>
              </label>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "28px",
            padding: "18px",
            borderRadius: "16px",
            background: "#f0f6ec",
            color: "#5f7d68",
          }}
        >
          Note: this planner uses “Needs review” rather than saying food is
          safe or allergy-free.
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
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
            Go to dinner plan
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
            Go to review
          </Link>
        </div>
      </section>
    </main>
  );
}
