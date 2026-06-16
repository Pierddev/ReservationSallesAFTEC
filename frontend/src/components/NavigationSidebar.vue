<template>
    <div class="h-screen sticky top-0 w-70 p-4">
        <div class="w-full h-full card-layout p-4 rounded-3xl">
            <div class="flex items-center space-x-2">
                <img src="@/assets/logo/aftec_logo.svg" alt="Logo AFTEC" class="w-10">
                <h1 class="font-heading">ResAFTEC</h1>
            </div>
            <div class="flex flex-col gap-2 mt-10 font-heading">
                <RouterLink to="/dashboard">Tableau de bord</RouterLink>
                <div>Utilisateurs</div>
                <!-- <RouterLink to="/manage-users">Utilisateurs</RouterLink> -->
                <RouterLink to="/booking">Réservations</RouterLink>
                <div>Liste des salles</div>
                <div>Logs</div>
                <!-- <RouterLink to="/rooms">Liste des salles</RouterLink>
                <RouterLink to="/logs">Logs</RouterLink> -->
            </div>
        </div>
    </div>
</template>
