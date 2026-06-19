import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { FloorService as FloorServiceType } from "../src/services/floorService.js";

const mockRepository = {
	find: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

jest.unstable_mockModule("../src/database/data-source.js", () => ({
	AppDataSource: {
		getRepository: jest.fn(() => mockRepository),
	},
}));

const { FloorService } = await import("../src/services/floorService.js");

describe("FloorService", () => {
	let floorService: FloorServiceType;

	beforeEach(() => {
		floorService = new FloorService();
		jest.clearAllMocks();
	});

	describe("getByBuilding", () => {
		it("should return all floors in a given building", async () => {
			const fakeFloors = [
				{ id: 1, level: 0, building: { id: 1 } },
				{ id: 2, level: 1, building: { id: 1 } },
				{ id: 3, level: 2, building: { id: 1 } },
			];

			mockRepository.find.mockResolvedValueOnce(fakeFloors);

			const result = await floorService.getByBuilding(1);

			expect(result).toEqual(fakeFloors);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { building: { id: 1 } },
			});
		});

		it("should return empty array if building doesn't have floors", async () => {
			mockRepository.find.mockResolvedValueOnce([]);

			const result = await floorService.getByBuilding(1);

			expect(result).toEqual([]);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { building: { id: 1 } },
			});
		});
	});
});
