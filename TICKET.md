# PLATFORM-2855: Refactor RBAC permission engine

**Status:** In Progress Â· **Priority:** Medium
**Sprint:** Sprint 24 Â· **Story Points:** 5
**Reporter:** Arjun Mehta (Security Lead) Â· **Assignee:** You (Intern)
**Created:** Â· **Due:** End of sprint (Friday)
**Labels:** `backend`, `security`, `typescript`, `refactor`
**Epic:** PLATFORM-2850 (Auth Platform Hardening)
**Task Type:** ðŸ”§ Code Maintenance

---

## Description

The RBAC (Role-Based Access Control) permission engine **works correctly** â€” all tests pass. However, the code has significant quality issues from a rushed initial implementation. Your task is to **refactor the code without breaking any existing tests**.

This is a MAINTENANCE task. The code works. You are improving its quality, not fixing bugs.

## What Needs Improvement

Look for `// TODO (code review):` comments in the source files. Key issues:
- Magic strings used instead of constants/enums
- Permission checks duplicated across multiple methods
- No input validation on role/permission names
- God method (`checkAccess`) doing too many things
- No JSDoc/documentation on public methods
- Hardcoded role hierarchy instead of configurable

## Acceptance Criteria

- [ ] All `// TODO (code review):` items addressed
- [ ] Magic strings replaced with typed constants or enums
- [ ] Duplicated permission logic extracted to shared helper
- [ ] Input validation added for role and permission names
- [ ] `checkAccess` split into smaller, focused methods
- [ ] All existing tests still pass (zero regressions)
- [ ] Public methods have JSDoc documentation

## Design Notes

See `docs/DESIGN.md` for the auth architecture.
