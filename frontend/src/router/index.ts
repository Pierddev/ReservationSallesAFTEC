import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Define routes config
const routes = [
	{
		path: "/",
		redirect: "/dashboard",
	},
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
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import("../views/Dashboard/Dashboard.vue"),
	},
];

// createRouter : create a router instance
// createWebHistory : use the html5 history mode => /login instead of #/login
const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Async navigation guard — checks authentication before every route change
// If the user is not yet authenticated (empty store after refresh), attempts to restore
// the session via GET /api/me using the HttpOnly JWT cookie
router.beforeEach(async (to) => {
	// Get the auth store
	const authStore = useAuthStore();

	// Define public pages that don't need authentication
	const publicPages = ["Login", "Register"];

	// If the route is protected and the user is not authenticated in the store,
	// attempt to restore the session via the JWT cookie (GET /api/me)
	if (!publicPages.includes(to.name as string) && !authStore.isAuthenticated) {
		// Phase 2: session restoration — fetchUser calls GET /api/me protected by JWT
		// If the cookie is valid, the backend returns user info and isAuthenticated becomes true
		await authStore.fetchUser()
		// After attempting restoration, if still not authenticated → redirect to login
		if (!authStore.isAuthenticated) {
			return { name: "Login", query: { error: "unauthorized" } };
		}
	}

	return true;
});

export default router;
