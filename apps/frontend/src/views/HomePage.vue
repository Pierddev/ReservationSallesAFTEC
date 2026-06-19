<script setup lang="ts">
import aftecLogo from "@/assets/logo/aftec_logo.svg";
</script>

<template>
	<div class="h-screen flex justify-center items-center">
		<div class="flex flex-col h-fit min-w-120 gap-8 justify-center items-center card-layout p-12 rounded-3xl">
			<div class="bg-white p-5 rounded-full">
				<img :src="aftecLogo" class="w-12 h-12" alt="Logo" />
			</div>
			<h1 class="font-heading font-bold text-2xl text-center">
				Réservation de Salles<br />AFTEC
			</h1>
			<div class="flex flex-col gap-3 w-full">
				<RouterLink to="/login" class="btn-login no-underline">
					Connexion
				</RouterLink>
				<RouterLink
					to="/register"
					class="btn-login no-underline !bg-transparent !text-aftec-blue border-2 border-aftec-blue hover:!bg-aftec-blue hover:!text-white"
				>
					Inscription
				</RouterLink>
			</div>
		</div>
	</div>
</template>
