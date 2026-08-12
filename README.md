# 🍔 Menu- - AI Culinary & Menu Intelligence Engine

[![CI/CD Pipeline](https://github.com/Avinashb722/Menu-/actions/workflows/ci.yml/badge.svg)](https://github.com/Avinashb722/Menu-/actions)
[![Powered by Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%202.5-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Menu-** is a smart digital restaurant and culinary management platform powered by Google Gemini 2.5 Flash (`@google/genai`). Designed for restaurateurs and chefs, Menu- automates ingredient nutritional analysis, pricing optimization, allergen tagging, and AI-assisted menu creation.

---

## 🏗 System Architecture

```mermaid
graph TD
    User([Restaurant Portal - React UI]) -->|HTTPS Requests| API[Express API Server]
    API -->|CORS & Security| Middleware[Rate Limiting & Security Headers]
    Middleware -->|Endpoint Router| Handlers{Menu Controllers}
    Handlers -->|Nutritional Analysis| GeminiSDK[@google/genai SDK]
    Handlers -->|Pricing Optimization| GeminiSDK
    GeminiSDK -->|API Request| GeminiAPI[Google Gemini 2.5 Flash API]
    
    GeminiAPI -->|Caloric & Macro Breakdown| GeminiSDK
    GeminiSDK -->|JSON Insights| Handlers
    Handlers -->|Structured API Response| User

    subgraph Resilience Layer
        API -.->|Missing Key / Failover| Fallback[Local Fallback Engine]
        Fallback -.->|Mock Nutritional Data| User
    end
```

---

## ⚡ Key Features

- 🧠 **Google Gemini 2.5 Flash Integration**: Real-time culinary reasoning and macro estimation using `@google/genai`.
- 🥗 **Nutritional & Allergen Analysis**: Parse ingredient lists to produce caloric estimates, macro splits, and allergen flags.
- 💡 **Menu Pricing Optimization**: AI recommendations for item naming, descriptions, and dynamic pricing strategies.
- 🔒 **Security Hardened**: Configured CORS, rate-limiting headers (`X-RateLimit-*`), and fallback resiliency.
- 🧪 **Integration Test Suite**: Vitest and Supertest coverage validating API resilience and error handling.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 🚀 Quick Setup & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Avinashb722/Menu-.git
   cd Menu-
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY into .env
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Server running at `http://localhost:3000`.

---

## 📡 API Reference

### Health Check
- **GET** `/api/health`
- **Response**:
  ```json
  {
    "status": "ok",
    "service": "menu-ai-api",
    "timestamp": "2026-08-12T12:00:00Z",
    "version": "1.0.0",
    "geminiConfigured": true
  }
  ```

### Ask Gemini AI Agent
- **POST** `/api/gemini/ask`
- **Body**:
  ```json
  {
    "prompt": "Create a 3-course Mediterranean summer menu concept.",
    "model": "gemini-2.5-flash"
  }
  ```

### Nutritional & Allergen Analysis
- **POST** `/api/menu/analyze`
- **Body**:
  ```json
  {
    "ingredients": "Grilled salmon, quinoa, avocado, lemon tahini dressing"
  }
  ```

### Menu Item Optimization
- **POST** `/api/menu/optimize`
- **Body**:
  ```json
  {
    "itemDetails": {
      "name": "Salmon Salad",
      "costToMake": 5.50
    }
  }
  ```

---

## 🧪 Testing Guide

Run the Vitest integration suite:

```bash
# Execute unit & integration tests
npm test

# Run linter
npm run lint
```

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
