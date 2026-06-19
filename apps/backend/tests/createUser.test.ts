import { describe, expect, it } from "@jest/globals";
import { createUserSchema } from "../src/dtos/createUser.dto.js";

describe("createUserSchema", () => {
	it("should accept valid user data", () => {
		const result = createUserSchema.parse({
			firstname: "John",
			lastname: "Doe",
			email: "john@example.com",
			password: "password123",
		});
		expect(result).toEqual({
			firstname: "John",
			lastname: "Doe",
			email: "john@example.com",
			password: "password123",
		});
	});

	it("should accept firstname at max length", () => {
		const result = createUserSchema.parse({
			firstname: "a".repeat(50),
			lastname: "Doe",
			email: "john@example.com",
			password: "password123",
		});
		expect(result.firstname).toBe("a".repeat(50));
	});

	// Security concern: "aaaaaaaaaa" (10 chars) passes validation.
	// The schema only enforces min length, not complexity.
	// TODO: Add password complexity rules (uppercase, lowercase, digit, special char)
	it("should accept password at minimum length even if weak", () => {
		const result = createUserSchema.parse({
			firstname: "John",
			lastname: "Doe",
			email: "john@example.com",
			password: "aaaaaaaaaa",
		});
		expect(result.password).toBe("aaaaaaaaaa");
	});

	it("should reject empty firstname", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "",
				lastname: "Doe",
				email: "john@example.com",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject firstname exceeding max length", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "a".repeat(51),
				lastname: "Doe",
				email: "john@example.com",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject empty lastname", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "",
				email: "john@example.com",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject lastname exceeding max length", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "a".repeat(51),
				email: "john@example.com",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject invalid email", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "Doe",
				email: "not-an-email",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject empty email", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "Doe",
				email: "",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject short password", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "Doe",
				email: "john@example.com",
				password: "short",
			}),
		).toThrow();
	});

	it("should reject empty password", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "Doe",
				email: "john@example.com",
				password: "",
			}),
		).toThrow();
	});

	it("should reject missing firstname", () => {
		expect(() =>
			createUserSchema.parse({
				lastname: "Doe",
				email: "john@example.com",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject missing lastname", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				email: "john@example.com",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject missing email", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "Doe",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject missing password", () => {
		expect(() =>
			createUserSchema.parse({
				firstname: "John",
				lastname: "Doe",
				email: "john@example.com",
			}),
		).toThrow();
	});
});
