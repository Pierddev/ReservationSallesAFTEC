import { describe, expect, it } from "@jest/globals";
import { loginUserSchema } from "../src/dtos/loginUser.dto.js";

describe("loginUserSchema", () => {
	it("should accept valid login data", () => {
		const result = loginUserSchema.parse({
			email: "test@example.com",
			password: "password123",
		});
		expect(result).toEqual({
			email: "test@example.com",
			password: "password123",
		});
	});

	it("should reject an invalid email", () => {
		expect(() =>
			loginUserSchema.parse({
				email: "not-an-email",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject a short password", () => {
		expect(() =>
			loginUserSchema.parse({
				email: "test@example.com",
				password: "short",
			}),
		).toThrow();
	});

	it("should reject empty email", () => {
		expect(() =>
			loginUserSchema.parse({
				email: "",
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject empty password", () => {
		expect(() =>
			loginUserSchema.parse({
				email: "test@example.com",
				password: "",
			}),
		).toThrow();
	});

	it("should reject missing email", () => {
		expect(() =>
			loginUserSchema.parse({
				password: "password123",
			}),
		).toThrow();
	});

	it("should reject missing password", () => {
		expect(() =>
			loginUserSchema.parse({
				email: "test@example.com",
			}),
		).toThrow();
	});
});
