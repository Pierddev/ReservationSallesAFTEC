// Tests unitaires du composant NavigationSidebar
// On teste le rendu du composant sans avoir besoin du routeur

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NavigationSidebar from "./NavigationSidebar.vue";

// Le composant utilise RouterLink (vue-router) dans son template.
// Pour éviter de configurer tout le routeur dans le test, on utilise
// global.stubs avec un template personnalisé : cela remplace RouterLink
// par une simple balise <a> qui conserve le texte du lien original.
// Le composant s'affiche quand même, sans dépendre du routeur.
describe("NavigationSidebar", () => {
	// On définit le stub une fois pour le réutiliser dans chaque test
	const stubs = {
		RouterLink: {
			template: "<a><slot /></a>",
		},
	};

	function mountSidebar() {
		return mount(NavigationSidebar, {
			global: { stubs },
		});
	}

	it("affiche le titre ResAFTEC", () => {
		const wrapper = mountSidebar();
		// wrapper.text() renvoie tout le texte visible du composant
		expect(wrapper.text()).toContain("ResAFTEC");
	});

	it("affiche le logo AFTEC", () => {
		const wrapper = mountSidebar();
		// wrapper.find("img") cherche la première balise <img>
		// attributes("alt") lit l'attribut HTML "alt" de l'image
		const img = wrapper.find("img");
		expect(img.attributes("alt")).toBe("Logo AFTEC");
	});

	it("contient les liens de navigation", () => {
		const wrapper = mountSidebar();
		// On vérifie que le texte de chaque lien est présent dans le rendu
		expect(wrapper.text()).toContain("Tableau de bord");
		expect(wrapper.text()).toContain("Réservations");
		expect(wrapper.text()).toContain("Utilisateurs");
	});
});
