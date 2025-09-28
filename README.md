📝 Multi-Tenant Notes App

A minimal multi-tenant SaaS Notes Application with strict data isolation, role-based access, subscription feature gating, and a simple frontend.

🚀 Features
1. Multi-Tenancy

Supports two tenants: Acme and Globex.

Strict isolation: data from one tenant can never leak into another.

Chosen Approach:

We used shared schema with a tenantId column.

Why?

Easy to implement and maintain.

Keeps migrations simple (no separate DBs to manage).

Still ensures strong isolation by scoping every query with tenantId.

2. Authentication & Authorization

JWT-based login with access tokens.

Roles:

Admin: invite users + upgrade subscription.

Member: create/view/edit/delete notes.

Test accounts (password: password):

admin@acme.test → Admin (Tenant: Acme)

user@acme.test → Member (Tenant: Acme)

admin@globex.test → Admin (Tenant: Globex)

user@globex.test → Member (Tenant: Globex)

3. Subscription Feature Gating

Free Plan: max 3 notes per tenant.

Pro Plan: unlimited notes.

Upgrade Endpoint:

POST /tenants/:slug/upgrade


Only accessible by Admin.

Once upgraded → note limit removed instantly.

4. Notes API (CRUD)

All endpoints enforce tenant isolation and role checks:

POST /notes → Create note

GET /notes → List notes (per tenant)

GET /notes/:id → Get specific note

PUT /notes/:id → Update note

DELETE /notes/:id → Delete note

5. Deployment

Backend: hosted on Vercel (serverless).

Frontend: hosted on Vercel (React + Vite).

CORS: enabled for API access.

Health endpoint:

GET /health → { "status": "ok" }

6. Frontend

Minimal UI with:

Login using test accounts.

List / Create / Delete notes.

Shows “Upgrade to Pro” button when Free plan limit reached.

🛠 Problems We Faced & How We Solved Them
1. Multi-Tenant Data Isolation

Problem: Accidentally, queries without tenant scoping leaked notes across tenants.

Solution:

Added a middleware layer that injects tenantId into every DB query.

Wrote integration tests to confirm Acme’s users never see Globex’s data.

2. Role Enforcement

Problem: Initially, Members could hit the upgrade endpoint (security bug 🚨).

Solution:

Added role checks at the service layer (not just routes).

Now only Admins can invite/upgrade.

3. Subscription Limit Enforcement

Problem: Free tenants could create more than 3 notes if multiple requests hit the server at the same time (race condition).

Solution:

Added a transaction + count check inside note creation logic.

Now the limit is atomic → no bypass possible.

4. Deployment on Vercel

Problem: Express app initially failed on Vercel because of build output mismatches.

Solution:

Configured vercel.json with correct entrypoint.

Verified health endpoint to confirm backend was running.

5. CORS Issues

Problem: Frontend → Backend requests failed due to strict CORS policy.

Solution:

Used cors middleware in Express.

Whitelisted frontend origin and allowed automated script access.

✅ Evaluation Checklist

 Health endpoint available

 JWT login works for all predefined accounts

 Tenant isolation enforced

 Role restrictions applied

 Free plan limit enforced, Pro removes limit

 CRUD API fully functional

 Frontend deployed & accessible

🧪 How to Run Locally

Clone repo & install deps:

npm install


Add .env with:

DATABASE_URL=...
JWT_SECRET=...


Run backend:

npm run dev


Run frontend:

cd frontend && npm run dev


✨ That’s it — a small but complete multi-tenant SaaS app with auth, subscription logic, and deployment!
