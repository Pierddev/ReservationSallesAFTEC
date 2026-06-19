import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1780489254061 implements MigrationInterface {
	name = "Migration1780489254061";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`floor\` DROP FOREIGN KEY \`FK_007987376f11fc247e008d2fb2e\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_1060d20b0318a949b463613d10d\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_183dfdebe3f788f67d4e2dde250\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_775147058c769ea57efe923d288\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_6b1ad5f1d98ace8049587706bc2\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_df719f3a92bcee75bb5aabaf104\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_fa76fd2d4bfbb3c158c4b47c1fd\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_disablement\` DROP FOREIGN KEY \`FK_4d6a3c02661b00180e918be961a\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_002585cdf3f53f4b0cbd72ca26d\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` DROP FOREIGN KEY \`FK_9186d2031cf2992d6abd7e70d74\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` DROP FOREIGN KEY \`FK_e12af2a5a5c7908798a357ef21c\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_b852abd9e268a63287bc815aab\` ON \`role\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`user\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` DROP COLUMN \`has_removable_walls\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`floor\` ADD CONSTRAINT \`FK_1565850c51d1cc30e896101fa77\` FOREIGN KEY (\`building_id\`) REFERENCES \`building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_055875ef1a46d2dc4241c57d5b2\` FOREIGN KEY (\`parent_classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_d043c72464750886f47d5275987\` FOREIGN KEY (\`floor_id\`) REFERENCES \`floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_fb2e442d14add3cefbdf33c4561\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_276896d1a1a30be6de9d7d43f53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_d61386f8cd0e730238b28ac56f5\` FOREIGN KEY (\`reserved_for_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_532888bc86bbb0a4abf6f6a1186\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_disablement\` ADD CONSTRAINT \`FK_96d236a6fe7a5144669499a9ed6\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`log\` ADD CONSTRAINT \`FK_0d5473a41a198fd20e7920889b0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` ADD CONSTRAINT \`FK_dd848388603d9e291ec0ee08fb5\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` ADD CONSTRAINT \`FK_e3452f6977f140f51fb84e7a5b4\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` DROP FOREIGN KEY \`FK_e3452f6977f140f51fb84e7a5b4\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` DROP FOREIGN KEY \`FK_dd848388603d9e291ec0ee08fb5\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_0d5473a41a198fd20e7920889b0\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_disablement\` DROP FOREIGN KEY \`FK_96d236a6fe7a5144669499a9ed6\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_532888bc86bbb0a4abf6f6a1186\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_d61386f8cd0e730238b28ac56f5\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_276896d1a1a30be6de9d7d43f53\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_fb2e442d14add3cefbdf33c4561\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_d043c72464750886f47d5275987\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_055875ef1a46d2dc4241c57d5b2\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`floor\` DROP FOREIGN KEY \`FK_1565850c51d1cc30e896101fa77\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`role\` DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` ADD \`has_removable_walls\` tinyint NOT NULL`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`user\` (\`email\`)`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX \`IDX_b852abd9e268a63287bc815aab\` ON \`role\` (\`name\`)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` ADD CONSTRAINT \`FK_e12af2a5a5c7908798a357ef21c\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_equipment\` ADD CONSTRAINT \`FK_9186d2031cf2992d6abd7e70d74\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`log\` ADD CONSTRAINT \`FK_002585cdf3f53f4b0cbd72ca26d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom_disablement\` ADD CONSTRAINT \`FK_4d6a3c02661b00180e918be961a\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_fa76fd2d4bfbb3c158c4b47c1fd\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_df719f3a92bcee75bb5aabaf104\` FOREIGN KEY (\`reserved_for_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_6b1ad5f1d98ace8049587706bc2\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_775147058c769ea57efe923d288\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_183dfdebe3f788f67d4e2dde250\` FOREIGN KEY (\`parent_classroom_id\`) REFERENCES \`classroom\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_1060d20b0318a949b463613d10d\` FOREIGN KEY (\`floor_id\`) REFERENCES \`floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`floor\` ADD CONSTRAINT \`FK_007987376f11fc247e008d2fb2e\` FOREIGN KEY (\`building_id\`) REFERENCES \`building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
