# Local Setup Guide

This guide will help you set up and run the Voting Platform locally.

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development without Docker)
- Git

## Quick Start with Docker Compose

1. **Clone the repository**
   ```bash
   git clone https://github.com/Antoniskp/apofasifast.git
   cd apofasifast
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start all services**
   ```bash
   cd infra
   docker compose up -d
   ```

4. **Wait for services to be ready**
   
   It may take 1-2 minutes for all services to start. You can check the status with:
   ```bash
   docker compose ps
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001
   - Keycloak Admin Console: http://localhost:8080
   - MinIO Console: http://localhost:9001

## Environment Variables

The `.env.example` file contains all required environment variables with default values.

### Key Variables:

#### PostgreSQL
- `POSTGRES_HOST=postgres` - Database host
- `POSTGRES_PORT=5432` - Database port
- `POSTGRES_DB=voting_db` - Database name
- `POSTGRES_USER=voting_user` - Database user
- `POSTGRES_PASSWORD=voting_password` - Database password

#### Redis
- `REDIS_HOST=redis` - Redis host
- `REDIS_PORT=6379` - Redis port

#### Keycloak
- `KEYCLOAK_ADMIN=admin` - Keycloak admin username
- `KEYCLOAK_ADMIN_PASSWORD=admin123` - Keycloak admin password
- `KEYCLOAK_URL=http://keycloak:8080` - Keycloak internal URL
- `KEYCLOAK_REALM=voting` - Realm name
- `KEYCLOAK_CLIENT_ID=api` - API client ID
- `KEYCLOAK_CLIENT_SECRET=your-api-client-secret-here` - API client secret (should match the value in realm-export.json, or generate a new one with `openssl rand -base64 32`)

#### Frontend Keycloak
- `NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080` - Public Keycloak URL
- `NEXT_PUBLIC_KEYCLOAK_REALM=voting` - Realm name
- `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=frontend` - Frontend client ID

#### MinIO
- `MINIO_ROOT_USER=minioadmin` - MinIO admin username
- `MINIO_ROOT_PASSWORD=minioadmin` - MinIO admin password
- `MINIO_ENDPOINT=minio` - MinIO endpoint
- `MINIO_PORT=9000` - MinIO port

## Test Users

The system comes pre-configured with test users:

### Voter User
- **Username**: `testuser`
- **Password**: `test123`
- **Email**: test@example.com
- **Roles**: voter

### Admin User
- **Username**: `adminuser`
- **Password**: `admin123`
- **Email**: admin@example.com
- **Roles**: admin, voter

## Testing the Application

1. **Test Health Endpoint**
   ```bash
   curl http://localhost:3001/health
   ```
   Expected response: `{"status":"ok"}`

2. **Login to Frontend**
   - Navigate to http://localhost:3000
   - Click "Login to Continue"
   - Use test credentials (testuser/test123 or adminuser/admin123)
   - You should be redirected to the dashboard

3. **Test /me Endpoint**
   
   First, get a token by logging in through the frontend, then:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:3001/me
   ```

## Keycloak Admin Access

1. Navigate to http://localhost:8080
2. Click "Administration Console"
3. Login with:
   - Username: `admin`
   - Password: `admin123`
4. Select the "voting" realm from the dropdown

## Local Development (Without Docker)

### Backend API

1. **Install dependencies**
   ```bash
   cd apps/api
   npm install
   ```

2. **Set environment variables**
   ```bash
   export POSTGRES_HOST=localhost
   export POSTGRES_PORT=5432
   export POSTGRES_DB=voting_db
   export POSTGRES_USER=voting_user
   export POSTGRES_PASSWORD=voting_password
   export REDIS_HOST=localhost
   export REDIS_PORT=6379
   export KEYCLOAK_URL=http://localhost:8080
   export KEYCLOAK_REALM=voting
   export KEYCLOAK_CLIENT_ID=api
   export KEYCLOAK_CLIENT_SECRET=your-api-client-secret-here
   ```

3. **Run migrations**
   ```bash
   npm run migration:run
   ```

4. **Start development server**
   ```bash
   npm run start:dev
   ```

### Frontend

1. **Install dependencies**
   ```bash
   cd apps/frontend
   npm install
   ```

2. **Set environment variables**
   ```bash
   export NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
   export NEXT_PUBLIC_KEYCLOAK_REALM=voting
   export NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=frontend
   export NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Database Migrations

Migrations run automatically when the API container starts. To run them manually:

```bash
cd apps/api
npm run migration:run
```

## Audit Log System

The audit log system creates a cryptographic hash chain of events:
- Each event has a hash based on its content and the previous event's hash
- This creates a tamper-evident log
- The audit_events table stores: id, event_type, payload, hash, prev_hash, created_at

## Troubleshooting

### Services won't start
```bash
# Check logs
cd infra
docker compose logs -f

# Restart specific service
docker compose restart api
```

### Keycloak realm not imported
```bash
# Restart Keycloak
docker compose restart keycloak
```

### Database connection issues
```bash
# Check if postgres is healthy
docker compose ps postgres

# View postgres logs
docker compose logs postgres
```

### Frontend can't connect to API
- Make sure NEXT_PUBLIC_API_URL is set to http://localhost:3001
- Check if the API container is running
- Verify CORS is enabled in the API

## Stopping the Application

```bash
cd infra
docker compose down
```

To remove volumes as well:
```bash
docker compose down -v
```

## Architecture Overview

- **Frontend** (Next.js): Provides the user interface
- **API** (NestJS): Handles business logic and data operations
- **Keycloak**: Manages authentication and authorization
- **PostgreSQL**: Stores application data and audit logs
- **Redis**: Provides caching layer
- **MinIO**: Object storage for files

## Next Steps

After successful setup, you can:
1. Create voting sessions
2. Manage users and roles in Keycloak
3. Review audit logs in the database
4. Extend the platform with new features

## Support

For issues or questions, please open an issue on the GitHub repository.
