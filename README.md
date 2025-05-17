# Eid-ul-Adha Cattle Market

A simple Angular application to manage cattle listings for Eid-ul-Adha, featuring authentication, cattle management, and a mock backend API using json-server.

## Features
- **Login/Logout**: Secure the app with basic authentication (admin/1234).
- **View Cattle**: List all cattle with breed, weight, price, and availability.
- **Mark as Sold/Available**: Toggle cattle availability status.
- **Add New Cattle**: Add cattle using a reactive form with validation.
- **Protected Routes**: Only logged-in users can view or add cattle.
- **Custom Pipe**: Format price as PKR currency.
- **Standalone Components**: Modern Angular structure.
- **Error Handling**: User-friendly error messages for API failures.

## Route Paths
- `/login` — Login page
- `/logout` — Logout (logs out and redirects to login)
- `/cattle` — View all cattle (protected)
- `/add` — Add new cattle (protected)

## Getting Started

### 1. Install Dependencies
```
npm install
```

### 2. Start the Mock API (json-server)
```
npx json-server --watch db.json
```
- The API runs at [http://localhost:3000](http://localhost:3000)
- Login credentials: **user:** `admin` | **pass:** `1234`

### 3. Start the Angular App
```
ng serve
```
**or**
```
npm run start
```
- The app runs at [http://localhost:4200](http://localhost:4200)

## API Endpoints
- `POST /login` — Authenticate (returns token)
- `POST /logout` — Logout
- `GET /cattle` — List all cattle
- `POST /cattle` — Add new cattle
- `PATCH /cattle/{id}` — Update cattle (e.g., availability)

## About json-server
- [json-server](https://github.com/typicode/json-server) is used to mock a REST API for development.
- The data is stored in `db.json` in the project root.
- You can edit `db.json` to add or modify cattle and users.
- To start the server, use:
  ```
  npx json-server --watch db.json
  ```

## About the Proxy (CORS Fix)
- Angular runs on port 4200 and json-server runs on port 3000, which causes CORS issues by default.
- A proxy configuration (`proxy.config.json`) is used to forward API requests from Angular to json-server, avoiding CORS errors.
- The proxy file includes:
  ```json
  {
    "/cattle": {
      "target": "http://localhost:3000",
      "secure": false,
      "changeOrigin": true,
      "logLevel": "debug"
    }
  }
  ```
- Make sure to use **relative URLs** (e.g., `/cattle`, `/login`) in your Angular code.

## Folder Structure
- `src/app/components/` — Standalone components
- `src/app/services/` — Services for API/auth
- `src/app/pipes/` — Custom pipes
- `src/app/interceptors/` — HTTP interceptors

## Notes
- Focus is on functionality and code quality over extensive styling.