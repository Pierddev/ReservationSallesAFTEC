/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	displayName: "backend",
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},
	testMatch: ["<rootDir>/tests/**/*.test.ts"],
};
