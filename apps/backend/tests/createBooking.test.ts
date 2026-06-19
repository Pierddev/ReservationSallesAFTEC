import { describe, expect, it } from "@jest/globals";
import { createBookingSchema } from "../src/dtos/createBooking.dto.js";

describe("createBookingSchema", () => {
	it("should accept valid booking data without equipment", () => {
		const result = createBookingSchema.parse({
			title: "Test booking",
			reservedForUserId: 1,
			classroomId: 2,
			start_at: new Date("2026-06-20T10:00:00Z"),
			end_at: new Date("2026-06-20T12:00:00Z"),
		});
		expect(result.title).toBe("Test booking");
		expect(result.reservedForUserId).toBe(1);
		expect(result.classroomId).toBe(2);
	});

	it("should accept valid booking data with equipment", () => {
		const result = createBookingSchema.parse({
			title: "Test booking",
			reservedForUserId: 1,
			classroomId: 2,
			start_at: new Date("2026-06-20T10:00:00Z"),
			end_at: new Date("2026-06-20T12:00:00Z"),
			equipmentIds: [1, 2, 3],
		});
		expect(result.equipmentIds).toEqual([1, 2, 3]);
	});

	it("should accept dates as ISO strings (coercion)", () => {
		const result = createBookingSchema.parse({
			title: "Test booking",
			reservedForUserId: 1,
			classroomId: 2,
			start_at: "2026-06-20T10:00:00Z",
			end_at: "2026-06-20T12:00:00Z",
		});
		expect(result.start_at).toBeInstanceOf(Date);
		expect(result.end_at).toBeInstanceOf(Date);
	});

	it("should accept empty equipment array", () => {
		const result = createBookingSchema.parse({
			title: "Test booking",
			reservedForUserId: 1,
			classroomId: 2,
			start_at: new Date("2026-06-20T10:00:00Z"),
			end_at: new Date("2026-06-20T12:00:00Z"),
			equipmentIds: [],
		});
		expect(result.equipmentIds).toEqual([]);
	});

	it("should reject empty title", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "",
				reservedForUserId: 1,
				classroomId: 2,
				start_at: new Date("2026-06-20T10:00:00Z"),
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject title exceeding max length", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "a".repeat(101),
				reservedForUserId: 1,
				classroomId: 2,
				start_at: new Date("2026-06-20T10:00:00Z"),
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject missing reservedForUserId", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				classroomId: 2,
				start_at: new Date("2026-06-20T10:00:00Z"),
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject missing classroomId", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: 1,
				start_at: new Date("2026-06-20T10:00:00Z"),
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject missing start_at", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: 1,
				classroomId: 2,
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject missing end_at", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: 1,
				classroomId: 2,
				start_at: new Date("2026-06-20T10:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject end_at before start_at", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: 1,
				classroomId: 2,
				start_at: new Date("2026-06-20T12:00:00Z"),
				end_at: new Date("2026-06-20T10:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject end_at equal to start_at", () => {
		const date = new Date("2026-06-20T10:00:00Z");
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: 1,
				classroomId: 2,
				start_at: date,
				end_at: date,
			}),
		).toThrow();
	});

	it("should reject invalid date string", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: 1,
				classroomId: 2,
				start_at: "not-a-date",
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject non-number reservedForUserId", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: "abc",
				classroomId: 2,
				start_at: new Date("2026-06-20T10:00:00Z"),
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});

	it("should reject non-number classroomId", () => {
		expect(() =>
			createBookingSchema.parse({
				title: "Test",
				reservedForUserId: 1,
				classroomId: null,
				start_at: new Date("2026-06-20T10:00:00Z"),
				end_at: new Date("2026-06-20T12:00:00Z"),
			}),
		).toThrow();
	});
});
