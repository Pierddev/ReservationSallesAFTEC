import api from "./apiService";

export interface Classroom {
	id: number;
	name: string;
	capacity: number;
}

export interface GetClassroomsResponse {
	classrooms: Classroom[];
}

export const classroomService = {
	/**
	 * Récupère les salles de classe associées à un étage.
	 * @param floorId L'identifiant de l'étage
	 */
	async getByFloor(floorId: number): Promise<Classroom[]> {
		const response = await api.get<GetClassroomsResponse>(
			`/get-classroom-by-floor/${floorId}`,
		);
		return response.data.classrooms;
	},
};
