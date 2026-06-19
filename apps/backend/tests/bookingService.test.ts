import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { BookingService as BookingServiceType } from "../src/services/bookingService.js";

const mockRepository = {
	findOneBy: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
	findOne: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
	find: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
	create: jest.fn<(...args: unknown[]) => unknown>(),
	save: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

jest.unstable_mockModule("../src/database/data-source.js", () => ({
	AppDataSource: {
		getRepository: jest.fn(() => mockRepository),
	},
}));

const { BookingService } = await import("../src/services/bookingService.js");

describe("BookingService", () => {
	let bookingService: BookingServiceType;

	beforeEach(() => {
		bookingService = new BookingService();
		jest.clearAllMocks();
	});

	describe("getConflictingBookings", () => {
		it("should return conflicting bookings when they exist", async () => {
			const fakeConflicts = [{ id: 1, title: "Conflicting booking" }];

			mockRepository.find.mockResolvedValueOnce(fakeConflicts);

			const start_at = new Date("2026-06-20T10:00:00Z");
			const end_at = new Date("2026-06-20T12:00:00Z");

			const result = await bookingService.getConflictingBookings(
				1,
				start_at,
				end_at,
			);

			expect(result).toEqual(fakeConflicts);
			expect(mockRepository.find).toHaveBeenCalledWith({
				where: {
					classroom: { id: 1 },
					start_at: expect.anything(),
					end_at: expect.anything(),
				},
			});
		});

		it("should return empty array when there are no conflicts", async () => {
			mockRepository.find.mockResolvedValueOnce([]);

			const start_at = new Date("2026-06-20T10:00:00Z");
			const end_at = new Date("2026-06-20T12:00:00Z");

			const result = await bookingService.getConflictingBookings(
				1,
				start_at,
				end_at,
			);

			expect(result).toEqual([]);
		});
	});

	describe("getByClassroom", () => {
		it("should return all bookings for a given classroom", async () => {
			const fakeBookings = [
				{ id: 1, title: "Booking A" },
				{ id: 2, title: "Booking B" },
			];

			mockRepository.find.mockResolvedValueOnce(fakeBookings);

			const result = await bookingService.getByClassroom(1);

			expect(result).toEqual(fakeBookings);
			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { classroom: { id: 1 } },
			});
		});

		it("should return empty array if classroom has no bookings", async () => {
			mockRepository.find.mockResolvedValueOnce([]);

			const result = await bookingService.getByClassroom(1);

			expect(result).toEqual([]);
		});
	});

	describe("create", () => {
		const start_at = new Date("2026-06-20T10:00:00Z");
		const end_at = new Date("2026-06-20T12:00:00Z");

		const fakeClassroom = { id: 1, name: "Room A" };
		const fakeUser = { id: 2, firstname: "John", lastname: "Doe" };
		const fakeNewBooking = {
			id: 10,
			title: "Test booking",
			user: { id: 1 },
			reservedForUser: { id: 2 },
			classroom: { id: 1 },
			start_at,
			end_at,
			created_at: expect.any(Date),
		};

		it("should create a booking successfully without equipment", async () => {
			const dto = {
				title: "Test booking",
				classroomId: 1,
				reservedForUserId: 2,
				start_at,
				end_at,
			};

			mockRepository.findOneBy
				.mockResolvedValueOnce(fakeClassroom) // classroom found
				.mockResolvedValueOnce(fakeUser); // user found
			mockRepository.find.mockResolvedValueOnce([]); // no conflicts
			mockRepository.findOne.mockResolvedValueOnce(null); // not disabled
			mockRepository.create.mockReturnValueOnce(fakeNewBooking);
			mockRepository.save.mockResolvedValueOnce(fakeNewBooking);

			const result = await bookingService.create(dto, 1);

			expect(result).toEqual(fakeNewBooking);
			expect(mockRepository.create).toHaveBeenCalledWith({
				title: "Test booking",
				user: { id: 1 },
				reservedForUser: { id: 2 },
				classroom: { id: 1 },
				created_at: expect.any(Date),
				start_at,
				end_at,
			});
			expect(mockRepository.save).toHaveBeenCalledWith(fakeNewBooking);
		});

		it("should create a booking successfully with equipment", async () => {
			const dto = {
				title: "Test booking with equip",
				classroomId: 1,
				reservedForUserId: 2,
				start_at,
				end_at,
				equipmentIds: [1, 2],
			};

			mockRepository.findOneBy
				.mockResolvedValueOnce(fakeClassroom) // classroom found
				.mockResolvedValueOnce(fakeUser); // user found
			mockRepository.find.mockResolvedValueOnce([]); // no conflicts
			mockRepository.findOne
				.mockResolvedValueOnce(null) // not disabled
				.mockResolvedValueOnce(null) // equipment 1 not reserved
				.mockResolvedValueOnce(null); // equipment 2 not reserved
			mockRepository.create.mockReturnValueOnce(fakeNewBooking);
			mockRepository.save
				.mockResolvedValueOnce(fakeNewBooking) // booking saved
				.mockResolvedValueOnce(undefined); // equipments saved

			const result = await bookingService.create(dto, 1);

			expect(result).toEqual(fakeNewBooking);
			expect(mockRepository.save).toHaveBeenCalledTimes(2);
		});

		it("should throw if classroom does not exist", async () => {
			const dto = {
				title: "Test",
				classroomId: 999,
				reservedForUserId: 2,
				start_at,
				end_at,
			};

			mockRepository.findOneBy.mockResolvedValueOnce(null); // classroom not found

			await expect(bookingService.create(dto, 1)).rejects.toThrow(
				"L'ID de la salle n'existe pas.",
			);
		});

		it("should throw if user does not exist", async () => {
			const dto = {
				title: "Test",
				classroomId: 1,
				reservedForUserId: 999,
				start_at,
				end_at,
			};

			mockRepository.findOneBy
				.mockResolvedValueOnce(fakeClassroom) // classroom found
				.mockResolvedValueOnce(null); // user not found

			await expect(bookingService.create(dto, 1)).rejects.toThrow(
				"L'ID de l'utilisateur n'existe pas",
			);
		});

		it("should throw if there is a conflicting booking", async () => {
			const dto = {
				title: "Test",
				classroomId: 1,
				reservedForUserId: 2,
				start_at,
				end_at,
			};

			mockRepository.findOneBy
				.mockResolvedValueOnce(fakeClassroom)
				.mockResolvedValueOnce(fakeUser);
			mockRepository.find.mockResolvedValueOnce([{ id: 99 }]); // conflict found

			await expect(bookingService.create(dto, 1)).rejects.toThrow(
				"La salle est déjà réservée sur ce créneau",
			);
		});

		it("should throw if the classroom is disabled", async () => {
			const dto = {
				title: "Test",
				classroomId: 1,
				reservedForUserId: 2,
				start_at,
				end_at,
			};

			mockRepository.findOneBy
				.mockResolvedValueOnce(fakeClassroom)
				.mockResolvedValueOnce(fakeUser);
			mockRepository.find.mockResolvedValueOnce([]); // no conflicts
			mockRepository.findOne.mockResolvedValueOnce({ id: 1 }); // disabled

			await expect(bookingService.create(dto, 1)).rejects.toThrow(
				"La salle est temporairement désactivée",
			);
		});

		it("should throw if an equipment is already reserved", async () => {
			const dto = {
				title: "Test",
				classroomId: 1,
				reservedForUserId: 2,
				start_at,
				end_at,
				equipmentIds: [5],
			};

			mockRepository.findOneBy
				.mockResolvedValueOnce(fakeClassroom)
				.mockResolvedValueOnce(fakeUser);
			mockRepository.find.mockResolvedValueOnce([]); // no conflicts
			mockRepository.findOne
				.mockResolvedValueOnce(null) // not disabled
				.mockResolvedValueOnce({ id: 1 }); // equipment already reserved

			await expect(bookingService.create(dto, 1)).rejects.toThrow(
				"L'équipement est déjà réservé sur ce créneau",
			);
		});
	});
});
