/**
 * Role Definitions — type definitions and constants for the RBAC system.
 * 
 * This code WORKS correctly. All tests pass.
 * Your job is to REFACTOR it — improve quality without breaking functionality.
 */

// TODO (code review): These definitions should be the single source of truth
// for role names, but the PermissionEngine constructor duplicates them.
// After refactoring, the PermissionEngine should import and use these
// instead of defining its own hardcoded strings.

const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    VIEWER: 'viewer',
};

const RESOURCES = {
    USERS: 'users',
    REPORTS: 'reports',
    SETTINGS: 'settings',
};

const ACTIONS = {
    READ: 'read',
    WRITE: 'write',
    DELETE: 'delete',
};

// TODO (code review): This default role config exists but is never used
// by PermissionEngine. The engine has its own hardcoded copy.
// After refactoring, the engine should accept this as constructor input.
const DEFAULT_ROLE_CONFIG = {
    [ROLES.ADMIN]: [
        { resource: RESOURCES.USERS, action: ACTIONS.READ },
        { resource: RESOURCES.USERS, action: ACTIONS.WRITE },
        { resource: RESOURCES.USERS, action: ACTIONS.DELETE },
        { resource: RESOURCES.REPORTS, action: ACTIONS.READ },
        { resource: RESOURCES.REPORTS, action: ACTIONS.WRITE },
        { resource: RESOURCES.SETTINGS, action: ACTIONS.READ },
        { resource: RESOURCES.SETTINGS, action: ACTIONS.WRITE },
    ],
    [ROLES.MANAGER]: [
        { resource: RESOURCES.USERS, action: ACTIONS.READ },
        { resource: RESOURCES.USERS, action: ACTIONS.WRITE },
        { resource: RESOURCES.REPORTS, action: ACTIONS.READ },
        { resource: RESOURCES.REPORTS, action: ACTIONS.WRITE },
    ],
    [ROLES.VIEWER]: [
        { resource: RESOURCES.USERS, action: ACTIONS.READ },
        { resource: RESOURCES.REPORTS, action: ACTIONS.READ },
    ],
};

const DEFAULT_HIERARCHY = {
    [ROLES.ADMIN]: [ROLES.MANAGER, ROLES.VIEWER],
    [ROLES.MANAGER]: [ROLES.VIEWER],
    [ROLES.VIEWER]: [],
};

export { ROLES, RESOURCES, ACTIONS, DEFAULT_ROLE_CONFIG, DEFAULT_HIERARCHY };
