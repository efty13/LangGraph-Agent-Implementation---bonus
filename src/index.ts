import { StateGraph, Annotation, START, END } from "@langchain/langgraph";

// ---------- State Schema ----------
const StateAnnotation = Annotation.Root({
  name: Annotation<string>(),
  greeting: Annotation<string>(),
});

type State = typeof StateAnnotation.State;

// ---------- Node Function ----------
function greetingNode(state: State): typeof StateAnnotation.Update {
  const name = state.name ?? "Guest";
  const greeting = `Hello, ${name}! Welcome!`;

  console.log("[greet node] input:", state);
  console.log("[greet node] output:", { greeting });

  return { greeting };
}

// ---------- Build Graph ----------
function buildApp() {
  return new StateGraph(StateAnnotation)
    .addNode("greet", greetingNode)
    .addEdge(START, "greet")
    .addEdge("greet", END)
    .compile();
}

// ---------- Entry Point ----------
async function main() {
  console.log("[main] building graph...");
  const app = buildApp();

  console.log("[main] invoking graph...");
  const result = await app.invoke({ name: "Eftal", greeting: "" });

  console.log("[main] final result:", result);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});

