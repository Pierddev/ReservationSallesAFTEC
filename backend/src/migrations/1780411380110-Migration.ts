import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1780411380110 implements MigrationInterface {
	name = "Migration1780411380110";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`building\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`floor\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`level\` int NOT NULL, \`building_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`classroom\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`capacity\` int NOT NULL, \`has_removable_walls\` tinyint NOT NULL, \`parent_classroom_id\` bigint NULL, \`floor_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`role\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, UNIQUE INDEX \`IDX_b852abd9e268a63287bc815aab\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`user\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`email\` varchar(128) NOT NULL, \`password\` varchar(255) NOT NULL, \`role_id\` bigint NOT NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`booking\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`created_at\` datetime NOT NULL, \`start_at\` datetime NOT NULL, \`end_at\` datetime NOT NULL, \`code\` varchar(4) NULL, \`code_generate_at\` datetime NULL, \`is_synced_to_iot\` tinyint NOT NULL DEFAULT 0, \`user_id\` bigint NOT NULL, \`reserved_for_user_id\` bigint NOT NULL, \`classroom_id\` bigint NOT NULL, INDEX \`idx_Booking_classroom_id\` (\`classroom_id\`), INDEX \`idx_Booking_start_at\` (\`start_at\`), INDEX \`idx_Booking_end_at\` (\`end_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`classroom_disablement\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`start_at\` datetime NOT NULL, \`end_at\` datetime NOT NULL, \`reason\` varchar(255) NULL, \`classroom_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`equipment\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`classroom_equipment\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`start_at\` datetime NULL, \`end_at\` datetime NULL, \`classroom_id\` bigint NOT NULL, \`equipment_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`log\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`remote_host\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`request_line\` varchar(500) NOT NULL, \`http_status\` int NOT NULL, \`bytes\` bigint NOT NULL, \`user_id\` bigint NULL, INDEX \`idx_Log_created_at\` (\`created_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`floor\` ADD CONSTRAINT \`FK_007987376f11fc247e008d2fb2e\` FOREIGN KEY (\`building_id\`) REFERENCES \`building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_183dfdebe3f788f67d4e2dde250\` FOREIGN KEY (\`parent_classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_1060d20b0318a949b463613d10d\` FOREIGN KEY (\`floor_id\`) REFERENCES \`floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_775147058c769ea57efe923d288\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_6b1ad5f1d98ace8049587706bc2\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_df719f3a92bcee75bb5aabaf104\` FOREIGN KEY (\`reserved_for_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_fa76fd2d4bfbb3c158c4b47c1fd\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_disablement\` ADD CONSTRAINT \`FK_4d6a3c02661b00180e918be961a\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` ADD CONSTRAINT \`FK_9186d2031cf2992d6abd7e70d74\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` ADD CONSTRAINT \`FK_e12af2a5a5c7908798a357ef21c\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`log\` ADD CONSTRAINT \`FK_002585cdf3f53f4b0cbd72ca26d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_002585cdf3f53f4b0cbd72ca26d\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` DROP FOREIGN KEY \`FK_e12af2a5a5c7908798a357ef21c\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` DROP FOREIGN KEY \`FK_9186d2031cf2992d6abd7e70d74\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_disablement\` DROP FOREIGN KEY \`FK_4d6a3c02661b00180e918be961a\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_fa76fd2d4bfbb3c158c4b47c1fd\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_df719f3a92bcee75bb5aabaf104\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_6b1ad5f1d98ace8049587706bc2\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_775147058c769ea57efe923d288\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_1060d20b0318a949b463613d10d\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_183dfdebe3f788f67d4e2dde250\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`floor\` DROP FOREIGN KEY \`FK_007987376f11fc247e008d2fb2e\``,
		);
		await queryRunner.query(`DROP INDEX \`idx_log_created_at\` ON \`log\``);
		await queryRunner.query(`DROP TABLE \`log\``);
		await queryRunner.query(`DROP TABLE \`classroom_equipment\``);
		await queryRunner.query(`DROP TABLE \`equipment\``);
		await queryRunner.query(`DROP TABLE \`classroom_disablement\``);
		await queryRunner.query(`DROP INDEX \`idx_booking_end_at\` ON \`booking\``);
		await queryRunner.query(
			`DROP INDEX \`idx_booking_start_at\` ON \`booking\``,
		);
		await queryRunner.query(
			`DROP INDEX \`idx_booking_classroom_id\` ON \`booking\``,
		);
		await queryRunner.query(`DROP TABLE \`booking\``);
		await queryRunner.query(
			`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`user\``,
		);
		await queryRunner.query(`DROP TABLE \`user\``);
		await queryRunner.query(
			`DROP INDEX \`IDX_b852abd9e268a63287bc815aab\` ON \`role\``,
		);
		await queryRunner.query(`DROP TABLE \`role\``);
		await queryRunner.query(`DROP TABLE \`classroom\``);
		await queryRunner.query(`DROP TABLE \`floor\``);
		await queryRunner.query(`DROP TABLE \`building\``);
	}
}
