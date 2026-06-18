import { describe, expect, it, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore, type User } from "./auth";

// vi.mock() remplace le vrai module apiService par une version fictive.
vi.mock("../services/apiService", () => ({
	default: {
		post: vi.fn(),
		get: vi.fn(),
	},
}));

// On importe le module apiService, la version mockée
import api from "../services/apiService";

// describe() regroupe les tests par thématique
describe("auth store", () => {
	// beforeEach() est exécuté AVANT chaque test (it)
	// On crée une nouvelle instance Pinia pour que l'état du store reparte de zéro à chaque test
	// On remet aussi les compteurs des fonctions mockées à zéro.
	beforeEach(() => {
		setActivePinia(createPinia());
		vi.clearAllMocks();
	});

	// Tester une connexion qui réussit
	it("login met à jour user et isAuthenticated en cas de succès", async () => {
		// On prépare un utilisateur factice que l'API pourrait renvoyer
		const fakeUser: User = {
			id: 1,
			firstname: "Jean",
			lastname: "Dupont",
			email: "jean@test.fr",
			role: 1,
			roleName: "Admin",
		};
		// mockResolvedValue() simule une réponse réussie de l'API (réponse 200 du serveur)
		vi.mocked(api.post).mockResolvedValue({
			data: { message: "OK", user: fakeUser },
		});

		const store = useAuthStore();
		await store.login("jean@test.fr", "password12345");

		// toHaveBeenCalledWith() vérifie que l'API a été appelée avec la bonne URL et les bons paramètres
		expect(api.post).toHaveBeenCalledWith("/login", {
			email: "jean@test.fr",
			password: "password12345",
		});
		// On vérifie que l'état du store a bien été mis à jour
		expect(store.user).toEqual(fakeUser);
		expect(store.isAuthenticated).toBe(true);
	});

	// Tester une connexion qui échoue (mauvais email/mot de passe)
	it("login ne modifie pas l'état en cas d'échec", async () => {
		// mockRejectedValue() simule une erreur de l'API (réponse 401 du serveur)
		vi.mocked(api.post).mockRejectedValue({
			message: "Email ou mot de passe incorrect",
		});

		const store = useAuthStore();
		// .rejects permet de vérifier que la promesse rejette bien avec le message d'erreur attendu
		await expect(
			store.login("wrong@test.fr", "wrong"),
		).rejects.toEqual({ message: "Email ou mot de passe incorrect" });

		// L'état ne doit pas avoir changé
		expect(store.user).toBeNull();
		expect(store.isAuthenticated).toBe(false);
	});

	// Tester la restauration de session quand le cookie JWT est encore valide
	it("fetchUser restaure la session si l'API répond", async () => {
		const fakeUser: User = {
			id: 2,
			firstname: "Marie",
			lastname: "Curie",
			email: "marie@test.fr",
			role: 2,
			roleName: "User",
		};
		vi.mocked(api.get).mockResolvedValue({
			data: { user: fakeUser },
		});

		const store = useAuthStore();
		await store.fetchUser();

		expect(store.user).toEqual(fakeUser);
		expect(store.isAuthenticated).toBe(true);
	});

	// Tester la restauration de session quand le token est expiré
	// Le try/catch dans fetchUser attrape l'erreur silencieusement et remet l'état à zéro, donc le test vérifie juste l'état final
	it("fetchUser réinitialise l'état si l'API échoue", async () => {
		vi.mocked(api.get).mockRejectedValue(new Error("Non connecté"));

		const store = useAuthStore();
		await store.fetchUser();

		expect(store.user).toBeNull();
		expect(store.isAuthenticated).toBe(false);
	});

	// Tester la déconnexion
	it("logout réinitialise l'état", async () => {
		const store = useAuthStore();
		// On pré-remplit l'état pour simuler un utilisateur connecté
		store.user = {
			id: 1,
			firstname: "Alice",
			lastname: "Martin",
			email: "alice@test.fr",
			role: 1,
			roleName: "Admin",
		};
		store.isAuthenticated = true;
		vi.mocked(api.post).mockResolvedValue({ data: {} });

		await store.logout();

		// L'API a bien été appelée et l'état a été réinitialisé
		expect(api.post).toHaveBeenCalledWith("/logout");
		expect(store.user).toBeNull();
		expect(store.isAuthenticated).toBe(false);
	});
});