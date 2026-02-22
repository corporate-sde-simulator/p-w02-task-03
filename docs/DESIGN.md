# ADR-017: RBAC Model â€” Flat vs Hierarchical Roles

**Date:**  
**Status:** Accepted  
**Authors:** Anil Sharma, Divya Nair

## Decision

Use **hierarchical RBAC** with role inheritance rather than flat role-permission mappings.

## Context

The platform needs fine-grained access control. We have 4 roles with overlapping permissions. Flat RBAC would require duplicating permissions across roles.

## Options Considered

| Approach | Flexibility | Complexity | Maintainability |
|---|---|---|---|
| Flat (role â†’ permissions) | Low | Low | Poor (duplication) |
| Hierarchical (role inherits role) | High | Medium | Good |
| ABAC (attribute-based) | Very high | High | Complex |

## Rationale

- Hierarchical RBAC eliminates permission duplication
- Adding a new permission to "viewer" automatically applies to "editor" and "admin"
- Simpler than full ABAC while meeting our requirements
- Standard model used by AWS IAM, GitHub, etc.

## Consequences

- Must handle circular inheritance (cycle detection required)
- Permission resolution is recursive (cache resolved permissions for performance)
- Wildcard permissions (`resource:*`) need careful matching logic
