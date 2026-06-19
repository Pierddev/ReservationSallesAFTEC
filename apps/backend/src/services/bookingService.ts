import { LessThan, MoreThan } from "typeorm";
import { AppDataSource } from "../database/data-source.js";
import type { createBookingDto } from "../dtos/createBooking.dto.js";
import { Booking } from "../entity/Booking.entity.js";
import { Classroom } from "../entity/Classroom.entity.js";
import { ClassroomDisablement } from "../entity/ClassroomDisablement.entity.js";
import { ClassroomEquipment } from "../entity/ClassroomEquipment.entity.js";
import { User } from "../entity/User.entity.js";

export class BookingService {
	// Vérifie les conflits lors de la réservation (si un créneau demandé chevauche un créneau éxistant)
	async getConflictingBookings(
		classroomId: number,
		start_at: Date,
		end_at: Date,
	): Promise<Booking[]> {
		const bookingRepository = AppDataSource.getRepository(Booking);
		return await bookingRepository.find({
			where: {
				classroom: { id: classroomId },
				start_at: LessThan(end_at),
				end_at: MoreThan(start_at),
			},
		});
	}

	async getByClassroom(classroomId: number): Promise<Booking[]> {
		const bookingRepository = AppDataSource.getRepository(Booking);
		return await bookingRepository.find({
			where: { classroom: { id: classroomId } },
		});
	}

	async create(dto: createBookingDto, userId: number) {

		const classroomRepository = AppDataSource.getRepository(Classroom);
		const userRepository = AppDataSource.getRepository(User);
		const classroomDisablementRepository =
			AppDataSource.getRepository(ClassroomDisablement);
		const bookingRepository = AppDataSource.getRepository(Booking);

		const existingClassroom = await classroomRepository.findOneBy({
			id: dto.classroomId,
		});
		if (!existingClassroom) {
			throw new Error("L'ID de la salle n'existe pas.");
		}

		const existingUser = await userRepository.findOneBy({
			id: dto.reservedForUserId,
		});
		if (!existingUser) {
			throw new Error("L'ID de l'utilisateur n'existe pas");
		}

		// Vérification qu'il n'y ait pas de conflit dans la base de données
		const conflicting = await this.getConflictingBookings(
			dto.classroomId,
			dto.start_at,
			dto.end_at,
		);
		if (conflicting.length > 0) {
			throw new Error("La salle est déjà réservée sur ce créneau");
		}

		// Vérification que la salle n'est pas désactivée
		const classroomDisabled = await classroomDisablementRepository.findOne({
			where: {
				classroom: { id: dto.classroomId },
				start_at: LessThan(dto.end_at),
				end_at: MoreThan(dto.start_at),
			},
		});

		if (classroomDisabled) {
			throw new Error("La salle est temporairement désactivée");
		}

		if (dto.equipmentIds && dto.equipmentIds.length > 0) {
			const classroomEquipmentRepository =
				AppDataSource.getRepository(ClassroomEquipment);

			for (const equipmentId of dto.equipmentIds) {
				const alreadyReserved = await classroomEquipmentRepository.findOne({
					where: {
						classroom: { id: dto.classroomId },
						equipment: { id: equipmentId },
						start_at: LessThan(dto.end_at),
						end_at: MoreThan(dto.start_at),
					},
				});

				if (alreadyReserved) {
					throw new Error("L'équipement est déjà réservé sur ce créneau");
				}
			}
		}

		const newBooking = bookingRepository.create({
			title: dto.title,
			user: { id: userId },
			reservedForUser: { id: dto.reservedForUserId },
			classroom: { id: dto.classroomId },
			created_at: new Date(),
			start_at: dto.start_at,
			end_at: dto.end_at,
		});
		await bookingRepository.save(newBooking);

		if (dto.equipmentIds && dto.equipmentIds.length > 0) {
			const classroomEquipmentRepository =
				AppDataSource.getRepository(ClassroomEquipment);
			const equipmentEntries = dto.equipmentIds.map((equipmentId) => ({
				classroom: { id: dto.classroomId },
				equipment: { id: equipmentId },
				start_at: dto.start_at,
				end_at: dto.end_at,
			}));
			await classroomEquipmentRepository.save(equipmentEntries);
		}

		return newBooking;
	}
}
