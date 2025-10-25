# Newsletter Shared

Librería compartida para **Newsletter SaaS**.  
Contiene utilidades, tipos y el SDK generado automáticamente desde el contrato OpenAPI de `newsletter-api`.

---
## 📂 Estructura

```
src/
 ├── index.ts          # punto de entrada
 └── sdk/              # SDK generado desde OpenAPI (pendiente)
```

---
## 🚀 Desarrollo local

```bash
npm install
npm run build
```

Por ahora, el paquete está marcado como `"private": true` (no publicado).  
En el futuro se podrá publicar en GitHub Packages como:

```
@exainter/newsletter-shared
```

---
## 🔧 Generación del SDK (manual)

Ejemplo de comando (desde `newsletter-api`):

```bash
npx openapi-typescript openapi/spec.yaml -o ../newsletter-shared/src/sdk/types.ts
cd ../newsletter-shared && npm run build
```

---
## 🧩 Próximos pasos

- Integrar el SDK en el frontend (`newsletter-web`).
- Compartir validadores y modelos comunes (`Tenant`, `Campaign`, `User`).
- Añadir versionado semántico (SemVer) cuando se publique.

# @exainter/newsletter-shared


Paquete para tipos, utilidades y **SDK generado desde OpenAPI** (publicado por `newsletter-api`).
Por ahora es un esqueleto sin publicar (private).

## Estructura
- `src/index.ts` — punto de entrada.
- `src/sdk/` — aquí vivirá el SDK generado.

## Construir (opcional)
npm install --save-dev typescript
npm run build
