<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import AdminDashboard from "./AdminDashboard.vue";
import UserDashboard from "./UserDashboard.vue";

const authStore = useAuthStore();
</script>

<template>
    <AdminDashboard v-if="authStore.user?.roleName === 'admin'" />
    <UserDashboard v-else />
</template>