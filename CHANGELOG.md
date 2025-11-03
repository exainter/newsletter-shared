# Changelog

All notable changes to the newsletter-shared SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-prod] - 2025-11-03

### Added

- Production-ready SDK v1.0.0-prod with multi-environment support
- Configuration system for environment-specific API base URLs
  - `initializeSDK('prod')` - Configure for production environment
  - `initializeSDK('staging')` - Configure for staging environment
  - `initializeSDKWithCustomUrl(url)` - Configure for custom API base URL
- Global fetch interceptor for automatic base URL prepending to relative paths
- New src/config/index.ts module with environment configuration
- New src/sdk/index.ts wrapper for SDK client functions
- Production OpenAPI specification (v1.0.0-prod) with servers configuration
- Updated src/index.ts to export configuration functions and SDK wrapper
- Comprehensive release-prod.yml workflow for production deployments
- Full TypeScript type definitions with ES2020 target

### Changed

- Updated package.json version to 1.0.0-prod
- Updated orval.config.js to use production OpenAPI spec (openapi-v1.0.0-prod.json)
- Orval configuration updated with clean: false to preserve wrapper files
- src/index.ts updated to export new configuration functions
- SDK now uses fetch interceptor instead of direct fetch calls

### Fixed

- SDK now works correctly with both browser and Node.js environments
- Automatic base URL resolution for production and staging environments
- Proper URL handling for relative paths in SDK functions

### Infrastructure

- Added release-prod.yml GitHub Actions workflow
- Build artifacts verified (dist/index.js, dist/index.d.ts, dist/sdk/*, dist/config/*)
- TypeScript compilation without errors
- Compatible with GitHub Packages registry

## [1.0.0-alpha] - 2025-10-25

### Added

- Initial SDK release (alpha)
- Auto-generated SDK from OpenAPI specification
- Basic SDK functions for:
  - Health endpoints (GET /health, GET /healthz)
  - User authentication (GET /user/me)
  - Campaigns management (GET /campaigns)
  - Insights retrieval (GET /insights)
  - Events querying (GET /events/by-campaign, GET /events/by-email)
- TypeScript type definitions
- VERSIONING_MATRIX.md for compatibility tracking
- README.md with quick start guide
- SDK release workflow (sdk-release.yml)

### Known Issues

- SDK functions use relative URLs without base URL configuration
- Requires consumers to handle base URL prepending manually
- Limited environment configuration options

## [0.0.0-dev] - Initial Development

### Added

- Project initialization
- TypeScript configuration
- Orval configuration for SDK generation
- GitHub Actions workflow foundation
- Basic project structure

---

## Upgrade Paths

### From 1.0.0-alpha to 1.0.0-prod

1. Update package.json dependency:
   ```json
   {
     "dependencies": {
       "@exainter/newsletter-shared": "^1.0.0-prod"
     }
   }
   ```

2. Update SDK initialization in your code:
   ```typescript
   import { initializeSDK, userMeUserMeGet } from '@exainter/newsletter-shared';

   // Add explicit environment initialization
   initializeSDK('prod'); // or 'staging'

   // SDK functions now work with the configured base URL
   const user = await userMeUserMeGet(options);
   ```

3. Update Cognito configuration:
   - Verify client_id is set for production environment
   - Ensure issuer URL matches production Cognito endpoint
   - Confirm JWT tokens contain required `tenant_id` claim

### From 0.0.0-dev to 1.0.0-alpha

Breaking changes in 1.0.0-alpha:
- SDK is now auto-generated from OpenAPI spec
- Function naming follows orval conventions (operationId-based)
- Type system improved with proper TypeScript definitions

---

## Release Schedule

- **1.0.0-prod**: November 3, 2025 (Current)
- **1.0.0**: Q4 2025 (Planned stable release)
- **1.1.0**: Q1 2026 (New features, backward compatible)
- **2.0.0**: Q2 2026 (Breaking changes)

---

## Security Notes

### v1.0.0-prod

- Uses AWS Cognito for JWT-based authentication
- Supports both production and staging environments
- Fetch interceptor handles URL resolution transparently
- No sensitive data stored in environment files

### Authentication Requirements

All protected endpoints require:
- Valid JWT access token from Cognito
- JWT must contain `tenant_id` claim
- Bearer token format: `Authorization: Bearer <token>`

---

## Build Information

### v1.0.0-prod

- **TypeScript Version**: 5.9.3
- **Target**: ES2020
- **Module Format**: CommonJS
- **Node Version Tested**: 20.x
- **Build Tool**: TypeScript Compiler (tsc)
- **SDK Generator**: Orval 6.31.0

### Build Command

```bash
npm run build
```

This command:
1. Generates SDK from OpenAPI spec using Orval
2. Compiles TypeScript to CommonJS in dist/

---

## Related Documentation

- [README.md](./README.md) - Quick start and usage guide
- [VERSIONING_MATRIX.md](./VERSIONING_MATRIX.md) - Compatibility matrix
- [VALIDATION_REPORT_PHASE_4.md](./VALIDATION_REPORT_PHASE_4.md) - Phase 4 validation details
- [OpenAPI Spec - Production](./specs/openapi-v1.0.0-prod.json)
- [OpenAPI Spec - Staging](./specs/openapi-v0.3.0-staging.json)
