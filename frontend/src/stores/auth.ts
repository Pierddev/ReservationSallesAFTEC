import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

// Define User interface to match the backend User entity
export interface User {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	role: number;
}

// Define Auth store with state and actions
export const userAuthStore = defineStore("auth", () => {
	// State
	// User is null when not logged in
	const user = ref<User | null>(null);

	// Computed properties
	// True if user is logged in, false otherwise
	const isAuthenticated = ref(false);

	// Actions
	async function login(email: string, password: string) {
		// POST on /login with email and password
		// Axios automatically send JSON data to backend thanks to the api.ts file and the header {"Content-Type": "application/json"}
		const response = await api.post("/login", { email, password });

		// If we reached here, it means login was successful (we received a response from the backend, status 200
		// Backend also set the token in the httpOnly cookie thanks to the res.cookie() function in indexController.ts
		// Save User in the state
		// response.data = { message: "User...", user: { id, firstname, ...}}
		user.value = response.data.user;
		isAuthenticated.value = true;
	}

	// Logout action: clear user data and auth status
	function logout() {
		user.value = null;
		isAuthenticated.value = false;

		// JWT token is not deleted backend side here
		// We need to make a request to the backend to delete the token (ex: POST /logout)
	}

	// Return what is needed to other components
	return { user, isAuthenticated, login, logout };
});
