import { describe, it, expect } from "vitest";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";

// State schema (same as in index.ts)
const StateAnnotation = Annotation.Root({
  name: Annotation<string>(),
  greeting: Annotation<string>(),
});

type State = typeof StateAnnotation.State;

// Greeting node function (same as in index.ts)
function greetingNode(state: State): typeof StateAnnotation.Update {
  const name = state.name ?? "Guest";
  const greeting = `Hello, ${name}! Welcome!`;
  return { greeting };
}

// Build graph function (same as in index.ts)
function buildApp() {
  return new StateGraph(StateAnnotation)
    .addNode("greet", greetingNode)
    .addEdge(START, "greet")
    .addEdge("greet", END)
    .compile();
}

describe("Greeting Agent", () => {
  it("should return a greeting containing the input name", async () => {
    const app = buildApp();
    const result = await app.invoke({ name: "Alice", greeting: "" });

    expect(result).toHaveProperty("name", "Alice");
    expect(result).toHaveProperty("greeting");
    expect(result.greeting).toContain("Alice");
    expect(result.greeting).toBe("Hello, Alice! Welcome!");
  });

  it("should handle different names", async () => {
    const app = buildApp();
    const result = await app.invoke({ name: "Bob", greeting: "" });

    expect(result.greeting).toContain("Bob");
    expect(result.greeting).toBe("Hello, Bob! Welcome!");
  });

  it("should return greeting in the expected format", async () => {
    const app = buildApp();
    const result = await app.invoke({ name: "Charlie", greeting: "" });

    expect(result.greeting).toMatch(/^Hello, .+! Welcome!$/);
  });
});

