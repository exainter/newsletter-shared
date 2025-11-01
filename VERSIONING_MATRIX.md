# Versioning & Dependency Matrix

Matriz de compatibilidad entre versiones del SDK, backends y aplicaciones frontend.

## Versiones Actuales

| Componente | Versión | OpenAPI | Estado |
|-----------|---------|---------|--------|
| **newsletter-sdk** | 1.0.0-alpha | v0.3.0-staging | Activa |
| **newsletter-api** | 1.0.0 | v0.3.0-staging | Activa |
| **newsletter-web** | 0.1.0 | - | Desarrollo |

## Matriz de Compatibilidad

### SDK vs Backend

| SDK Version | API v1.0.0 (Staging) | API v1.1.0 (Plan) |
|-------------|:---:|:---:|
| **1.0.0-alpha** | Compatible | Previsto |
| **1.0.0** | Compatible | Compatible |
| **1.1.0** | Deprecado | Compatible |
| **2.0.0** | No compatible | Compatible |

**Leyenda:**
- Compatible: Soportado completamente
- Deprecado: Compatible pero no recomendado
- Previsto: Planeado para futuro
- No compatible: Incompatible

### SDK vs Frontend (newsletter-web)

| SDK Version | Web v0.1.0 | Web v0.2.0 | Web v1.0.0 |
|-------------|:---:|:---:|:---:|
| **1.0.0-alpha** | Compatible | Compatible | Compatible |
| **1.0.0** | Compatible | Compatible | Compatible |
| **2.0.0** | Deprecado | Compatible | Compatible |

## Política de Versionado

### Semántica de Versiones

```
MAJOR.MINOR.PATCH-PRERELEASE+BUILD
  1.0.0-alpha+20251101
```

- **MAJOR**: Cambios breaking en la API (incompatible hacia atrás)
- **MINOR**: Nuevas funcionalidades (compatible hacia atrás)
- **PATCH**: Correcciones de bugs (compatible hacia atrás)
- **PRERELEASE**: Alpha, beta, rc (e.g., `-alpha`, `-beta.1`)

### Ciclo de Lanzamiento

1. **Alpha** (e.g., `1.0.0-alpha`)
   - Cambios API frecuentes
   - Feedback temprano
   - Duración: 2-4 semanas

2. **Beta** (e.g., `1.0.0-beta`)
   - API estable
   - Testing de integración
   - Duración: 1-2 semanas

3. **Release Candidate** (e.g., `1.0.0-rc.1`)
   - Correcciones solo de bugs
   - Duración: 3-5 días

4. **Release** (e.g., `1.0.0`)
   - Producción lista
   - Soportada por 6 meses

## Planificación de Releases

### 1.0.0 (Q4 2025)

**Cambios:**
- Estabilización de API endpoints
- Validación de tipos mejorada
- Documentación completa

**Timeline:**
- `1.0.0-alpha`: Nov 1 - Nov 15
- `1.0.0-beta`: Nov 15 - Nov 25
- `1.0.0-rc.1`: Nov 25 - Nov 28
- `1.0.0`: Nov 28

### 1.1.0 (Q1 2026)

**Cambios Planeados:**
- Nuevos endpoints para analytics
- Soporte para webhooks
- Caché local

**Impacto:** Backward compatible

### 2.0.0 (Q2 2026)

**Cambios Breaking:**
- Refactoring de estructura de tipos
- Cambio de client generator
- Nueva auth strategy

**Impacto:** Requiere migración

## Procedimiento de Actualización

### Actualizar SDK en newsletter-web

```bash
# Verificar compatibilidad en matriz
# Actualizar package.json
npm install @exainter/newsletter-sdk@1.0.0

# Ejecutar tests
npm test

# Si hay breaking changes
# 1. Revisar CHANGELOG
# 2. Actualizar importes y uso
# 3. Ejecutar tests de integración
npm run test:integration

# Si no hay breaking changes, deploy directo
```

### Cuando hay breaking changes

1. **Esperar** a que el backend soporte versión anterior
2. **Deprecation window**: 2-4 semanas
3. **Forzar upgrade** solo después del window

## EOL (End of Life)

| Versión | Release | EOL |
|---------|---------|-----|
| 1.0.0 | Nov 28, 2025 | May 28, 2026 |
| 1.1.0 | Feb 28, 2026 | Aug 28, 2026 |
| 2.0.0 | Jun 30, 2026 | Dec 30, 2026 |

**Después de EOL:**
- Sin actualizaciones de seguridad
- Sin soporte oficial
- Recomendación de upgrade

## Cambios en OpenAPI

### Monitoreando cambios

El archivo `specs/openapi-v0.3.0-staging.json` debe ser:
1. Versionado en Git
2. Actualizado cuando haya cambios en `newsletter-api`
3. Revisado antes de regenerar el SDK

### Regeneración del SDK

```bash
# Desde newsletter-api (cuando se actualiza OpenAPI)
npx openapi-typescript openapi/spec.yaml -o ../newsletter-shared/src/sdk/types.ts

# Desde newsletter-shared
cd ../newsletter-shared
npm run generate:sdk
npm run build

# Verificar cambios en cliente generado
git diff src/sdk/client.ts

# Si hay breaking changes, bump MAJOR
# Si hay nuevas funcionalidades, bump MINOR
# Si solo hay ajustes, bump PATCH
```

## Comunicación de Cambios

### Antes de Release

- Notificar a equipo de `newsletter-web`
- Crear PR con CHANGELOG
- Review de breaking changes

### Después de Release

- Tag semántico en Git
- Release notes en GitHub
- Anuncio en canal interno Slack

## Preguntas Frecuentes

**P: ¿Puedo usar alpha en producción?**
R: Solo si el backend también está en alpha. No hay garantía de estabilidad.

**P: ¿Cuánto tiempo debo esperar para actualizar?**
R: Mínimo 2 semanas después de release. Para breaking changes, espera el deprecation window.

**P: ¿Qué pasa si hay un bug crítico?**
R: Lanzamos un PATCH urgentemente y notificamos a todos los usuarios.
