/** @type {import('jest').Config} */
export default {
	projects: ["<rootDir>/backend/jest.config.js"],
	collectCoverageFrom: [
		"<rootDir>/backend/src/**/*.ts",
		"!<rootDir>/backend/src/**/*.d.ts",
		"!<rootDir>/backend/src/migrations/**/*.ts",
		"!<rootDir>/backend/src/database/seeds/**/*.ts",
	],
};
