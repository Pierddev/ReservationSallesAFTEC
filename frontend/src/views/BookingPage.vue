<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import api from "@/services/apiService";

console.log("BookingPage loaded");

interface Building {
	id: number;
	name: string;
}

const buildings = ref<Building[]>([]);
const selectedBuilding = ref<number | null>(null);

interface Floor {
	id: number;
	level: number;
}

const floors = ref<Floor[]>([]);
const selectedFloor = ref<number | null>(null);

async function fetchFloors(buildingId: number) {
	try {
		const response = await api.get("/get-floor-by-building", {
			params: { buildingId },
		});
		floors.value = response.data.floors;
	} catch (error) {
		console.error("Erreur lors de la récupération des étages :", error);
		floors.value = [];
	}
}

// onMounted permet de charger les informations au chargement de la page/composant
onMounted(async () => {
	try {
		const response = await api.get("/get-building");
		buildings.value = response.data.buildings;
	} catch (error) {
		console.error("Erreur lors de la récupération des bâtiments :", error);
	}
});

watch(selectedBuilding, (newBuildingId) => {
	selectedFloor.value = null;
	if (newBuildingId) {
		fetchFloors(newBuildingId);
	} else {
		floors.value = [];
	}
});

const capacity = ref(15);
</script>

<template>
    <div class="h-full w-full">
        <!-- Title -->
        <h1 class="font-heading text-xl card-layout py-3 rounded-3xl w-fit px-10">Réservation de Salles</h1>
        <!-- Search & filters -->
        <div class="flex flex-col gap-10 card-layout mt-4 rounded-3xl p-4 w-100">
            <div class="font-bold text-lg">Recherches & Filtres</div>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col items-center mx-10">
                    <select name="building" id="building" v-model="selectedBuilding" class="border-2 border-black/30 w-full p-2 rounded-xl">
                        <option :value="null" disabled>Choisir un bâtiment</option>
                        <option v-for="building in buildings" :key="building.id" :value="building.id">{{ building.name }}</option>
                    </select>
                </div>
                <div class="flex flex-col items-center mx-10">
                    <select name="floors" id="floors" v-model="selectedFloor" class="border-2 border-black/30 w-full p-2 rounded-xl">
                        <option :value="null" disabled>Choisir un étage</option>
                        <option v-for="floor in floors" :key="floor.id" :value="floor.id">Étage {{ floor.level }}</option>
                    </select>
                </div>
                <div class="flex flex-col items-center mx-10">
                    <select name="rooms" id="rooms" class="border-2 border-black/30 w-full p-2 rounded-xl">
                        <option :value="null" disabled>Choisir une salle</option>
                        <option value="a103">Salles A103</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="flex justify-between">
                    <div class="text-lg font-bold">Capacité minimum</div>
                    <output id="capacity_value" class="text-black/60 font-bold">{{ capacity }}</output>
                </div>
                <input id="capacity_input" v-model="capacity" type="range" min="5" max="100" step="5" class="w-full accent-aftec-blue">
            </div>
            <div>
                <div>Équipements inclus</div>
                <div>
                    <div>Wi-Fi</div>
                    <div>Climatisation</div>
                </div>
            </div>
        </div>
    </div>
</template>