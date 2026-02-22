# Meeting Notes — Sprint 24 Planning

**Date:** Feb 17, 2026  
**Attendees:** Anil (Security Lead), Divya, Rohan, Intern

---

## RBAC Engine

- **Anil:** The scattered auth checks are a security risk — we had two bypass incidents last quarter. We need centralized RBAC. @Intern, Divya's code is ready for bugfixes. Take PLATFORM-2855.

- **Divya:** The role hierarchy resolution is the hardest part. I'm recursively resolving inherited permissions but I think there's an issue where circular references could cause a stack overflow. Also, my wildcard matching only checks for exact `*` — it should match `posts:*` against `posts:write`.

- **Rohan:** Watch out for the role definitions JSON — make sure undefined roles fail gracefully.

## Action Items

- [ ] @Intern — Fix RBAC engine bugs (PLATFORM-2855)
- [ ] @Divya — On compliance audit, available via Slack
- [ ] @Rohan — Add RBAC to API gateway after merge
