import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1780411380110 implements MigrationInterface {
	name = "Migration1780411380110";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`Building\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Floor\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`level\` int NOT NULL, \`building_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Classroom\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`capacity\` int NOT NULL, \`has_removable_walls\` tinyint NOT NULL, \`parent_classroom_id\` bigint NULL, \`floor_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Role\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, UNIQUE INDEX \`IDX_b852abd9e268a63287bc815aab\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`User\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`email\` varchar(128) NOT NULL, \`password\` varchar(255) NOT NULL, \`role_id\` bigint NOT NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Booking\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`created_at\` datetime NOT NULL, \`start_at\` datetime NOT NULL, \`end_at\` datetime NOT NULL, \`code\` varchar(4) NULL, \`code_generate_at\` datetime NULL, \`is_synced_to_iot\` tinyint NOT NULL DEFAULT 0, \`user_id\` bigint NOT NULL, \`reserved_for_user_id\` bigint NOT NULL, \`classroom_id\` bigint NOT NULL, INDEX \`idx_Booking_classroom_id\` (\`classroom_id\`), INDEX \`idx_Booking_start_at\` (\`start_at\`), INDEX \`idx_Booking_end_at\` (\`end_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Classroom_Disablement\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`start_at\` datetime NOT NULL, \`end_at\` datetime NOT NULL, \`reason\` varchar(255) NULL, \`classroom_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Equipment\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Classroom_Equipment\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`start_at\` datetime NULL, \`end_at\` datetime NULL, \`classroom_id\` bigint NOT NULL, \`equipment_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`Log\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`remote_host\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`request_line\` varchar(500) NOT NULL, \`http_status\` int NOT NULL, \`bytes\` bigint NOT NULL, \`user_id\` bigint NULL, INDEX \`idx_Log_created_at\` (\`created_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Floor\` ADD CONSTRAINT \`FK_007987376f11fc247e008d2fb2e\` FOREIGN KEY (\`building_id\`) REFERENCES \`Building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom\` ADD CONSTRAINT \`FK_183dfdebe3f788f67d4e2dde250\` FOREIGN KEY (\`parent_classroom_id\`) REFERENCES \`Classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom\` ADD CONSTRAINT \`FK_1060d20b0318a949b463613d10d\` FOREIGN KEY (\`floor_id\`) REFERENCES \`Floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`User\` ADD CONSTRAINT \`FK_775147058c769ea57efe923d288\` FOREIGN KEY (\`role_id\`) REFERENCES \`Role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Booking\` ADD CONSTRAINT \`FK_6b1ad5f1d98ace8049587706bc2\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Booking\` ADD CONSTRAINT \`FK_df719f3a92bcee75bb5aabaf104\` FOREIGN KEY (\`reserved_for_user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Booking\` ADD CONSTRAINT \`FK_fa76fd2d4bfbb3c158c4b47c1fd\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`Classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom_Disablement\` ADD CONSTRAINT \`FK_4d6a3c02661b00180e918be961a\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`Classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom_Equipment\` ADD CONSTRAINT \`FK_9186d2031cf2992d6abd7e70d74\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`Classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom_Equipment\` ADD CONSTRAINT \`FK_e12af2a5a5c7908798a357ef21c\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`Equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`Log\` ADD CONSTRAINT \`FK_002585cdf3f53f4b0cbd72ca26d\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`Log\` DROP FOREIGN KEY \`FK_002585cdf3f53f4b0cbd72ca26d\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom_Equipment\` DROP FOREIGN KEY \`FK_e12af2a5a5c7908798a357ef21c\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom_Equipment\` DROP FOREIGN KEY \`FK_9186d2031cf2992d6abd7e70d74\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom_Disablement\` DROP FOREIGN KEY \`FK_4d6a3c02661b00180e918be961a\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Booking\` DROP FOREIGN KEY \`FK_fa76fd2d4bfbb3c158c4b47c1fd\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Booking\` DROP FOREIGN KEY \`FK_df719f3a92bcee75bb5aabaf104\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Booking\` DROP FOREIGN KEY \`FK_6b1ad5f1d98ace8049587706bc2\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`User\` DROP FOREIGN KEY \`FK_775147058c769ea57efe923d288\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom\` DROP FOREIGN KEY \`FK_1060d20b0318a949b463613d10d\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Classroom\` DROP FOREIGN KEY \`FK_183dfdebe3f788f67d4e2dde250\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`Floor\` DROP FOREIGN KEY \`FK_007987376f11fc247e008d2fb2e\``,
		);
		await queryRunner.query(`DROP INDEX \`idx_Log_created_at\` ON \`Log\``);
		await queryRunner.query(`DROP TABLE \`Log\``);
		await queryRunner.query(`DROP TABLE \`Classroom_Equipment\``);
		await queryRunner.query(`DROP TABLE \`Equipment\``);
		await queryRunner.query(`DROP TABLE \`Classroom_Disablement\``);
		await queryRunner.query(`DROP INDEX \`idx_Booking_end_at\` ON \`Booking\``);
		await queryRunner.query(
			`DROP INDEX \`idx_Booking_start_at\` ON \`Booking\``,
		);
		await queryRunner.query(
			`DROP INDEX \`idx_Booking_classroom_id\` ON \`Booking\``,
		);
		await queryRunner.query(`DROP TABLE \`Booking\``);
		await queryRunner.query(
			`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``,
		);
		await queryRunner.query(`DROP TABLE \`User\``);
		await queryRunner.query(
			`DROP INDEX \`IDX_b852abd9e268a63287bc815aab\` ON \`Role\``,
		);
		await queryRunner.query(`DROP TABLE \`Role\``);
		await queryRunner.query(`DROP TABLE \`Classroom\``);
		await queryRunner.query(`DROP TABLE \`Floor\``);
		await queryRunner.query(`DROP TABLE \`Building\``);
	}
}
