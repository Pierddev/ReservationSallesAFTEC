import { createRouter, createWebHistory } from "vue-router";

// Define routes config
const routes = [
	{
		path: "/login",
		name: "Login",
		// Lazy-loading : load only when the route is called => more efficient, don't load all at once
		component: () => import("../views/LoginPage.vue"),
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("../views/RegisterPage.vue"),
	},
];

// createRouter : create a router instance
// createWebHistory : use the html5 history mode => /login instead of #/login
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
