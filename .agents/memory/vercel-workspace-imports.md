---
name: Vercel workspace imports
description: Constraint for TypeScript files that Vercel compiles as standalone Node entrypoints.
---

Standalone Vercel Node entrypoints should not import workspace packages whose exports resolve to source files outside the entrypoint project's `rootDir`.

**Why:** Vercel's TypeScript compiler ignores the rootDir diagnostic but still treats the resulting compilation as `emitSkipped`, producing an error like `src/routes/health.ts: Emit skipped` even when the monorepo type check passes.

**How to apply:** Keep lightweight standalone routes self-contained, or make their imports resolve to built declarations within the deployment root. Verify with the API type check, bundle, and a direct health request.