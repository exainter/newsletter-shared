# @exainter/newsletter-shared

TypeScript SDK y utilidades compartidas para la plataforma Newsletter SaaS. Cliente tipado generado automáticamente desde la especificación OpenAPI de `newsletter-api`.

## Versión

- **Versión actual**: 1.0.0-prod
- **Status**: Production Ready
- **Última actualización**: 2025-11-03

## Instalación

```bash
npm install @exainter/newsletter-shared@1.0.0-prod
```

### GitHub Packages

Este paquete se publica en GitHub Packages. Configura tu `.npmrc`:

```
@exainter:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Configuración Rápida

### Inicializar para Producción

```typescript
import { initializeSDK, userMeUserMeGet } from '@exainter/newsletter-shared';

// Inicializar para producción
initializeSDK('prod');

// O para staging
initializeSDK('staging');
```

### Inicializar con URL Personalizada

```typescript
import { initializeSDKWithCustomUrl } from '@exainter/newsletter-shared';

// Usar una URL personalizada
initializeSDKWithCustomUrl('https://api.ejemplo.com');
```

## Entornos Soportados

| Entorno | URL Base | Configuración |
|---------|----------|---------------|
| Producción | `https://api.postie.exainter.com` | `initializeSDK('prod')` |
| Staging | `https://postie-staging.exainter.com/api` | `initializeSDK('staging')` |
| Personalizado | Cualquier URL | `initializeSDKWithCustomUrl(url)` |

## Uso Rápido

### Autenticación

El SDK utiliza tokens JWT de Cognito en el header `Authorization`:

```typescript
import { initializeSDK, userMeUserMeGet } from '@exainter/newsletter-shared';

// Inicializar para el entorno deseado
initializeSDK('prod');

// El SDK automáticamente prepend la URL base configurada
const user = await userMeUserMeGet({
  headers: {
    'Authorization': `Bearer ${cognitoToken}`,
  },
});
```

### Obtener Usuario Actual

```typescript
import { initializeSDK, userMeUserMeGet } from '@exainter/newsletter-shared';

initializeSDK('prod');

try {
  const user = await userMeUserMeGet({
    headers: {
      'Authorization': `Bearer ${cognitoToken}`,
    },
  });
  console.log('Usuario:', user);
  // { email: 'user@example.com', tenant_id: 'tenant-123', claims: {...} }
} catch (error) {
  console.error('Error:', error);
}
```

### Obtener Insights Agregados

```typescript
import { initializeSDK, getAggregatedInsightsInsightsGet } from '@exainter/newsletter-shared';

initializeSDK('prod');

try {
  const insights = await getAggregatedInsightsInsightsGet(
    { period: '2025-11' }, // opcional
    {
      headers: {
        'Authorization': `Bearer ${cognitoToken}`,
      },
    }
  );

  console.log('Insights:', {
    tenant_id: insights.tenant_id,
    total_sent: insights.summary.total_sent,
    open_rate: insights.summary.total_open_rate,
  });
} catch (error) {
  console.error('Error:', error);
}
```

### Obtener Configuración Actual

```typescript
import { getSDKConfig, getApiBaseUrl } from '@exainter/newsletter-shared';

const config = getSDKConfig();
console.log('Config:', config);
// { apiBaseUrl: 'https://api.postie.exainter.com', environment: 'prod' }

const baseUrl = getApiBaseUrl();
console.log('Base URL:', baseUrl);
// https://api.postie.exainter.com
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

## Autenticación con Cognito

### Configuración

El SDK requiere JWT tokens de AWS Cognito con las siguientes características:

- **Issuer (Prod)**: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXXXXXXX`
- **Issuer (Staging)**: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_YYYYYYYYY`
- **Client ID (Prod)**: Configurado en tu aplicación
- **Client ID (Staging)**: Configurado en tu aplicación
- **Requerimiento JWT**: El token debe contener el claim `tenant_id`

### Obtener Token JWT

```typescript
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ region: 'us-east-1' });

const command = new InitiateAuthCommand({
  ClientId: process.env.COGNITO_CLIENT_ID,
  AuthFlow: 'USER_PASSWORD_AUTH',
  AuthParameters: {
    USERNAME: 'user@example.com',
    PASSWORD: 'password',
  },
});

const result = await cognitoClient.send(command);
const jwtToken = result.AuthenticationResult?.AccessToken;
```

## CloudFront Compatibility

El SDK está optimizado para uso con CloudFront:

- **Cache-Control**: `max-age=31536000` (recomendado para distribuciones inmutables)
- **URL Handling**: Soporta resolución automática de URLs relativas a absolutas
- **Production Ready**: Completamente compatible con CDNs de contenido estático

### Ejemplo de Configuración CloudFront

```typescript
import { initializeSDK } from '@exainter/newsletter-shared';

// CloudFront sirve el SDK desde un edge location
// El SDK automáticamente resuelve las URLs usando el entorno configurado
initializeSDK('prod');
```

## Actualizar el SDK

### Desde Especificación OpenAPI de Staging

```bash
# Descargar especificación OpenAPI actualizada
curl https://postie-staging.exainter.com/openapi.json > specs/openapi-v0.3.0-staging.json

# Regenerar y compilar
npm run generate:sdk
npm run build
```

### Desde Especificación OpenAPI de Producción

```bash
# Descargar especificación OpenAPI actualizada
curl https://api.postie.exainter.com/openapi.json > specs/openapi-v1.0.0-prod.json

# Actualizar orval.config.js para usar la nueva especificación
# Luego regenerar y compilar
npm run generate:sdk
npm run build
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Generar SDK desde OpenAPI
npm run generate:sdk

# Compilar TypeScript
npm run build

# Limpiar artefactos
npm run clean  # limpia dist/
```

## TypeScript Configuration

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Enabled
- **Declaration Files**: Generated automatically

## Versionado y Compatibilidad

Ver [VERSIONING_MATRIX.md](./VERSIONING_MATRIX.md) para compatibilidad entre versiones y entornos.

## Phase 4 - Production Release

Para detalles sobre la versión 1.0.0-prod de Phase 4, ver [VALIDATION_REPORT_PHASE_4.md](./VALIDATION_REPORT_PHASE_4.md).

Este incluye:
- Configuración multi-entorno (staging/prod)
- Soporte de base URL dinámica
- Compatibilidad con CloudFront
- Validación de integración con frontend
- Verificación de Cognito prod

## Documentation

- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios
- [VERSIONING_MATRIX.md](./VERSIONING_MATRIX.md) - Matriz de compatibilidad
- [VALIDATION_REPORT_PHASE_4.md](./VALIDATION_REPORT_PHASE_4.md) - Reporte de validación Phase 4
