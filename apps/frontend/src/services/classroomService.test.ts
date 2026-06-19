import { describe, expect, it, vi } from "vitest";
import { type Classroom, classroomService } from "./classroomService";

// On mock le module apiService pour éviter les vrais appels HTTP
vi.mock("./apiService", () => ({
	default: {
		get: vi.fn(),
	},
}));

import api from "./apiService";

describe("classroomService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getByFloor", () => {
		it("doit retourner la liste des salles pour un étage donné", async () => {
			// Données simulées
			const fakeClassrooms: Classroom[] = [
				{ id: 1, name: "Salle 101", capacity: 30 },
				{ id: 2, name: "Salle 102", capacity: 25 },
			];

			// On simule une réponse réussie de l'API
			vi.mocked(api.get).mockResolvedValue({
				data: { classrooms: fakeClassrooms },
			});

			const result = await classroomService.getByFloor(1);

			// Vérifications
			expect(api.get).toHaveBeenCalledWith("/get-classroom-by-floor/1");
			expect(result).toEqual(fakeClassrooms);
			expect(result).toHaveLength(2);
		});

		it("doit propager l'erreur si l'API échoue", async () => {
			const apiError = { message: "Erreur serveur" };
			vi.mocked(api.get).mockRejectedValue(apiError);

			await expect(classroomService.getByFloor(99)).rejects.toEqual(apiError);
		});
	});
});
