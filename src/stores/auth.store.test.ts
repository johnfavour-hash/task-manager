import { describe, it, expect, beforeEach } from 'vitest';
import useAuthStore from './auth.store';

describe('AuthStore', () => {
    beforeEach(() => {
        useAuthStore.getState().clearAuth();
    });

    it('should initialize with empty auth state', () => {
        const state = useAuthStore.getState();
        expect(state.token).toBe('');
        expect(state.refreshToken).toBe('');
        expect(state.expireAt).toBe('');
    });

    it('should set auth data correctly', () => {
        const authData = {
            token: 'test-token',
            refreshToken: 'test-refresh-token',
            expireAt: '2026-01-01',
        };

        useAuthStore.getState().setAuth(authData);

        const state = useAuthStore.getState();
        expect(state.token).toBe('test-token');
        expect(state.refreshToken).toBe('test-refresh-token');
        expect(state.expireAt).toBe('2026-01-01');
    });

    it('should clear auth data correctly', () => {
        const authData = {
            token: 'test-token',
            refreshToken: 'test-refresh-token',
            expireAt: '2026-01-01',
        };

        useAuthStore.getState().setAuth(authData);
        useAuthStore.getState().clearAuth();

        const state = useAuthStore.getState();
        expect(state.token).toBe('');
        expect(state.refreshToken).toBe('');
    });
});
