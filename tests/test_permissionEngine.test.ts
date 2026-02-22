import { PermissionEngine } from '../src/permissionEngine';
import { RoleDefinitions } from '../src/roleDefinitions';

describe('PermissionEngine', () => {
    let engine: PermissionEngine;

    beforeEach(() => {
        engine = new PermissionEngine(RoleDefinitions);
    });

    test('guest should have posts:read permission', () => {
        expect(engine.hasPermission('guest', 'posts:read')).toBe(true);
    });

    test('guest should NOT have posts:write permission', () => {
        expect(engine.hasPermission('guest', 'posts:write')).toBe(false);
    });

    test('viewer should inherit guest permissions', () => {
        expect(engine.hasPermission('viewer', 'public:read')).toBe(true);
    });

    test('editor should inherit viewer and guest permissions', () => {
        expect(engine.hasPermission('editor', 'posts:read')).toBe(true);
        expect(engine.hasPermission('editor', 'posts:write')).toBe(true);
    });

    test('admin wildcard should match specific actions', () => {
        expect(engine.hasPermission('admin', 'users:delete')).toBe(true);
        expect(engine.hasPermission('admin', 'users:create')).toBe(true);
        expect(engine.hasPermission('admin', 'settings:update')).toBe(true);
    });

    test('non-existent role should return false', () => {
        expect(engine.hasPermission('superadmin', 'posts:read')).toBe(false);
    });

    test('should handle circular inheritance without crash', () => {
        const circularRoles = {
            roleA: { permissions: ['a:read'], inherits: ['roleB'], description: 'A' },
            roleB: { permissions: ['b:read'], inherits: ['roleA'], description: 'B' },
        };
        const circularEngine = new PermissionEngine(circularRoles);
        // Should not hang or throw
        expect(() => circularEngine.hasPermission('roleA', 'a:read')).not.toThrow();
    });

    test('should validate definitions', () => {
        const badRoles = {
            broken: { permissions: [], inherits: ['nonexistent'], description: 'Bad' },
        };
        const badEngine = new PermissionEngine(badRoles);
        const errors = badEngine.validateDefinitions();
        expect(errors.length).toBeGreaterThan(0);
    });

    test('should get all roles with a specific permission', () => {
        const roles = engine.getRolesWithPermission('posts:read');
        expect(roles).toContain('guest');
        expect(roles).toContain('viewer');
        expect(roles).toContain('editor');
        expect(roles).toContain('admin');
    });
});
