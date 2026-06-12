## digital-property-passport

Real Estate Digital Passport Platform frontend application built with React, TypeScript, and Vite.

The project is built using a scalable architecture focused on maintainability, separation of concerns, type safety, and testability.

---

## Overview

REDPP is a modern frontend application that follows a layered architecture where business logic, API communication, UI components, schemas, DTOs, and application services are strictly separated into dedicated modules.

### Key Goals
- **Scalability:** Easy to add new features without breaking existing logic.
- **Maintainability:** Clear separation of concerns makes debugging straightforward.
- **Type Safety:** Comprehensive TypeScript integration and runtime validation.
- **Developer Experience:** Out-of-the-box mock API environment for parallel development.

---

## Tech Stack

### Core
- **React 18** & **TypeScript**
- **Vite** (Build tool)

### State Management & Data Fetching
- **React Query (TanStack Query):** Server state management and caching.
- **Context API / Custom Store:** Global client-side state management.

### Forms & Validation
- **React Hook Form:** High-performance, extensible forms.
- **Zod:** Schema declaration and runtime validation.

### API Layer
- **Axios:** HTTP client with custom interceptors.
- **Repository Pattern:** Abstracted data access layer.

### Development & Tooling
- **MSW (Mock Service Worker):** API mocking for local development.
- **ESLint & Prettier:** Code quality and formatting.

---

## Architecture & Project Structure

The application is organized using a modular architecture inspired by **Clean Architecture**, **Feature-Based Design**, and the **Repository/Service Pattern**.

```text
src
│
├── app                     # Core Application Layer
│   ├── api                 # Axios client, interceptors, and base configuration
│   ├── entities            # Core domain entities/models
│   ├── helpers             # Shared stateless helper functions
│   ├── hooks               # Custom hooks for global/reusable logic
│   ├── lib                 # Third-party library initializations
│   ├── migration           # Data migration utilities
│   ├── repositories        # Data access layer (handles raw API requests)
│   ├── routes              # React Router configuration and route guards
│   ├── services            # Business logic layer (orchestrates repositories)
│   ├── store               # Global UI state management
│   └── utils               # Low-level application utilities
│
├── data                    # Data & Definition Layer
│   ├── assets              # Static resources (images, icons, etc.)
│   ├── dto                 # Request/Response Data Transfer Objects
│   ├── dso                 # Data Service Objects
│   ├── enum                # Global enumerations
│   ├── mocks               # Mock data blueprints
│   ├── model               # Frontend data models
│   ├── schemas             # Zod validation schemas
│   ├── translates          # Localization / i18n resources
│   └── types               # Shared global TypeScript types
│
├── mocks                   # MSW Mocking Environment
│   ├── browser.ts          # Worker setup for browser interception
│   └── handlers.ts         # Mock API endpoints and responses
│
└── ui                      # Presentation Layer (UI)
    ├── components          # Atom/Molecule reusable UI components (Buttons, Inputs)
    ├── containers          # Smart components with container-component pattern
    ├── features            # Feature-specific modules (Passport Management, Analytics)
    ├── layout              # App layouts (Sidebar, Header, AuthLayout)
    ├── pages               # Page components mapped directly to routes
    └── shared              # UI-specific utilities and styles
