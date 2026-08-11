"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Ingredient = {
  name: string;
  aisle: string;
  amount: string;
};

export type Dinner = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  vegetarian: boolean;
  ingredients: Ingredient[];
};

export type MealReview = {
  dinner: Dinner;
  status: "Fits" | "Needs review" | "Does not fit";
  reason: string;
};

type PlanContextValue = {
  members: string[];
  restrictions: string[];
  dinners: Dinner[];
  availableDinners: Dinner[];
  reviewItems: MealReview[];
  groceryByAisle: { aisle: string; items: Ingredient[] }[];
  updateMember: (index: number, value: string) => void;
  addMember: () => void;
  toggleRestriction: (restriction: string) => void;
  replaceDinner: (index: number, dinnerId: string) => void;
};

const sampleDinners: Dinner[] = [
  {
    id: "sriracha-chicken-bowls",
    name: "Sriracha chicken bowls",
    description: "Rice bowls with chicken, beans, and fresh toppings.",
    tags: ["gluten", "dairy"],
    vegetarian: false,
    ingredients: [
      { name: "Chicken thighs", aisle: "Meat", amount: "1 lb" },
      { name: "Brown rice", aisle: "Pantry", amount: "2 cups" },
      { name: "Corn tortillas", aisle: "Bakery", amount: "8" },
      { name: "Avocado", aisle: "Produce", amount: "1" },
      { name: "Sour cream", aisle: "Dairy", amount: "1/2 cup" },
    ],
  },
  {
    id: "lentil-stew",
    name: "Savory lentil stew",
    description: "Hearty stew with lentils, carrots, and warm spices.",
    tags: ["vegetarian", "gluten-free"],
    vegetarian: true,
    ingredients: [
      { name: "Brown lentils", aisle: "Pantry", amount: "1 cup" },
      { name: "Carrots", aisle: "Produce", amount: "3" },
      { name: "Vegetable broth", aisle: "Pantry", amount: "4 cups" },
      { name: "Onion", aisle: "Produce", amount: "1" },
      { name: "Garlic", aisle: "Produce", amount: "2 cloves" },
    ],
  },
  {
    id: "sheet-pan-fajita-night",
    name: "Sheet-pan fajita night",
    description: "Peppers, onions, and chicken baked for fast family dinner.",
    tags: ["gluten", "dairy"],
    vegetarian: false,
    ingredients: [
      { name: "Chicken breasts", aisle: "Meat", amount: "1.25 lbs" },
      { name: "Bell peppers", aisle: "Produce", amount: "3" },
      { name: "Onion", aisle: "Produce", amount: "1" },
      { name: "Fajita seasoning", aisle: "Spices", amount: "1 packet" },
      { name: "Tortillas", aisle: "Bakery", amount: "8" },
    ],
  },
  {
    id: "thai-peanut-noodle-bowl",
    name: "Thai peanut noodle bowls",
    description: "Noodles tossed with crisp veggies and peanut sauce.",
    tags: ["peanuts", "gluten", "dairy-free"],
    vegetarian: true,
    ingredients: [
      { name: "Rice noodles", aisle: "Pantry", amount: "8 oz" },
      { name: "Peanut butter", aisle: "Pantry", amount: "1/4 cup" },
      { name: "Broccoli", aisle: "Produce", amount: "2 cups" },
      { name: "Snow peas", aisle: "Produce", amount: "1 cup" },
      { name: "Soy sauce", aisle: "Pantry", amount: "3 tbsp" },
    ],
  },
  {
    id: "roasted-salmon-with-slaw",
    name: "Roasted salmon with slaw",
    description: "Simple oven-roasted salmon with crunchy cabbage slaw.",
    tags: ["gluten-free", "dairy"],
    vegetarian: false,
    ingredients: [
      { name: "Salmon fillets", aisle: "Seafood", amount: "1 lb" },
      { name: "Cabbage", aisle: "Produce", amount: "1/2 head" },
      { name: "Carrots", aisle: "Produce", amount: "2" },
      { name: "Greek yogurt", aisle: "Dairy", amount: "1/2 cup" },
      { name: "Lime", aisle: "Produce", amount: "1" },
    ],
  },
];

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function usePlanContext(): PlanContextValue {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within Providers");
  }
  return context;
}

function evaluateDinner(dinner: Dinner, restrictions: string[]): MealReview {
  const issues: string[] = [];

  if (restrictions.includes("Vegetarian") && !dinner.vegetarian) {
    return {
      dinner,
      status: "Does not fit",
      reason: "This meal is not vegetarian.",
    };
  }

  if (restrictions.includes("Peanuts") && dinner.tags.includes("peanuts")) {
    issues.push("contains peanuts");
  }
  if (restrictions.includes("Dairy") && dinner.tags.includes("dairy")) {
    issues.push("relies on dairy");
  }
  if (restrictions.includes("Gluten") && dinner.tags.includes("gluten")) {
    issues.push("contains gluten");
  }

  if (issues.length > 0) {
    return {
      dinner,
      status: "Needs review",
      reason: `This meal ${issues.join(" and ")} and should be checked for substitutions.`,
    };
  }

  return {
    dinner,
    status: "Fits",
    reason: "This meal aligns with the current household restrictions.",
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState(["Ava", "Leo"]);
  const [restrictions, setRestrictions] = useState(["Dairy", "Gluten"]);
  const [dinners, setDinners] = useState<Dinner[]>([
    sampleDinners[0],
    sampleDinners[2],
    sampleDinners[4],
  ]);

  const reviewItems = useMemo(
    () => dinners.map((dinner) => evaluateDinner(dinner, restrictions)),
    [dinners, restrictions]
  );

  const groceryByAisle = useMemo(() => {
    const aisleMap: Record<string, Record<string, Ingredient>> = {};

    dinners.forEach((dinner) => {
      dinner.ingredients.forEach((ingredient) => {
        aisleMap[ingredient.aisle] ??= {};
        const existing = aisleMap[ingredient.aisle][ingredient.name];
        if (!existing) {
          aisleMap[ingredient.aisle][ingredient.name] = { ...ingredient };
        } else if (existing.amount !== ingredient.amount) {
          existing.amount = `${existing.amount} + ${ingredient.amount}`;
        }
      });
    });

    return Object.entries(aisleMap).map(([aisle, items]) => ({
      aisle,
      items: Object.values(items),
    }));
  }, [dinners]);

  const updateMember = (index: number, value: string) => {
    setMembers((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const addMember = () => {
    setMembers((current) => [...current, "New member"]);
  };

  const toggleRestriction = (restriction: string) => {
    setRestrictions((current) =>
      current.includes(restriction)
        ? current.filter((item) => item !== restriction)
        : [...current, restriction]
    );
  };

  const replaceDinner = (index: number, dinnerId: string) => {
    const replacement = sampleDinners.find((dinner) => dinner.id === dinnerId);
    if (!replacement) return;
    setDinners((current) => {
      const next = [...current];
      next[index] = replacement;
      return next;
    });
  };

  return (
    <PlanContext.Provider
      value={{
        members,
        restrictions,
        dinners,
        availableDinners: sampleDinners,
        reviewItems,
        groceryByAisle,
        updateMember,
        addMember,
        toggleRestriction,
        replaceDinner,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}
