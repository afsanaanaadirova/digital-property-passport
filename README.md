<<<<<<< HEAD
# Digital Property Passport

A web application for managing digital property passports. The system allows authorized users to create, view, update, and confirm property passports — including owner information, location data, property classifications, file attachments, and signatory details.

> **Internal use only.** This project runs with mock data (MSW) and does not require a live backend to function in development.

---

## Tech Stack

| Category | Library |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Data fetching | TanStack Query (React Query) |
| State management | Redux Toolkit |
| Routing | React Router v6 |
| Maps | Google Maps (`@vis.gl/react-google-maps`) |
| Mocking | MSW (Mock Service Worker) |
| Validation schemas | Zod |

---

## Project Structure

```
src/
├── app/
│   ├── api/              # React Query hooks (useCreatePassport, useGetPassportById, ...)
│   ├── migration/        # DTO → Model → DSO transformations
│   ├── repositories/     # Repository pattern — abstracts API calls
│   ├── routes/           # Route definitions and auth guard
│   ├── services/         # Raw axios service calls
│   └── store/            # Redux store
│
├── data/
│   ├── dto/              # API response types (validated with Zod schemas)
│   ├── dso/              # API request types (sent to backend)
│   ├── model/            # Internal app models (PassportModel, PassportFormModel, ...)
│   ├── schemas/          # Zod schemas — both form validation and DTO validation
│   └── enum/             # Enums (snackbar status, revalidate tags, ...)
│
├── mocks/
│   └── handlers.ts       # MSW handlers — all API endpoints mocked here
│
└── ui/
    ├── containers/       # Page-level smart components with VMs
    ├── features/         # Feature-level form sections (ObjectPlaceInfoForm, ...)
    ├── pages/            # Route-level page wrappers
    ├── shared/           # Reusable UI components (Input, Select, Radio, Map, ...)
    └── layout/           # App shell (MainLayout, Sidebar, Header)
```

### Architecture pattern

The project follows a layered data flow:

```
API Response (DTO)
    ↓  Zod validation
Migration (migrateToModel)
    ↓
App Model (PassportModel)
    ↓
React Hook Form (PassportFormModel)
    ↓
Migration (migrateToDSO)
    ↓
API Request (DSO)
```

Each layer has its own type so that form logic, API logic, and display logic stay independent.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repo-url>
cd digital-property-passport
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_MAP_KEY=your_google_maps_api_key
VITE_API_BASE_URL=https://your-backend-url.com
```

> If you don't have a Google Maps API key, the map component will not render but the rest of the app works fine.

### Running in Development (with mock data)

```bash
npm run dev
```

MSW intercepts all API requests automatically — no backend needed. Mock data is defined in [`src/mocks/handlers.ts`](src/mocks/handlers.ts).

**Demo login credentials (mocked):**
- Email: `demo@test.com`
- Password: any value

### Building for Production

```bash
npm run build
```

> Production builds do **not** include MSW. Make sure `VITE_API_BASE_URL` points to a real backend.

---

## Features

### Passport Management
- **List** — paginated table of all property passports with filtering
- **Create** — multi-section form with draft save and confirmation flow
- **Update** — edit an existing passport, re-save as draft or confirm
- **View** — read-only detail view with step-by-step sections
- **Delete** — remove a passport

### Passport Form Sections
| Section | Fields |
|---|---|
| General | Passport number, issue date |
| Location | Address, area (zone), Google Maps pin |
| Designation | Property destination type |
| Cultural monument | Is cultural monument, monument type |
| Property type | Land property type, building property type |
| Law type | Land ownership type, building ownership type |
| Owner(s) | Multiple owners — individual (FIN, fullname) or corporate (VÖEN, company name), contact number |
| Measurements | Floors, land area, building area, residential/non-residential area, room count |
| Pricing | Estimated sale prices (land, building, total) |
| Residents | Resident count, registered resident count |
| Transaction | Purchase and sale protocol type |
| Attachments | File uploads grouped by file type (PDF, Word, Excel, Image) |
| Signatories | 4 representative signatures |
| Note | Free text note |

### Two-step Submit Flow
1. **Save as draft** — saves the passport without confirming it
2. **Confirm** — confirms the draft; only available when form is clean (no unsaved changes)

---

## Mocked API Endpoints

All endpoints are intercepted by MSW in development:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/User/Login` | Returns a mock JWT token |
| `GET` | `/Passport/GetAll` | Returns paginated passport list |
| `GET` | `/Passport/GetById` | Returns passport detail by id |
| `POST` | `/Passport/Create` | Creates a new passport |
| `PUT` | `/Passport/Update` | Updates an existing passport |
| `DELETE` | `/Passport/Delete` | Deletes a passport |
| `POST` | `/Passport/Confirm` | Confirms a draft passport |
| `GET` | `/DropDown/Destinations` | Property destination types |
| `GET` | `/DropDown/Areas` | Area/zone list |
| `GET` | `/DropDown/OwnerTypes` | Owner types (individual/corporate) |
| `GET` | `/DropDown/BuildingPropertyTypes` | Building property types |
| `GET` | `/DropDown/BuildingOwnershipTypes` | Building ownership types |
| `GET` | `/DropDown/LandPropertyTypes` | Land property types |
| `GET` | `/DropDown/LandOwnershipTypes` | Land ownership types |
| `GET` | `/DropDown/SaleTransactionTypes` | Sale transaction types |
| `GET` | `/DropDown/PassportFileTypes` | File type categories for attachments |
| `GET` | `/DropDown/CulturalMonuments` | Cultural monument list |

To add or modify mock responses, edit [`src/mocks/handlers.ts`](src/mocks/handlers.ts).

---

## Key Conventions

### ViewModel pattern
Each container has a co-located `*.vm.ts` file that holds all state and logic. The component file (`index.tsx`) only handles rendering.

```
containers/CreatePassport/
├── index.tsx               ← rendering only
├── create_passport.vm.ts   ← all state, hooks, handlers
└── create_passport.type.ts
```

### Type separation
Three distinct types exist for passport data:

- `PassportModel` — what the app works with internally (from API response)
- `PassportFormModel` — what React Hook Form manages
- `UpdatePassportRequest` — what gets sent to the API on update

Do not mix these — the migration layer handles all conversions.

### Form validation
Zod schemas live in `src/data/schemas/formValidations/`. They are passed to `zodResolver` in React Hook Form. DTO validation schemas live in `src/data/schemas/dtoValidations/`.

---

## Available Scripts

```bash
npm run dev       # Start dev server with MSW
npm run build     # Type-check and build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

---

## Notes for Developers

- **Connecting to a real backend:** Remove the MSW setup from `src/main.tsx` and set `VITE_API_BASE_URL` in `.env`.
- **Adding a new mock endpoint:** Add a handler to `src/mocks/handlers.ts` following the existing pattern.
- **Google Maps:** The map component (`src/ui/shared/Map/map.tsx`) requires a valid `VITE_GOOGLE_MAP_KEY`. Without it the map won't load but the form still works — location will just be `null`.
- **File uploads:** In mock mode, file upload endpoints are not fully mocked. Tokens are generated client-side using `uuid`.
=======
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
>>>>>>> 9d1418dace96f3e348dcda6f379e848f7b4d11c9
