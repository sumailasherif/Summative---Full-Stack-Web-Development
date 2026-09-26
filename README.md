# Vehicle Rental Management System

Full-Stack Web Development Summative Group Project — **Group C**
React.js · Node.js/Express · MySQL · Swagger

## About

A vehicle rental company needs a way to keep track of who's renting what, and for how long. This app lets staff register customers, manage the vehicle fleet, and create, update, and cancel rental bookings — with rental pricing calculated automatically from each vehicle's daily rate rather than typed in by hand.

## Team

| Member | Owns |
|---|---|
| [Teammate's Name] | Customers & Vehicles — database, API, React pages |
| Deen (Sherif Mohammed Sumaila) | Rentals & Dashboard — database, API, React pages |

## Tech Stack

- **Frontend:** React.js (Vite) + React Router
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **API Docs:** Swagger (OpenAPI 3.0)

## Features

- **Dashboard** — live counts of customers, vehicles, and rentals, plus active rentals and available vehicles
- **Customers** — full CRUD
- **Vehicles** — full CRUD
- **Rentals** — full CRUD; validates that the linked customer and vehicle actually exist, checks `end_date` is after `start_date`, and automatically calculates `total_price` from the vehicle's daily rate × number of rental days
- **Rental Details** — a single rental's info alongside the customer and vehicle it belongs to
- **Swagger UI** — every endpoint documented and testable at `/api-docs`

## Architecture

The frontend never talks to MySQL directly — everything goes through the Express API.

```mermaid
flowchart TB
    subgraph Frontend["React.js (Vite)"]
        A["Pages: Dashboard, Customers, Vehicles, Rentals, RentalDetails"]
    end
    subgraph Backend["Node.js + Express REST API"]
        B["Routes"] --> C["Controllers"] --> D["Models"]
        E["Swagger UI — /api-docs"]
    end
    subgraph Database["MySQL"]
        F[("customers")]
        G[("vehicles")]
        H[("rentals")]
    end
    A -- "HTTP GET / POST / PUT / DELETE" --> B
    D -- "SQL queries" --> F
    D -- "SQL queries" --> G
    D -- "SQL queries" --> H
```

## Database Design

`rentals` is the join point between `customers` and `vehicles` — every rental must reference a real customer and a real vehicle.

```mermaid
erDiagram
    CUSTOMERS ||--o{ RENTALS : makes
    VEHICLES ||--o{ RENTALS : "is rented in"

    CUSTOMERS {
        varchar customer_id PK
        varchar name
        varchar email
        varchar phone
        varchar driving_license
    }
    VEHICLES {
        varchar vehicle_id PK
        varchar brand
        varchar model
        varchar registration_number
        decimal daily_rate
        varchar status
    }
    RENTALS {
        int rental_id PK
        varchar customer_id FK
        varchar vehicle_id FK
        date start_date
        date end_date
        decimal total_price
        varchar status
    }
```

## Request Flows

**Reading data** (e.g. opening the Rentals page):

```mermaid
sequenceDiagram
    participant U as User
    participant R as React
    participant N as Node/Express
    participant M as MySQL

    U->>R: Opens Rentals page
    R->>N: GET /api/rentals
    N->>M: SELECT * FROM rentals
    M-->>N: Rows
    N-->>R: JSON response
    R-->>U: Renders table
```

**Creating data** (e.g. adding a new rental):

```mermaid
sequenceDiagram
    participant U as User
    participant R as React
    participant N as Node/Express
    participant M as MySQL

    U->>R: Fills form, clicks "Add Rental"
    R->>N: POST /api/rentals
    N->>M: Look up customer + vehicle by id
    M-->>N: Customer & vehicle rows
    N->>N: Validate dates, calculate total_price
    N->>M: INSERT INTO rentals (...)
    M-->>N: insertId
    N-->>R: 201 Created + new rental JSON
    R-->>U: Table refreshes, success message shown
```

## Project Structure

```
project-root/
├── backend/
│   ├── config/database.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── swagger/swagger.js
│   ├── database/schema.sql
│   └── app.js
└── frontend/
    └── src/
        ├── components/Navbar.jsx
        ├── pages/
        └── services/api.js
```

## How to run the program

### Prerequisites
- Node.js (v18+)
- MySQL Server
- npm

### 1. Database
Run `backend/database/schema.sql` in your MySQL client. It creates the `vehicle_rental_db` database, all three tables, and seeds each with sample data.

### 2. Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vehicle_rental_db
DB_PORT=3306
PORT=3000
```
Then:
```bash
node app.js
```

![Backend server starting up](screenshots/01-backend-startup.png)

- API base: http://localhost:3000/api
- Swagger docs: http://localhost:3000/api-docs

Here it is actually answering requests — a real dashboard-stats call, and a rental being created with `total_price` worked out automatically (4 days × $40/day = $160):

![Live API calls against the running server](screenshots/02-api-demo.png)

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

![Vite dev server starting up](screenshots/03-frontend-dev.png)

- App: http://localhost:5173

## Known Issues We Caught (and Fixed)

While putting this README together we actually ran `npm run build` on the frontend and it failed:

![Build failing because api.js contained a pasted-in React component](screenshots/04-build-before-fix.png)

The cause: the entire `Rentals.jsx` component had accidentally been pasted into `services/api.js` instead of just the five `fetch` helper functions (`getRentals`, `getRentalById`, `createRental`, `updateRental`, `deleteRental`). Once that block was replaced with the actual API functions, the build passed cleanly:

![Build succeeding after api.js was fixed](screenshots/05-build-after-fix.png)

**Takeaway for the demo:** if `Rentals.jsx` or `RentalDetails.jsx` ever throw `"getRentals is not a function"` (or similar) in the browser console, check `services/api.js` first — it's an easy file to end up with the wrong block pasted into it.

## API Reference

| Resource | Endpoints |
|---|---|
| Customers | `GET /api/customers` · `GET /api/customers/:id` · `POST /api/customers` · `PUT /api/customers/:id` · `DELETE /api/customers/:id` |
| Vehicles | `GET /api/vehicles` · `GET /api/vehicles/:id` · `POST /api/vehicles` · `PUT /api/vehicles/:id` · `DELETE /api/vehicles/:id` |
| Rentals | `GET /api/rentals` · `GET /api/rentals/:id` · `POST /api/rentals` · `PUT /api/rentals/:id` · `DELETE /api/rentals/:id` |
| Dashboard | `GET /api/dashboard/stats` |

Full request/response schemas, parameters, and a "try it out" console for every endpoint are in Swagger at `/api-docs` once the backend is running.

## Assessment Criteria Coverage

| Criteria | Marks | Where |
|---|---|---|
| Database design and relationships | 15 | `schema.sql` — 3 related tables, FKs on `rentals` |
| Node.js / Express API | 20 | `controllers/`, `models/`, `routes/`, `config/database.js` |
| CRUD operations | 15 | Full CRUD on all 3 resources (15 endpoints total) |
| Swagger documentation | 10 | `/api-docs`, JSDoc blocks in every route file |
| React.js frontend | 15 | `pages/` — `useState`/`useEffect`, forms, tables |
| React Router and navigation | 5 | `App.jsx`, `Navbar.jsx` |
| Frontend/API integration | 10 | `services/api.js` |
| User interface and usability | 5 | `index.css` design system |
| Demonstration and code explanation | 5 | Recorded demo |