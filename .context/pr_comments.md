# PR #392 Review — RBAC Permission Engine (by Divya Nair)

## Reviewer: Anil Sharma (Security Lead) — Feb 14, 2026

---

**Overall:** Good design, critical bugs to fix.

### `permissionEngine.ts`

> **Line 38** — `resolvePermissions` method:  
> You recursively call `resolvePermissions` for inherited roles, but there's no cycle detection. If someone creates `roleA inherits roleB` and `roleB inherits roleA`, this will stack overflow.

> **Line 55** — `hasPermission` method:  
> Wildcard check is wrong. You're checking `permission === 'resource:*'` but you need to extract the resource part and compare. e.g., user has `posts:*`, checking `posts:write` should return true.

### `roleDefinitions.ts`

> Clean structure. Consider freezing the role definitions to prevent runtime mutation.

---

**Divya Nair** — Feb 15, 2026

> The cycle detection is a real risk. I'd suggest using a visited set. The wildcard thing is a logic error on my part — I was checking for literal `*` string.
