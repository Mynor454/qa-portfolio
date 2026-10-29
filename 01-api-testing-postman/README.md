# API Testing with Postman — Restful-Booker

QA test collection for the public [Restful-Booker](https://restful-booker.herokuapp.com/) API, a sandbox designed for practising API testing.

This sample demonstrates how I approach REST API testing: happy paths, negative scenarios, access-control checks, schema validation and response-time assertions, all runnable from the command line in CI with [Newman](https://github.com/postmanlabs/newman).

## What this collection covers

| # | Request | Scenario | Key assertions |
|---|---------|----------|----------------|
| 1 | `GET /ping` | Health check | 201 status, response time < 2s |
| 2 | `POST /auth` | Create token (valid) | 200, token present, token stored for reuse |
| 3 | `POST /auth` | Create token (invalid) | `reason: Bad credentials`, no token issued |
| 4 | `POST /booking` | Create booking | 200, `bookingid` returned, payload echoed back |
| 5 | `GET /booking/{id}` | Read booking | 200, full schema + field types validated |
| 6 | `GET /booking/99999999` | Read non-existent | 404 Not Found |
| 7 | `PUT /booking/{id}` | Update (authenticated) | 200, fields updated |
| 8 | `PUT /booking/{id}` | Update (no token) | 403 Forbidden (access control) |
| 9 | `DELETE /booking/{id}` | Delete (authenticated) | 201 |

The collection chains requests: the auth token and booking id created at runtime are stored as collection variables and reused by later requests, so the whole suite runs end to end in a single execution.

## Testing techniques shown

- **Positive and negative testing** — valid vs invalid credentials, existing vs missing resources.
- **Access control** — a write operation without a token is expected to be rejected with 403.
- **Schema validation** — presence and data types of every field in the booking response.
- **Non-functional checks** — response-time assertions under 2000 ms.
- **Data-driven chaining** — token and booking id passed between requests via variables.

## How to run

### Option A — Postman (UI)
1. Import `restful-booker.postman_collection.json`.
2. Import `restful-booker.postman_environment.json` and select it.
3. Open the collection runner and run all requests in order.

### Option B — Newman (CLI / CI)
```bash
npm install
npm test            # console output
npm run test:report # also generates reports/newman-report.html
```

## Notes

- The Restful-Booker sandbox occasionally returns intermittent errors or a cold-start delay on the first request (it is a free Heroku instance). Re-running the suite resolves transient failures.
- Credentials (`admin` / `password123`) are the public demo credentials documented by Restful-Booker; no private data is used.

---
Author: Mynor Estrada
