<script setup lang="ts">
import { ref } from "vue";
import aftecLogo from "@/assets/logo/aftec_logo.svg";
import { useAuthStore } from "../stores/auth.js";

// get the auth store
const authStore = useAuthStore();

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
		errorMessage.value = "All the fields are required";
		return;
	}

	if (password.value.length < 10) {
		errorMessage.value = "Password must be at least 10 characters";
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
        <form class="flex flex-col h-fit min-w-96 gap-4 justify-center items-center bg-gray-100/50 p-10 rounded-3xl border-2 border-gray-100 shadow-md" @submit.prevent="handleSubmit">
            <div class="bg-white p-5 rounded-full">
                <img :src="aftecLogo" class="w-12 h-12" alt="Logo" />
            </div>
            <h1 class="font-heading font-bold text-2xl">Connexion</h1>
            <!-- Message d'erreur -->
            <p class="bg-red-500/20 p-2 rounded-xl border-2 border-red-500/40 text-red-500 text-sm font-medium" v-if="errorMessage">{{ errorMessage }}</p>
            <!-- Champ email -->
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

            <!-- Champ password -->
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

            <!-- Bouton submit -->
            <button class="btn-login" type="submit" :disabled="isLoading">
            {{ isLoading ? "Connexion..." : "Se connecter" }}
            </button>

            <!-- Signup link -->
            <p class="text-sm text-center opacity-70">
                Pas encore inscrit ? <a class="text-aftec-blue hover:underline cursor-pointer" href="#">Inscrivez-vous</a>
            </p>
        </form>
    </div>
</template>