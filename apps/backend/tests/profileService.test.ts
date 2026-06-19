import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { ProfileService as ProfileServiceType } from "../src/services/profileService.js";

const mockRepository = {
	findOne: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

jest.unstable_mockModule("../src/database/data-source.js", () => ({
	AppDataSource: {
		getRepository: jest.fn(() => mockRepository),
	},
}));

const { ProfileService } = await import("../src/services/profileService.js");

describe("ProfileService", () => {
	let profileService: ProfileServiceType;

	beforeEach(() => {
		profileService = new ProfileService();
		jest.clearAllMocks();
	});

	describe("getProfile", () => {
		it("should return the user profile when the user exists", async () => {
			const fakeUser = {
				id: 1,
				firstname: "John",
				lastname: "Doe",
				email: "john@example.com",
				password: "hashedPwd",
				role: { id: 1, name: "student" },
			};

			mockRepository.findOne.mockResolvedValueOnce(fakeUser);

			const result = await profileService.getProfile(1);

			expect(result).toEqual(fakeUser);
			expect(mockRepository.findOne).toHaveBeenCalledWith({
				where: { id: 1 },
				relations: { role: true },
			});
		});

		it("should throw an error when the user does not exist", async () => {
			mockRepository.findOne.mockResolvedValueOnce(null);

			await expect(profileService.getProfile(999)).rejects.toThrow(
				"User not found",
			);

			expect(mockRepository.findOne).toHaveBeenCalledWith({
				where: { id: 999 },
				relations: { role: true },
			});
		});
	});
});
