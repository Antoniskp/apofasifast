# Voting Platform - ApofasiFast

A secure, transparent, and self-hosted voting platform built with modern web technologies.

## 🚀 Features

- **Secure Authentication**: Enterprise-grade authentication powered by Keycloak
- **Transparent Voting**: All votes are recorded with cryptographic audit trails
- **Self-Hosted**: Full control over your data and infrastructure
- **Modern Stack**: Built with Next.js, NestJS, and PostgreSQL
- **Containerized**: Easy deployment with Docker Compose

## 📋 Architecture

### Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Backend**: NestJS with TypeScript
- **Authentication**: Keycloak (OpenID Connect)
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Object Storage**: MinIO
- **Deployment**: Docker Compose

### Project Structure

```
apofasifast/
├── apps/
│   ├── frontend/          # Next.js application
│   └── api/              # NestJS API
├── infra/
│   ├── docker-compose.yml # Infrastructure definition
│   └── keycloak/         # Keycloak realm configuration
└── docs/
    └── LOCAL-SETUP.md    # Detailed setup instructions
```

## 🏁 Quick Start

1. **Prerequisites**
   - Docker and Docker Compose
   - Git

2. **Clone and Setup**
   ```bash
   git clone https://github.com/Antoniskp/apofasifast.git
   cd apofasifast
   cp .env.example .env
   ```

3. **Start Services**
   ```bash
   cd infra
   docker compose up -d
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001
   - Keycloak: http://localhost:8080

For detailed setup instructions, see [docs/LOCAL-SETUP.md](docs/LOCAL-SETUP.md).

## 🔐 Test Users

### Voter User
- Username: `testuser`
- Password: `test123`

### Admin User
- Username: `adminuser`
- Password: `admin123`

## 📚 Documentation

- [Local Setup Guide](docs/LOCAL-SETUP.md) - Complete setup and configuration instructions
- [Project Scope](Scope.md) - Detailed project requirements and deliverables

## 🛠️ Development

### Backend API

```bash
cd apps/api
npm install
npm run start:dev
```

API will be available at http://localhost:3001

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

Frontend will be available at http://localhost:3000

## 🔍 API Endpoints

- `GET /health` - Health check (no authentication required)
- `GET /me` - Get current user information (requires authentication)

## 🔐 Security Features

### Audit Log System

The platform includes a cryptographic audit trail system:
- Each event is hashed using SHA-256
- Events are chained together using previous hash
- Tamper-evident logging
- Database table: `audit_events`

### Authentication

- OpenID Connect (OIDC) with Keycloak
- JWT token validation
- Role-based access control (RBAC)
- Secure session management

## 📝 Environment Variables

All required environment variables are documented in `.env.example`. Key variables include:

- PostgreSQL configuration
- Redis configuration
- Keycloak URLs and credentials
- MinIO configuration
- Service ports

## 🧪 Testing

Test the health endpoint:
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok"}
```

## 🚢 Deployment

The platform is designed for lightweight VPS deployment using Docker Compose. No Kubernetes required.

### Production Considerations

- Update all default passwords in `.env`
- Configure SSL/TLS termination
- Set up proper backup strategies
- Monitor service health
- Review security settings

## 🤝 Contributing

This is Part 1 of the voting platform foundation. Future enhancements will include:
- Voting session creation and management
- Ballot casting functionality
- Real-time result tracking
- Advanced audit log verification
- Email notifications
- Multi-factor authentication

## 📄 License

MIT

## 👥 Authors

Built for secure, transparent voting systems.
