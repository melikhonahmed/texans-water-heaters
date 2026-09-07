---
name: Pino HTTP import compatibility
description: Why the API server uses the named pinoHttp export instead of the default import.
---

Use the named `pinoHttp` export from `pino-http` when compiling the API server for Vercel or other stricter TypeScript environments.

**Why:** The default import can be interpreted as the module namespace under Vercel's TypeScript configuration, producing a non-callable middleware type and cascading implicit-`any` errors for serializer parameters.

**How to apply:** Keep `import { pinoHttp } from "pino-http"` in the API entry middleware setup and verify the package type check before deployment.