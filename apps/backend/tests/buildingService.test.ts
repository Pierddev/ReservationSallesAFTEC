import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { BuildingService as BuildingServiceType } from "../src/services/buildingService.js";

const mockRepository = {
	find: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

jest.unstable_mockModule("../src/database/data-source.js", () => ({
	AppDataSource: {
		getRepository: jest.fn(() => mockRepository),
	},
}));

const { BuildingService } = await import("../src/services/buildingService.js");

describe("BuildingService", () => {
	let buildingService: BuildingServiceType;

	beforeEach(() => {
		buildingService = new BuildingService();
		jest.clearAllMocks();
	});

	describe("getAll", () => {
		it("should return all buildings in database", async () => {
			const fakeBuildings = [
				{ id: 1, name: "Building A" },
				{ id: 2, name: "Building B" },
				{ id: 3, name: "Building C" },
				{ id: 4, name: "Building D" },
			];

			mockRepository.find.mockResolvedValueOnce(fakeBuildings);

			const result = await buildingService.getAll();

			expect(result).toEqual(fakeBuildings);
			expect(mockRepository.find).toHaveBeenCalledWith();
		});

		it("should return empty array if database is empty", async () => {
			mockRepository.find.mockResolvedValueOnce([]);
			const result = await buildingService.getAll();
			expect(result).toEqual([]);
			expect(mockRepository.find).toHaveBeenCalledWith();
		});
	});
});
