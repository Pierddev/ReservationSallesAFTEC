import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { EquipmentService as EquipmentServiceType } from "../src/services/equipmentService.js";

const mockRepository = {
	find: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

jest.unstable_mockModule("../src/database/data-source.js", () => ({
	AppDataSource: {
		getRepository: jest.fn(() => mockRepository),
	},
}));

const { EquipmentService } = await import(
	"../src/services/equipmentService.js"
);

describe("EquipmentService", () => {
	let equipmentService: EquipmentServiceType;

	beforeEach(() => {
		equipmentService = new EquipmentService();
		jest.clearAllMocks();
	});

	describe("getAffectedByClassroom", () => {
		it("should return all equipment affected to a given classroom", async () => {
			const fakeEquipments = [
				{
					id: 1,
					classroom: { id: 1 },
					equipment: { id: 1, name: "Projector" },
				},
				{
					id: 2,
					classroom: { id: 1 },
					equipment: { id: 2, name: "Whiteboard" },
				},
			];

			mockRepository.find.mockResolvedValueOnce(fakeEquipments);

			const result = await equipmentService.getAffectedByClassroom(1);

			expect(result).toEqual(fakeEquipments);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { classroom: { id: 1 } },
				relations: { equipment: true },
			});
		});

		it("should return empty array if classroom has no equipment", async () => {
			mockRepository.find.mockResolvedValueOnce([]);

			const result = await equipmentService.getAffectedByClassroom(1);

			expect(result).toEqual([]);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { classroom: { id: 1 } },
				relations: { equipment: true },
			});
		});
	});
});
