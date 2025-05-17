# Eid-ul-Adha Cattle Market

A simple Angular application to manage cattle listings for Eid-ul-Adha, featuring authentication, cattle management, and a mock backend API.

## Features
- **Login/Logout**: Secure the app with basic authentication (admin/1234).
- **View Cattle**: List all cattle with breed, weight, price, and availability.
- **Mark as Sold/Available**: Toggle cattle availability status.
- **Add New Cattle**: Add cattle using a reactive form with validation.
- **Protected Routes**: Only logged-in users can view or add cattle.
- **Custom Pipe**: Format price as PKR currency.
- **Standalone Components**: Modern Angular structure.
- **Error Handling**: User-friendly error messages for API failures.

## Getting Started

### 1. Install Dependencies
```
npm install
```

### 2. Start the Mock API
```
npm run api
```
- The API runs at [http://localhost:3000](http://localhost:3000)
- Login credentials: **user:** `admin` | **pass:** `1234`

### 3. Start the Angular App
```
npm start
```
- The app runs at [http://localhost:4200](http://localhost:4200)

## API Endpoints
- `POST /auth/login` — Authenticate (returns token)
- `POST /auth/logout` — Logout
- `GET /cattle` — List all cattle
- `POST /cattle` — Add new cattle
- `PATCH /cattle/{id}` — Update cattle (e.g., availability)

## Explanations & Design Decisions

### Interceptors
- **`AuthInterceptor`** attaches the JWT token to all outgoing API requests after login.
- Registered globally in `app.config.ts`.

### Reactive Forms
- Used for both login and add cattle forms.
- Includes validation for required fields and numeric constraints.

### HttpClient
- All API interactions use Angular's `HttpClient` via services.
- Error handling is implemented for all requests.

### Pipes
- **`PricePipe`** formats numbers as PKR currency (e.g., `₨120,000`).
- Used in the cattle list for price display.

### Standalone Components
- All components are standalone (no NgModules).
- Each component declares its own dependencies.

### Route Guards
- **`authGuard`** protects cattle management routes, redirecting unauthenticated users to login.

### Mock API
- Uses `json-server` with a custom `server.js` for authentication simulation.
- Easy to extend for more features.

## Folder Structure
- `src/app/components/` — Standalone components
- `src/app/services/` — Services for API/auth
- `src/app/pipes/` — Custom pipes
- `src/app/interceptors/` — HTTP interceptors

## Notes
- Focus is on functionality and code quality over extensive styling.
- You can further enhance the UI or add more features as needed.

---

**Enjoy managing your Eid-ul-Adha Cattle Market!**
