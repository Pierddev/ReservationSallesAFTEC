import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Define routes config
const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/HomePage.vue"),
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
		path: "/",
		component: () => import("../layouts/AuthenticatedLayout.vue"),
		children: [
			{
				path: "/dashboard",
				name: "Dashboard",
				component: () => import("../views/Dashboard/Dashboard.vue"),
			},
			{
				path: "/booking",
				name: "Booking",
				component: () => import("../views/BookingPage.vue"),
			},
		],
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
	const publicPages = ["Home", "Login", "Register"];
	const isPublicPage = publicPages.includes(to.name as string);

	// Attempt session restoration from HttpOnly cookie if not yet authenticated
	if (!authStore.isAuthenticated) {
		await authStore.fetchUser();
	}

	// Not authenticated + protected route → redirect to login
	if (!authStore.isAuthenticated && !isPublicPage) {
		return { name: "Login", query: { error: "unauthorized" } };
	}

	// Authenticated + public page → redirect to dashboard
	if (authStore.isAuthenticated && isPublicPage) {
		return { name: "Dashboard" };
	}

	return true;
});

export default router;
