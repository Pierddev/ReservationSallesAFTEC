<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import eyeClosedIcon from "@/assets/icon/eye-closed.svg";
import eyeOpenIcon from "@/assets/icon/eye-opened.svg";
import aftecLogo from "@/assets/logo/aftec_logo.svg";
import { useAuthStore } from "../stores/auth.js";

// get the auth store
const authStore = useAuthStore();

const router = useRouter();

// reactive variables for the form
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

// Async function to handle register form submission
async function handleSubmit() {
	errorMessage.value = "";
	if (
		!firstname.value ||
		!lastname.value ||
		!email.value ||
		!password.value ||
		!confirmPassword.value
	) {
		errorMessage.value = "Tous les champs sont requis";
		return;
	}
	if (password.value.length < 10) {
		errorMessage.value = "Le mot de passe doit contenir au moins 10 caractères";
		return;
	}
	if (password.value !== confirmPassword.value) {
		errorMessage.value = "Les mots de passe ne correspondent pas";
		return;
	}
	isLoading.value = true;
	try {
		await authStore.register({
			firstname: firstname.value,
			lastname: lastname.value,
			email: email.value,
			password: password.value,
		});
		router.push("/login?registered=1");
	} catch (error) {
		errorMessage.value = (error as { message: string }).message;
	} finally {
		isLoading.value = false;
	}
}
</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <form class="flex flex-col h-fit min-w-120 gap-4 justify-center items-center card-layout" @submit.prevent="handleSubmit">
            <div class="bg-white p-5 rounded-full">
                <img :src="aftecLogo" class="w-12 h-12" alt="Logo" />
            </div>
            <h1 class="font-heading font-bold text-2xl">Inscription</h1>
            <!-- Error message -->
            <p class="card-error text-sm font-medium" v-if="errorMessage">{{ errorMessage }}</p>
            <!-- Firstname field -->
            <div class="field w-full">
                <label for="firstname">Prénom</label>
                <input
                id="firstname"
                v-model="firstname"
                type="text"
                placeholder="Votre prénom"
                required
                />
            </div>
            <!-- Lastname field -->
            <div class="field w-full">
                <label for="lastname">Nom</label>
                <input
                id="lastname"
                v-model="lastname"
                type="text"
                placeholder="Votre nom"
                required
                />
            </div>
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
             <div class="relative field w-full">
                <label for="password">Mot de passe</label>
                <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Votre mot de passe"
                required
                />
                <button type="button" @click="showPassword = !showPassword">
                    <img :src="showPassword ? eyeOpenIcon : eyeClosedIcon" class="w-5 h-5 absolute right-3 top-9.5 cursor-pointer" alt="Toggle password visibility" />
                </button>
            </div>
            <!-- confirm password field -->
            <div class="relative field w-full">
                <label for="confirmPassword">Confirmer le mot de passe</label>
                <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Confirmez votre mot de passe"
                required
                />
                <button type="button" @click="showPassword = !showPassword">
                    <img :src="showPassword ? eyeOpenIcon : eyeClosedIcon" class="w-5 h-5 absolute right-3 top-9.5 cursor-pointer" alt="Toggle password visibility" />
                </button>
            </div>
            <!-- Submit button -->
            <button class="btn-login" type="submit" :disabled="isLoading">
            {{ isLoading ? "Inscription..." : "S'inscrire" }}
            </button>
            <!-- Signup link -->
            <p class="text-sm text-center opacity-70">
                Déjà inscrit ? <RouterLink to="/login" class="text-aftec-blue hover:underline cursor-pointer">Connectez-vous</RouterLink>
            </p>
        </form>
    </div>
</template>