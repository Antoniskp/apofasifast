AGENT PROMPT (PLAIN TEXT)

Project name: Self‑hosted Voting Platform (Part 1 Foundation)

Goal
Build the first deployable foundation of a self‑hosted voting platform using locally installed services. It must include Next.js frontend, NestJS backend, Keycloak auth, Postgres, Redis, MinIO, and a minimal audit log. This is the initial stack that will be deployed and tested on a VPS before expanding functionality.

Core Stack

Frontend: Next.js
Backend: NestJS
Auth: Keycloak (OIDC)
DB: PostgreSQL
Cache: Redis
Object storage: MinIO
Deployment: Local service installation
Repo Structure

/apps/frontend (Next.js)
/apps/api (NestJS)
/infra (Keycloak realm export)
/docs (setup instructions)
Deliverables & Acceptance Checks

Local Services Infrastructure
Deliverables
.env.example with required variables for connecting to locally installed services: postgres, redis, keycloak, minio, api, frontend
Configuration for persistent storage for postgres and minio
Acceptance

All services can be installed and configured locally
Services are properly connected
Keycloak Setup
Deliverables
Keycloak configured with realm "voting"
Clients: frontend (public), api (confidential)
Roles: admin, voter
Realm export JSON in /infra/keycloak/realm-export.json
Acceptance

Admin console reachable
Test user can login
Backend (NestJS)
Deliverables
/health endpoint returns {status:"ok"}
/me endpoint returns token user info
JWT validation via Keycloak
PostgreSQL + Redis env config
Acceptance

/health works without auth
/me works with valid Keycloak access token
Frontend (Next.js)
Deliverables
Public homepage for unsigned users (marketing + short explanation of project)
Login button redirects to Keycloak
Protected dashboard page
Displays user info from /me
Acceptance

Anonymous users see homepage
Authenticated users see dashboard
User info renders correctly
Audit Log MVP
Deliverables
Postgres table audit_events: id(uuid), event_type, payload(jsonb), hash, prev_hash, created_at
Insert event generates hash chain correctly
Acceptance

Migration runs on startup
Hash chain validates for sequential inserts
Documentation
Deliverables
/docs/LOCAL-SETUP.md:
install steps
env variables
how to run
test login user
Acceptance

A fresh user can run everything locally
Notes

Keep everything lightweight for VPS
Keep code clean and structured for future expansion
