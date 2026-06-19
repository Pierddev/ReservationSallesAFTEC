import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Request, Response } from "express";

// mockEnv servira à simuler la configuration (variable d'environnement JWT_SECRET)
// On peut modifier mockEnv.jwtSecret entre les tests pour tester différents cas.
const mockEnv: { jwtSecret: string | undefined } = { jwtSecret: "test-secret" };

// mockJwtVerify remplace jwt.verify() pour éviter de devoir signer un vrai token JWT dans les tests.
const mockJwtVerify = jest.fn<(...args: unknown[]) => unknown>();

// On remplace le module de config par notre mock
jest.unstable_mockModule("../src/config/env.js", () => ({
	env: mockEnv,
}));

// On remplace jsonwebtoken par notre mock le "default" correspond à l'import par défaut : import jwt from "jsonwebtoken"
jest.unstable_mockModule("jsonwebtoken", () => ({
	default: { verify: mockJwtVerify },
}));

// Le middleware est importé APRÈS les mocks
const { authenticate } = await import("../src/middleware/authenticate.js");

describe("authenticate", () => {
	// On déclare nos variables de test
	let mockReq: Partial<Request> & {
		cookies?: Record<string, string>;
		userId?: number;
		role?: string;
	};
	let mockRes: Partial<Response>;
	let mockNext: jest.Mock;

	beforeEach(() => {
		mockReq = { cookies: { token: "valid-token" } };
		mockRes = {
			status: jest.fn().mockReturnThis() as unknown as Response["status"],
			json: jest.fn() as unknown as Response["json"],
		};

		mockNext = jest.fn();

		// On réinitialise tous les mocks
		jest.clearAllMocks();

		mockEnv.jwtSecret = "test-secret";
	});

	it("should return 401 if no token is provided in the cookies", () => {
		mockReq.cookies = {};

		authenticate(mockReq as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(401);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "No token provided",
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should return 401 if the token is an empty string", () => {
		mockReq.cookies = { token: "" };

		authenticate(mockReq as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(401);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "No token provided",
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should return 500 if JWT_SECRET is not defined in the environment", () => {
		mockEnv.jwtSecret = undefined;

		authenticate(mockReq as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Internal server error: JWT secret not configured",
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should call next() and store userId/role in the request if the token is valid", () => {
		const fakeDecoded = { userId: 1, role: "user" };
		mockJwtVerify.mockReturnValue(fakeDecoded);

		authenticate(mockReq as Request, mockRes as Response, mockNext);

		expect(mockJwtVerify).toHaveBeenCalledWith("valid-token", "test-secret");
		expect(mockReq.userId).toBe(1);
		expect(mockReq.role).toBe("user");
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(mockRes.json).not.toHaveBeenCalled();
		expect(mockNext).toHaveBeenCalled();
	});

	it("should return 401 if the token is invalid or expired", () => {
		mockJwtVerify.mockImplementation(() => {
			throw new Error("jwt expired");
		});

		authenticate(mockReq as Request, mockRes as Response, mockNext);

		expect(mockRes.status).toHaveBeenCalledWith(401);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "jwt expired",
		});
		expect(mockNext).not.toHaveBeenCalled();
	});
});
