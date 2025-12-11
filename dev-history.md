# Development History

This document logs the development process, AI prompts used, and manual changes per commit.

## Initial Setup

### Commit: feat: initial project setup with LangGraph TypeScript

**AI Prompt Used:**
- "Set up a TypeScript LangGraph project using pnpm with @langchain/langgraph dependency"

**Changes Made:**
- Created `package.json` with pnpm as package manager
- Added TypeScript dependencies (@types/node, ts-node, typescript)
- Added @langchain/langgraph dependency
- Created `tsconfig.json` with proper TypeScript configuration
- Set up build and start scripts

## Core Implementation

### Commit: feat: implement greeting node with state schema

**AI Prompt Used:**
- "Implement a LangGraph agent that accepts a name and returns a greeting. No LLM needed. Use proper START → node → END structure."

**Manual Changes:**
- Created `src/index.ts` with:
  - State schema using `Annotation.Root()` with `name` (string) and `greeting` (string) fields
  - `greetingNode` function that takes name from state and generates greeting
  - Graph builder function that creates START → greet → END flow using method chaining
  - Main entry point that invokes the graph

**Key Implementation Details:**
- Used `Annotation.Root()` to define state schema (required by LangGraph TypeScript API)
- Used `StateGraph(StateAnnotation)` constructor (not generic type parameter)
- Node function returns `typeof StateAnnotation.Update` for proper typing
- Graph edges use `START` and `END` constants imported from @langchain/langgraph
- Method chaining required for TypeScript to properly infer node types
- State merging is handled automatically by LangGraph

## Documentation

### Commit: docs: add README and dev-history

**Manual Changes:**
- Created `README.md` with:
  - Project overview
  - Setup instructions
  - Running instructions
  - Project structure
  - Example usage
- Created `dev-history.md` (this file) to document the development process

## Configuration

### Commit: chore: add .gitignore

**Manual Changes:**
- Created `.gitignore` to exclude:
  - node_modules and pnpm-store
  - Build output (dist/)
  - Environment files (.env*)
  - IDE and OS files
  - Logs and test coverage

## Testing

### Commit: test: add unit test for greeting output

**AI Prompt Used:**
- "Add a unit test using a testing framework that verifies the greeting output contains the input name"

**Manual Changes:**
- Added vitest as test dependency
- Created `vitest.config.ts` for test configuration
- Created `src/index.test.ts` with three test cases:
  1. Verifies greeting contains input name
  2. Tests with different names
  3. Validates greeting format matches expected pattern
- All tests pass successfully

## Research Notes

### LangGraph TypeScript API
- `Annotation.Root()` must be used to define state schema (not plain TypeScript types)
- `StateGraph(StateAnnotation)` constructor takes the annotation, not a generic type
- Nodes are added with `graph.addNode(name, function)`
- Edges use `START` and `END` constants (not string literals)
- Method chaining is required for TypeScript to properly infer node types
- State is passed between nodes and merged automatically
- Node functions receive full state and return `typeof StateAnnotation.Update`

### Key Learning Points
- LangGraph TypeScript API requires `Annotation` API for state definition
- Method chaining (`graph.addNode().addEdge().compile()`) is necessary for type inference
- LangGraph handles state merging automatically - nodes only need to return fields they update
- The graph structure is defined imperatively with addNode/addEdge calls
- No LLM is needed for simple state transformations
- TypeScript types provide good type safety when using Annotation API correctly

## Bonus Criteria Implementation

### Commit: feat: complete bonus criteria

**Changes Made:**
- Added `mcp.json` for LangGraph MCP server configuration
- Integrated LangSmith for graph visualization and tracing
- Added `langsmith-graph.png` screenshot to README
- All bonus criteria from PDF requirements completed

**Bonus Criteria Completed:**
- ✅ Unit test that verifies greeting output (3 tests, all passing)
- ✅ LangGraph MCP server configuration (mcp.json in repo)
- ✅ LangSmith account setup with graph visualization
- ✅ Screenshot added to README

## Future Improvements (if time permits)

- [ ] Add more comprehensive test coverage
- [ ] Add error handling for edge cases
- [ ] Support for optional name with default value
- [ ] Add CLI interface for custom names
