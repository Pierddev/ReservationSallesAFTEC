import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Request, Response } from "express";
import type { FloorController as FloorControllerType } from "../src/controllers/floorController.js";

const mockGetByBuilding = jest.fn<(...args: unknown[]) => Promise<unknown>>();

jest.unstable_mockModule("../src/services/floorService.js", () => ({
	FloorService: jest.fn().mockImplementation(() => ({
		getByBuilding: mockGetByBuilding,
	})),
}));

const { FloorController } = await import(
	"../src/controllers/floorController.js"
);

describe("FloorController", () => {
	let controller: FloorControllerType;
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;

	beforeEach(() => {
		controller = new FloorController();

		mockReq = {
			params: { buildingId: "1" },
		};

		mockRes = {
			status: jest.fn().mockReturnThis() as unknown as Response["status"],
			json: jest.fn() as unknown as Response["json"],
		};

		jest.clearAllMocks();
	});

	it("should return 200 with the list of floors for a valid building", async () => {
		const fakeFloors = [
			{ id: 1, name: "Rez-de-chaussée" },
			{ id: 2, name: "1er étage" },
		];
		mockGetByBuilding.mockResolvedValue(fakeFloors);

		await controller.getByBuilding(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			floors: fakeFloors,
		});
		expect(mockGetByBuilding).toHaveBeenCalledWith(1);
	});

	it("should return 200 with an empty array if the building has no floors", async () => {
		mockGetByBuilding.mockResolvedValue([]);

		await controller.getByBuilding(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({ floors: [] });
	});

	it("should return 400 if buildingId is not a valid number", async () => {
		mockReq = { params: { buildingId: "abc" } };

		await controller.getByBuilding(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Paramètre buildingId Invalide",
		});
		expect(mockGetByBuilding).not.toHaveBeenCalled();
	});

	it("should return 500 if the service returns an error", async () => {
		mockGetByBuilding.mockRejectedValue(new Error("Erreur base de données"));

		await controller.getByBuilding(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Erreur base de données",
		});
	});
});
