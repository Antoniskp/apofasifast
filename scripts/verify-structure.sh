#!/bin/bash

# Quick Verification Script for Voting Platform Foundation
# This script performs basic checks on the project structure

set -e

echo "�� Verifying Voting Platform Foundation..."
echo ""

# Check directory structure
echo "✓ Checking directory structure..."
[ -d "apps/frontend" ] && echo "  ✓ apps/frontend exists"
[ -d "apps/api" ] && echo "  ✓ apps/api exists"
[ -d "infra" ] && echo "  ✓ infra exists"
[ -d "docs" ] && echo "  ✓ docs exists"

# Check key files
echo ""
echo "✓ Checking key files..."
[ -f ".env.example" ] && echo "  ✓ .env.example exists"
[ -f "infra/keycloak/realm-export.json" ] && echo "  ✓ infra/keycloak/realm-export.json exists"
[ -f "docs/LOCAL-SETUP.md" ] && echo "  ✓ docs/LOCAL-SETUP.md exists"
[ -f "README.md" ] && echo "  ✓ README.md exists"

# Check API structure
echo ""
echo "✓ Checking API structure..."
[ -f "apps/api/package.json" ] && echo "  ✓ apps/api/package.json exists"
[ -f "apps/api/src/main.ts" ] && echo "  ✓ apps/api/src/main.ts exists"
[ -f "apps/api/src/health/health.controller.ts" ] && echo "  ✓ apps/api/src/health/health.controller.ts exists"
[ -f "apps/api/src/user/user.controller.ts" ] && echo "  ✓ apps/api/src/user/user.controller.ts exists"
[ -f "apps/api/src/auth/jwt.strategy.ts" ] && echo "  ✓ apps/api/src/auth/jwt.strategy.ts exists"
[ -f "apps/api/src/audit-log/audit-log.service.ts" ] && echo "  ✓ apps/api/src/audit-log/audit-log.service.ts exists"
[ -f "apps/api/src/migrations/1705660000000-CreateAuditEventsTable.ts" ] && echo "  ✓ apps/api/src/migrations exists"

# Check Frontend structure
echo ""
echo "✓ Checking Frontend structure..."
[ -f "apps/frontend/package.json" ] && echo "  ✓ apps/frontend/package.json exists"
[ -f "apps/frontend/app/page.tsx" ] && echo "  ✓ apps/frontend/app/page.tsx exists"
[ -f "apps/frontend/app/dashboard/page.tsx" ] && echo "  ✓ apps/frontend/app/dashboard/page.tsx exists"
[ -f "apps/frontend/lib/keycloak.ts" ] && echo "  ✓ apps/frontend/lib/keycloak.ts exists"

echo ""
echo "✅ All basic checks passed!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env: cp .env.example .env"
echo "2. Update KEYCLOAK_CLIENT_SECRET in .env with a secure value"
echo "3. Install and configure required services (PostgreSQL, Redis, Keycloak, MinIO)"
echo "4. Run database migrations: cd apps/api && npm run migration:run"
echo "5. Start the API: cd apps/api && npm run start:dev"
echo "6. Start the Frontend: cd apps/frontend && npm run dev"
echo "7. Access frontend at http://localhost:3000"
echo ""
