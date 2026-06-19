/** @type {import('jest').Config} */
export default {
	projects: ["<rootDir>/apps/backend/jest.config.js"],
	collectCoverageFrom: [
		"<rootDir>/apps/backend/src/**/*.ts",
		"!<rootDir>/apps/backend/src/**/*.d.ts",
		"!<rootDir>/apps/backend/src/migrations/**/*.ts",
		"!<rootDir>/apps/backend/src/database/seeds/**/*.ts",
	],
};
