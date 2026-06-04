<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import aftecLogo from "@/assets/logo/aftec_logo.svg";
import { useAuthStore } from "../stores/auth.js";

// get the auth store
const authStore = useAuthStore();

// get the current route (to handle redirection after login if needed)
const route = useRoute();
const successMessage =
	route.query.registered === "1"
		? "Inscription réussie ! Veuillez vous connecter."
		: "";

// reactive variables for the form
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

// Async function to handle login form submission
async function handleSubmit() {
	// Reset error message at the beginning of the attempt
	errorMessage.value = "";

	// Validate that email and password are provided
	if (!email.value || !password.value) {
		errorMessage.value = "Tous les champs sont requis";
		return;
	}

	if (password.value.length < 10) {
		errorMessage.value = "Le mot de passe doit contenir au moins 10 caractères";
		return;
	}

	// Set isLoading to true to prevent multiple attempts on the submit button
	isLoading.value = true;
	try {
		await authStore.login(email.value, password.value);
		// For now we log, then we will redirect to the dashboard
		console.log("Connected!!!"); // !!! To remove in production !!!
	} catch (error) {
		// Type assertion: The error is expected to be an object with a message property
		errorMessage.value = (error as { message: string }).message;
	} finally {
		// Finally, set loading to false to enable the submit button
		isLoading.value = false;
	}
}
</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <form class="flex flex-col h-fit min-w-120 gap-4 justify-center items-center bg-gray-100/50 p-10 rounded-3xl border-2 border-gray-100 shadow-md" @submit.prevent="handleSubmit">
            <div class="bg-white p-5 rounded-full">
                <img :src="aftecLogo" class="w-12 h-12" alt="Logo" />
            </div>
            <h1 class="font-heading font-bold text-2xl">Connexion</h1>
            <!-- Error message -->
            <p class="bg-red-500/20 p-2 rounded-xl border-2 border-red-500/40 text-red-500 text-sm font-medium" v-if="errorMessage">{{ errorMessage }}</p>
            <!-- Success message -->
            <p class="bg-green-600/10 p-2 rounded-xl border-2 border-green-600/40 text-green-600 text-sm font-medium" v-if="successMessage">{{ successMessage }}</p>

            <!-- Email field -->
            <div class="field w-full">
                <label for="email">Email</label>
                <input
                id="email"
                v-model="email"
                type="email"
                placeholder="exemple@email.fr"
                required
                />
            </div>

            <!-- password field -->
            <div class="field w-full">
                <label for="password">Mot de passe</label>
                <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Votre mot de passe"
                required
                />
            </div>

            <!-- Submit button -->
            <button class="btn-login" type="submit" :disabled="isLoading">
            {{ isLoading ? "Connexion..." : "Se connecter" }}
            </button>

            <!-- Signup link -->
            <p class="text-sm text-center opacity-70">
                Pas encore inscrit ? <RouterLink to="/register" class="text-aftec-blue hover:underline cursor-pointer">Inscrivez-vous</RouterLink>
            </p>
        </form>
    </div>
</template>