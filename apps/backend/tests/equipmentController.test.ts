import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Request, Response } from "express";
import type { EquipmentController as EquipmentControllerType } from "../src/controllers/equipmentController.js";

const mockGetAffectedByClassroom =
	jest.fn<(...args: unknown[]) => Promise<unknown>>();

jest.unstable_mockModule("../src/services/equipmentService.js", () => ({
	EquipmentService: jest.fn().mockImplementation(() => ({
		getAffectedByClassroom: mockGetAffectedByClassroom,
	})),
}));

const { EquipmentController } = await import(
	"../src/controllers/equipmentController.js"
);

describe("EquipmentController", () => {
	let controller: EquipmentControllerType;
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;

	beforeEach(() => {
		controller = new EquipmentController();

		mockReq = {
			params: { classroomId: "1" },
		};

		mockRes = {
			status: jest.fn().mockReturnThis() as unknown as Response["status"],
			json: jest.fn() as unknown as Response["json"],
		};

		jest.clearAllMocks();
	});

	it("should return 200 with the list of equipments for a valid classroom", async () => {
		const fakeEquipments = [
			{ id: 1, name: "Projecteur" },
			{ id: 2, name: "Tableau blanc" },
		];
		mockGetAffectedByClassroom.mockResolvedValue(fakeEquipments);

		await controller.getAffectedByClassroom(
			mockReq as Request,
			mockRes as Response,
		);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			affectedEquipments: fakeEquipments,
		});
		expect(mockGetAffectedByClassroom).toHaveBeenCalledWith(1);
	});

	it("should return 200 with an empty array if the classroom has no equipments", async () => {
		mockGetAffectedByClassroom.mockResolvedValue([]);

		await controller.getAffectedByClassroom(
			mockReq as Request,
			mockRes as Response,
		);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({
			affectedEquipments: [],
		});
	});

	it("should return 400 if classroomId is not a valid number", async () => {
		mockReq = { params: { classroomId: "abc" } };

		await controller.getAffectedByClassroom(
			mockReq as Request,
			mockRes as Response,
		);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Paramètre classroomId invalide",
		});
		expect(mockGetAffectedByClassroom).not.toHaveBeenCalled();
	});

	it("should return 500 if the service returns an error", async () => {
		mockGetAffectedByClassroom.mockRejectedValue(
			new Error("Erreur base de données"),
		);

		await controller.getAffectedByClassroom(
			mockReq as Request,
			mockRes as Response,
		);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			message: "Erreur base de données",
		});
	});
});
