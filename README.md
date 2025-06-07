# 🖥️ Leetlab-Platform
![Status](https://img.shields.io/badge/status-development%20ongoing-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blueviolet)

## 🧩 Introduction
**Leetlab-UI** is the frontend client for a platform similar to Leetcode that allows users to solve traditional **DSA problems** and **API-building challenges** through an intuitive, real-time coding environment. This project is built using **React**, **TypeScript**, and **Vite**, providing high performance, modularity, and fast development experience.

It integrates with backend services like `problems-svc`, `accounts-svc`, `submission-svc` and the **Judge0** execution engine, providing seamless problem browsing, code editing, code execution, and solution tracking features.

## 📌 Project Status

> **🚧 Development Status: Ongoing**
The frontend is currently under active development. Key features like the problem detail page, code editor, submission handler, and result viewer are in progress.

### ✅ Completed Milestones

- Project scaffolding using Vite + React + TypeScript
- Page routing with React Router
- CodeMirror editor integration
- Submission request structure defined
- Judge0 response handler integration (basic)

## 🚀 Features

### 💻 Coding Interface

- **Real-time Code Editor**  
  Powered by CodeMirror, supports syntax highlighting for multiple languages.

- **Language Selector**  
  Dynamically fetch and display supported programming languages per problem.

- **Input/Output Terminal**  
  Interface to simulate standard input and display outputs/errors post submission.

- **Code Snippet Auto-Fill**  
  Fetch starter code for selected language tied to the problem.

### 📑 Problem Navigation
- **Problem Listing**  
  Browse categorized problems with metadata (difficulty, tags, type).

- **Problem Details**  
  View full problem statement, input/output format, constraints, and examples.

- **Sheet & Playlist Views**  
  Navigate problems grouped by sheet type (e.g., DSA, API Challenges).

### 📤 Submission Handling

- **Execute Code (DSA)**  
  Submits user code with test cases to Judge0 and polls for the result.

- **Run API Code (API Challenges)**  
  Triggers backend orchestrator to spin a Docker container and test API logic.

- **Result Viewer**  
  Displays status (success/failure), stdout, stderr, execution time, and memory usage.

### 🔐 Authentication

- **Login via OAuth**  
  Integration planned with GitHub/Google using OpenID Connect.

- **Token Handling**  
  Stores and attaches JWT to every API request after login.

### 🌐 Integration Highlights

- **Judge0 Integration**  
  Token-based async submission + polling workflow.

- **Problems-svc Integration**  
  Dynamic fetching of problem data, tags, supported languages, and sheets.

- **Accounts-svc Integration**  
  Handles user profile, roles, and token refresh.

## 🛠️ Setup Instructions

### 🚀 Local Setup

```bash
# Clone the repository
git clone https://github.com/Ayushya100/leetlab-ui.git
cd leetlab-ui

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure variables in .env file

# Run the development server
npm run dev