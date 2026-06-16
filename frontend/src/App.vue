<script setup lang="ts">
</script>

<template>
	<section class="relative font-sans">
		<div class="liquid-bg">
			<div class="orb"></div>
			<div class="orb"></div>
			<div class="orb"></div>
			<div class="orb"></div>
		</div>
		<RouterView :key="$route.fullPath"/>
	</section>
</template>