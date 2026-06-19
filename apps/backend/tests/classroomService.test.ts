import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { ClassroomService as ClassroomServiceType } from "../src/services/classroomService.js";

const mockRepository = {
	find: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

jest.unstable_mockModule("../src/database/data-source.js", () => ({
	AppDataSource: {
		getRepository: jest.fn(() => mockRepository),
	},
}));

const { ClassroomService } = await import(
	"../src/services/classroomService.js"
);

describe("ClassroomService", () => {
	let classroomService: ClassroomServiceType;

	beforeEach(() => {
		classroomService = new ClassroomService();
		jest.clearAllMocks();
	});

	describe("getByFloor", () => {
		it("should return all classroom in a given floor", async () => {
			const fakeClassrooms = [
				{ id: 1, name: "Room A", capacity: 30 },
				{ id: 2, name: "Room B", capacity: 25 },
				{ id: 3, name: "Room C", capacity: 35 },
				{ id: 4, name: "Room D", capacity: 20 },
			];

			mockRepository.find.mockResolvedValueOnce(fakeClassrooms);

			const result = await classroomService.getByFloor(1);

			expect(result).toEqual(fakeClassrooms);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { floor: { id: 1 } },
			});
		});

		it("should return empty array if floor doesn't have rooms", async () => {
			mockRepository.find.mockResolvedValueOnce([]);

			const result = await classroomService.getByFloor(1);

			expect(result).toEqual([]);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { floor: { id: 1 } },
			});
		});
	});
});
