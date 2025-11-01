# @exainter/newsletter-sdk

TypeScript SDK para la plataforma Newsletter SaaS. Cliente tipado generado automáticamente desde la especificación OpenAPI de `newsletter-api`.

## Instalación

```bash
npm install @exainter/newsletter-sdk
```

### GitHub Packages

Este paquete se publica en GitHub Packages. Configura tu `.npmrc`:

```
@exainter:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Uso Rápido

### Autenticación

El SDK utiliza tokens JWT de Cognito en el header `Authorization`:

```typescript
import * as SDK from '@exainter/newsletter-sdk';

const apiClient = new SDK.Api({
  baseURL: 'https://api-staging.postie.exainter.com',
  headers: {
    'Authorization': `Bearer ${cognitoToken}`,
  },
});
```

### Obtener Usuario Actual

```typescript
import { userMeUserMeGet } from '@exainter/newsletter-sdk';

try {
  const user = await userMeUserMeGet();
  console.log('Usuario:', user);
  // { email: 'user@example.com', tenant_id: 'tenant-123', claims: {...} }
} catch (error) {
  console.error('Error:', error);
}
```

### Obtener Insights Agregados

```typescript
import { getAggregatedInsightsInsightsGet } from '@exainter/newsletter-sdk';

try {
  const insights = await getAggregatedInsightsInsightsGet({
    period: '2025-10', // opcional
  });

  console.log('Insights:', {
    tenant_id: insights.tenant_id,
    total_sent: insights.summary.total_sent,
    open_rate: insights.summary.total_open_rate,
  });
} catch (error) {
  console.error('Error:', error);
}
```

## Endpoints Disponibles

| Endpoint | Método | Descripción | Auth |
|----------|--------|-------------|------|
| `/health` | GET | Health check | No |
| `/healthz` | GET | K8s health check | No |
| `/user/me` | GET | Usuario autenticado | Sí |
| `/campaigns` | GET | Listar campañas | Sí |
| `/insights` | GET | Insights agregados | Sí |
| `/events/by-campaign` | GET | Eventos por campaña | Sí |
| `/events/by-email` | GET | Eventos por email | Sí |

## Actualizar el SDK

```bash
# Descargar especificación OpenAPI actualizada
curl https://api-staging.postie.exainter.com/openapi.json > specs/openapi-v0.3.0-staging.json

# Regenerar y compilar
npm run generate:sdk
npm run build
```

## Desarrollo

```bash
npm install
npm run generate:sdk
npm run build
npm run clean  # limpia dist/
```

## Versionado

Ver [VERSIONING_MATRIX.md](./VERSIONING_MATRIX.md) para compatibilidad entre versiones y entornos.
