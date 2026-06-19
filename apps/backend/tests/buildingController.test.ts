import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Request, Response } from "express";
import type { BuildingController as BuildingControllerType } from "../src/controllers/buildingController.js";

const mockGetAll = jest.fn<(...args: unknown[]) => Promise<unknown>>();

jest.unstable_mockModule("../src/services/buildingService.js", () => ({
	BuildingService: jest.fn().mockImplementation(() => ({
		getAll: mockGetAll,
	})),
}));

// Le contrôleur est importé APRÈS les mocks
const { BuildingController } = await import(
	"../src/controllers/buildingController.js"
);

describe("BuildingController", () => {
	let controller: BuildingControllerType;
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;

	// beforeEach s'exécute avant chaque test
	beforeEach(() => {
		controller = new BuildingController();

		// req : on crée une requête minimale (le contrôleur n'utilise pas req)
		mockReq = {};

		mockRes = {
			status: jest.fn().mockReturnThis() as unknown as Response["status"],
			json: jest.fn() as unknown as Response["json"],
		};

		// On réinitialise tous les mocks
		jest.clearAllMocks();
	});

	it("should return 200 with the list of buildings", async () => {
		// On simule des données renvoyées par le service
		const fakeBuildings = [
			{ id: 1, name: "Bâtiment A" },
			{ id: 2, name: "Bâtiment B" },
		];
		mockGetAll.mockResolvedValue(fakeBuildings);

		await controller.getAll(mockReq as Request, mockRes as Response);

		// Vérifications
		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			buildings: fakeBuildings,
		});
	});

	it("should return 200 with an empty array if there are no buildings", async () => {
		mockGetAll.mockResolvedValue([]);

		await controller.getAll(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({ buildings: [] });
	});

	it("should return 500 if the service returns an error", async () => {
		// On simule une erreur dans le service
		mockGetAll.mockRejectedValue(new Error("Erreur base de données"));

		await controller.getAll(mockReq as Request, mockRes as Response);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Erreur base de données",
		});
	});
});
