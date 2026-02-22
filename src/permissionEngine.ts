/**
 * RBAC Permission Engine — checks user permissions against role-based rules.
 * 
 * This code WORKS correctly. All tests pass.
 * Your job is to REFACTOR it — improve quality without breaking functionality.
 */

// TODO (code review): These role names are magic strings scattered throughout
// the code. Extract them to an enum or constants object so typos become
// compile-time errors instead of runtime bugs.

interface Permission {
    resource: string;
    action: string;
}

interface User {
    id: string;
    roles: string[];
    directPermissions?: Permission[];
}

class PermissionEngine {
    private rolePermissions: Map<string, Permission[]> = new Map();
    private roleHierarchy: Map<string, string[]> = new Map();

    constructor() {
        // TODO (code review): This hardcoded setup should be loaded from
        // configuration, not baked into the constructor. Extract to a
        // separate config file or accept as constructor parameter.
        this.rolePermissions.set('admin', [
            { resource: 'users', action: 'read' },
            { resource: 'users', action: 'write' },
            { resource: 'users', action: 'delete' },
            { resource: 'reports', action: 'read' },
            { resource: 'reports', action: 'write' },
            { resource: 'settings', action: 'read' },
            { resource: 'settings', action: 'write' },
        ]);
        this.rolePermissions.set('manager', [
            { resource: 'users', action: 'read' },
            { resource: 'users', action: 'write' },
            { resource: 'reports', action: 'read' },
            { resource: 'reports', action: 'write' },
        ]);
        this.rolePermissions.set('viewer', [
            { resource: 'users', action: 'read' },
            { resource: 'reports', action: 'read' },
        ]);

        this.roleHierarchy.set('admin', ['manager', 'viewer']);
        this.roleHierarchy.set('manager', ['viewer']);
        this.roleHierarchy.set('viewer', []);
    }

    // TODO (code review): This method is a "god method" — it does permission
    // lookup, hierarchy traversal, direct permission check, and wildcard
    // matching all in one 40-line function. Split into smaller methods:
    // e.g., getEffectivePermissions(), matchPermission(), resolveHierarchy()
    checkAccess(user: User, resource: string, action: string): boolean {
        if (!user || !user.roles) return false;

        // Collect all permissions from all roles (including hierarchy)
        let allPermissions: Permission[] = [];

        for (const role of user.roles) {
            const rolePerms = this.rolePermissions.get(role) || [];
            allPermissions = allPermissions.concat(rolePerms);

            // Check inherited roles
            const inheritedRoles = this.roleHierarchy.get(role) || [];
            for (const inherited of inheritedRoles) {
                // TODO (code review): This permission gathering is duplicated —
                // same 3 lines appear here and in the outer loop. Extract to
                // a helper method like getAllPermissionsForRole(role)
                const inheritedPerms = this.rolePermissions.get(inherited) || [];
                allPermissions = allPermissions.concat(inheritedPerms);
            }
        }

        // Add direct permissions
        if (user.directPermissions) {
            allPermissions = allPermissions.concat(user.directPermissions);
        }

        // Check if any permission matches
        for (const perm of allPermissions) {
            if (perm.resource === resource && perm.action === action) {
                return true;
            }
            // Wildcard: '*' matches any resource/action
            if (perm.resource === '*' || perm.action === '*') {
                if (perm.resource === '*' && perm.action === action) return true;
                if (perm.resource === resource && perm.action === '*') return true;
                if (perm.resource === '*' && perm.action === '*') return true;
            }
        }

        return false;
    }

    // TODO (code review): No input validation. What happens if someone calls
    // addRole('', [])? Or addRole with a role name containing spaces?
    // Add validation: non-empty name, no special chars, non-null permissions.
    addRole(roleName: string, permissions: Permission[]): void {
        this.rolePermissions.set(roleName, permissions);
    }

    setHierarchy(roleName: string, inherits: string[]): void {
        this.roleHierarchy.set(roleName, inherits);
    }

    getRoles(): string[] {
        return Array.from(this.rolePermissions.keys());
    }

    getPermissionsForRole(roleName: string): Permission[] {
        return this.rolePermissions.get(roleName) || [];
    }
}

export { PermissionEngine, Permission, User };
