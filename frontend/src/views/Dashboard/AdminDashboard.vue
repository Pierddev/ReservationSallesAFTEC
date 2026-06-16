<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
	await authStore.logout();
	router.push("/login");
}
</script>

<template>
    <div class="absolute h-screen w-70 p-3">
        <div class="w-full h-full card-layout p-4 rounded-2xl">
            <div class="flex items-center space-x-2">
                <img src="@/assets/logo/aftec_logo.svg" alt="Logo AFTEC" class="w-10">
                <h1 class="font-heading">ResAFTEC</h1>
            </div>
            <div class="flex flex-col gap-2 mt-10 font-heading">
                <RouterLink to="/dashboard">Tableau de bord</RouterLink>
                <RouterLink to="/manage-users">Utilisateurs</RouterLink>
                <RouterLink to="/booking">Réservations</RouterLink>
                <RouterLink to="/rooms">Liste des salles</RouterLink>
                <RouterLink to="/logs">Logs</RouterLink>
            </div>
        </div>
    </div>
    <div class="h-screen flex justify-center items-center">
        <div class="flex flex-col min-w-120 gap-4 justify-center items-center card-layout">
            <span class="bg-aftec-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Administrateur</span>
            <h1 class="font-heading font-bold text-2xl">Tableau de bord Admin</h1>
            <p class="text-lg">Bienvenue, {{ authStore.user?.firstname }} {{ authStore.user?.lastname }}</p>
            <p class="text-sm opacity-70">{{ authStore.user?.email }}</p>
            <button class="btn-login" @click="handleLogout">Déconnexion</button>
        </div>
    </div>
</template>