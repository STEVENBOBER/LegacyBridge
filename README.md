# 📘 **README.md — LegacyBridge Middleware (Barebones Version)**

```markdown
# LegacyBridge – ERP Modernization Middleware

LegacyBridge is a lightweight Node.js/TypeScript middleware designed to sit between
**legacy ERP systems (e.g., PeopleSoft)** and **modern applications**.  
It provides a clean, modern API surface while isolating downstream systems behind an
adapter layer. This enables gradual modernization without replacing existing ERP
systems.

## 🚀 Features (Barebones Version)

- Simple Express server in TypeScript
- Environment-based configuration system
- Mock PeopleSoft authentication flow
- Protected PeopleSoft-style API route (`/employees/:id`)
- Adapter class (`PeopleSoftAdapter`) to abstract legacy ERP communication
- Basic CORS + security headers (Helmet)
- Structured logging inside adapter calls
- Clean, extensible project layout

This version is intentionally minimal, serving as the foundation for a more robust
middleware service.

---

## 🏗️ Architecture Overview

```

Client (Next.js, React, etc.)
|
v
LegacyBridge API
----------------

Express Routes (REST endpoints)
|
v
PeopleSoftAdapter (mock)
|
v
Legacy ERP (future real system)

```

### Why an Adapter?

The adapter layer provides:

- Isolation from legacy-specific quirks  
- Clean abstraction for frontend or microservices  
- Easy mocking for development  
- Swap-in compatibility (PeopleSoft → SAP → Workday later)  
- Central place for authentication, timeout handling, and retries  

---

## 📁 Project Structure

```

backend/
├─ src/
│   ├─ adapters/
│   │    └─ peoplesoftAdapter.ts
│   ├─ routes/
│   │    └─ peoplesoft.ts
│   ├─ utils/
│   │    └─ logger.ts
│   ├─ config/
│   │    └─ index.ts
│   └─ server.ts
├─ .env
├─ .env.example
├─ package.json
├─ tsconfig.json
└─ README.md

````

---

## ⚙️ Configuration

Configuration is stored in `.env` (not committed) and loaded via `config/index.ts`.

Example:

```env
PORT=3000
LOG_LEVEL=debug

PEOPLESOFT_BASE_URL=http://localhost:4000
PEOPLESOFT_USERNAME=psadmin
PEOPLESOFT_PASSWORD=changeme
````

---

## 🧪 Mock PeopleSoft Endpoints

### `GET /health`

Basic service health check.

### `POST /peoplesoft/login`

Simulates authenticating a user against PeopleSoft.
Returns a mock token:

```json
{
  "message": "Mock PeopleSoft login successful",
  "token": "ps-mock-token-173259...",
  "expiresIn": 1800,
  "issuedAt": "2025-11-26T05:00:00.000Z"
}
```

### `GET /peoplesoft/employees/:id`

Protected route requiring:

```
Authorization: Bearer <token>
```

Returns a mock employee record.

---

## ▶️ Running the Server

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 🧱 Future Enhancements (Roadmap)

This project is built to expand naturally:

* Real PeopleSoft API calls through Adapter
* Retry + timeout logic for legacy systems
* Token/session refresh handling
* More ERP endpoints (Vouchers, Vendors, AP/GL)
* OAuth/JWT authentication for external clients
* Request correlation IDs & structured logging
* Swagger/OpenAPI documentation
* Integration with modern cloud services (AWS/GCP/Azure)
* Background jobs for scheduled ERP synchronization

---

## 📚 Purpose of This Project

LegacyBridge demonstrates:

* How to modernize state/government ERP systems safely
* How to build an abstraction layer over legacy systems
* How to isolate fragile downstream dependencies
* How to prepare old systems for modern web or cloud integrations

Perfect for portfolios, demos, or real modernization initiatives.

---

## 📝 License

MIT (change as needed)



