import { describe, it, expect } from 'vitest';
import SignupSchema from './signup.schema';
import LoginSchema from './login.schema';

describe('Auth Schemas', () => {
    describe('SignupSchema', () => {
        it('should validate a correct signup payload', () => {
            const result = SignupSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
            });
            expect(result.success).toBe(true);
        });

        it('should fail if name is too short', () => {
            const result = SignupSchema.safeParse({
                name: 'Jo',
                email: 'john@example.com',
                password: 'Password123!',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.flatten().fieldErrors.name?.[0]).toBe('Name must be at least 3 characters long');
            }
        });

        it('should fail with invalid email', () => {
            const result = SignupSchema.safeParse({
                name: 'John Doe',
                email: 'not-an-email',
                password: 'Password123!',
            });
            expect(result.success).toBe(false);
        });

        it('should fail if password does not meet requirements', () => {
            const result = SignupSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'simplepassword',
            });
            expect(result.success).toBe(false);
        });
    });

    describe('LoginSchema', () => {
        it('should validate a correct login payload', () => {
            const result = LoginSchema.safeParse({
                email: 'john@example.com',
                password: 'any-password',
            });
            expect(result.success).toBe(true);
        });

        it('should fail with invalid email', () => {
            const result = LoginSchema.safeParse({
                email: 'not-an-email',
                password: 'any-password',
            });
            expect(result.success).toBe(false);
        });
    });
});
