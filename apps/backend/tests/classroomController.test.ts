import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Request, Response } from "express";
import type { ClassroomController as ClassroomControllerType } from "../src/controllers/classroomController.js";

const mockGetByFloor = jest.fn<(...args: unknown[]) => Promise<unknown>>();

jest.unstable_mockModule("../src/services/classroomService.js", () => ({
	ClassroomService: jest.fn().mockImplementation(() => ({
		getByFloor: mockGetByFloor,
	})),
}));

const { ClassroomController } = await import(
	"../src/controllers/classroomController.js"
);

describe("ClassroomController", () => {
	let controller: ClassroomControllerType;
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;

	beforeEach(() => {
		controller = new ClassroomController();

		mockReq = {
			params: { floorId: "1" },
		};

		mockRes = {
			status: jest.fn().mockReturnThis() as unknown as Response["status"],
			json: jest.fn() as unknown as Response["json"],
		};

		jest.clearAllMocks();
	});

	it("should return 200 with the list of classrooms for a valid floor", async () => {
		const fakeClassrooms = [
			{ id: 1, name: "Salle A", capacity: 30 },
			{ id: 2, name: "Salle B", capacity: 20 },
		];
		mockGetByFloor.mockResolvedValue(fakeClassrooms);

		await controller.getByFloor(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			classrooms: fakeClassrooms,
		});
		expect(mockGetByFloor).toHaveBeenCalledWith(1);
	});

	it("should return 200 with an empty array if the floor has no classrooms", async () => {
		mockGetByFloor.mockResolvedValue([]);

		await controller.getByFloor(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({ classrooms: [] });
	});

	it("doit retourner 400 si floorId n'est pas un nombre valide", async () => {
		mockReq = { params: { floorId: "abc" } };

		await controller.getByFloor(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Paramètre floorId invalide",
		});
		expect(mockGetByFloor).not.toHaveBeenCalled();
	});

	it("should return 500 if the service returns an error", async () => {
		mockGetByFloor.mockRejectedValue(new Error("Erreur base de données"));

		await controller.getByFloor(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Erreur base de données",
		});
	});
});
