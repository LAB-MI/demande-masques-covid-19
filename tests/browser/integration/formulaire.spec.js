/// <reference types="cypress" />

const verifierChampVide = (idLabel) =>
  cy
    .get(`input[aria-labelledby="${idLabel}"]`)
    .should("have.value", "")
    .should("have.attr", "aria-invalid", "true");

const ecrireChamp = (idLabel, valeur) => {
  cy.get(`#${idLabel}`).click();
  cy.focused().clear().type(valeur);
};

const verifierValeurChamp = (idLabel, valeur) =>
  cy
    .get(`input[aria-labelledby="${idLabel}"]`)
    .should("have.value", valeur)
    .should("have.attr", "aria-invalid", "false");

const verifierBoutonSoumissionDesactive = () =>
  cy.get('button[type="submit"]').should("be.disabled");

const verifierChampInvisible = (idlabel) =>
  cy.get(`input[aria-labelledby="${idlabel}"]`).should("not.be.visible");

context("Formulaire", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("remplit le formulaire avec des informations de base", () => {
    verifierBoutonSoumissionDesactive();

    // Prénom demandeur
    verifierChampVide("champ-demandeur-prenom-label");
    ecrireChamp("champ-demandeur-prenom-label", "Michel");
    verifierValeurChamp("champ-demandeur-prenom-label", "Michel");

    verifierBoutonSoumissionDesactive();

    // Nom demandeur
    verifierChampVide("champ-demandeur-nom-label");
    ecrireChamp("champ-demandeur-nom-label", "Dumas");
    verifierValeurChamp("champ-demandeur-nom-label", "Dumas");

    verifierBoutonSoumissionDesactive();

    // Date de naissance
    verifierChampVide("champ-demandeur-date-naissance-label");
    ecrireChamp("champ-demandeur-date-naissance-label", "09/09/1969");
    verifierValeurChamp("champ-demandeur-date-naissance-label", "09/09/1969");

    verifierBoutonSoumissionDesactive();

    // Lieu de naissance
    verifierChampVide("champ-demandeur-lieu-naissance-label");
    ecrireChamp("champ-demandeur-lieu-naissance-label", "Brest");
    verifierValeurChamp("champ-demandeur-lieu-naissance-label", "Brest");

    // Nombre de mineurs
    verifierValeurChamp("champ-nombre-mineurs-label", "0");
    ecrireChamp("champ-nombre-mineurs-label", "2");
    verifierValeurChamp("champ-nombre-mineurs-label", "2");

    // Partie mandatée non visible
    cy.get('input[aria-labelledby="champ-capacité-oui-label"]').should(
      "be.checked"
    );
    verifierChampInvisible("champ-mandatée-prenom-label");
    verifierChampInvisible("champ-mandatée-nom-label");
    verifierChampInvisible("champ-mandatée-date-naissance-label");
    verifierChampInvisible("champ-mandatée-lieu-naissance-label");

    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("remplit le formulaire avec des informations de la personne mandatée", () => {
    verifierBoutonSoumissionDesactive();

    // Prénom demandeur
    verifierChampVide("champ-demandeur-prenom-label");
    ecrireChamp("champ-demandeur-prenom-label", "Michel");
    verifierValeurChamp("champ-demandeur-prenom-label", "Michel");

    verifierBoutonSoumissionDesactive();

    // Nom demandeur
    verifierChampVide("champ-demandeur-nom-label");
    ecrireChamp("champ-demandeur-nom-label", "Dumas");
    verifierValeurChamp("champ-demandeur-nom-label", "Dumas");

    verifierBoutonSoumissionDesactive();

    // Date de naissance
    verifierChampVide("champ-demandeur-date-naissance-label");
    ecrireChamp("champ-demandeur-date-naissance-label", "09/09/1969");
    verifierValeurChamp("champ-demandeur-date-naissance-label", "09/09/1969");

    verifierBoutonSoumissionDesactive();

    // Lieu de naissance
    verifierChampVide("champ-demandeur-lieu-naissance-label");
    ecrireChamp("champ-demandeur-lieu-naissance-label", "Brest");
    verifierValeurChamp("champ-demandeur-lieu-naissance-label", "Brest");

    // Nombre de mineurs
    verifierValeurChamp("champ-nombre-mineurs-label", "0");
    ecrireChamp("champ-nombre-mineurs-label", "2");
    verifierValeurChamp("champ-nombre-mineurs-label", "2");

    // Choisir l'option "personne mandatée"
    cy.get('input[aria-labelledby="champ-capacité-non-label"]')
      .click()
      .should("be.checked");

    verifierBoutonSoumissionDesactive();

    // Prénom personne mandatée
    verifierChampVide("champ-mandatée-prenom-label");
    ecrireChamp("champ-mandatée-prenom-label", "Stephanie");
    verifierValeurChamp("champ-mandatée-prenom-label", "Stephanie");

    verifierBoutonSoumissionDesactive();

    // Nom personne mandatée
    verifierChampVide("champ-mandatée-nom-label");
    ecrireChamp("champ-mandatée-nom-label", "Dumas");
    verifierValeurChamp("champ-mandatée-nom-label", "Dumas");

    verifierBoutonSoumissionDesactive();

    // Date de naissance personne mandatée
    verifierChampVide("champ-mandatée-date-naissance-label");
    ecrireChamp("champ-mandatée-date-naissance-label", "09/09/1969");
    verifierValeurChamp("champ-mandatée-date-naissance-label", "09/09/1969");

    verifierBoutonSoumissionDesactive();

    // Lieu de naissance personne mandatée
    verifierChampVide("champ-mandatée-lieu-naissance-label");
    ecrireChamp("champ-mandatée-lieu-naissance-label", "Limoges");
    verifierValeurChamp("champ-mandatée-lieu-naissance-label", "Limoges");

    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("enregistre les informations pour les prochaines visites", () => {
    verifierBoutonSoumissionDesactive();

    ecrireChamp("champ-demandeur-prenom-label", "Michel");
    ecrireChamp("champ-demandeur-nom-label", "Dumas");
    ecrireChamp("champ-demandeur-date-naissance-label", "09/09/1969");
    ecrireChamp("champ-demandeur-lieu-naissance-label", "Brest");
    ecrireChamp("champ-nombre-mineurs-label", "2");

    cy.get('button[type="submit"]').click();

    cy.reload();

    verifierValeurChamp("champ-demandeur-prenom-label", "Michel");
    verifierValeurChamp("champ-demandeur-nom-label", "Dumas");
    verifierValeurChamp("champ-demandeur-date-naissance-label", "09/09/1969");
    verifierValeurChamp("champ-demandeur-lieu-naissance-label", "Brest");
    verifierValeurChamp("champ-nombre-mineurs-label", "2");

    cy.get("#champ-mandatée-prenom").should("not.be.visible");
  });

  it("enregistre les informations pour les prochaines visites (personne mandatée)", () => {
    verifierBoutonSoumissionDesactive();

    ecrireChamp("champ-demandeur-prenom-label", "Michel");
    ecrireChamp("champ-demandeur-nom-label", "Dumas");
    ecrireChamp("champ-demandeur-date-naissance-label", "09/09/1969");
    ecrireChamp("champ-demandeur-lieu-naissance-label", "Brest");
    ecrireChamp("champ-nombre-mineurs-label", "2");

    // Choisir l'option "personne mandatée"
    cy.get('input[aria-labelledby="champ-capacité-non-label"]').click();

    ecrireChamp("champ-mandatée-prenom-label", "Stephanie");
    ecrireChamp("champ-mandatée-nom-label", "Dumas");
    ecrireChamp("champ-mandatée-date-naissance-label", "09/09/1969");
    ecrireChamp("champ-mandatée-lieu-naissance-label", "Limoges");

    cy.get('button[type="submit"]').click();

    cy.reload();

    verifierValeurChamp("champ-demandeur-prenom-label", "Michel");
    verifierValeurChamp("champ-demandeur-nom-label", "Dumas");
    verifierValeurChamp("champ-demandeur-date-naissance-label", "09/09/1969");
    verifierValeurChamp("champ-demandeur-lieu-naissance-label", "Brest");
    verifierValeurChamp("champ-nombre-mineurs-label", "2");
    verifierValeurChamp("champ-mandatée-prenom-label", "Stephanie");
    verifierValeurChamp("champ-mandatée-nom-label", "Dumas");
    verifierValeurChamp("champ-mandatée-date-naissance-label", "09/09/1969");
    verifierValeurChamp("champ-mandatée-lieu-naissance-label", "Limoges");

    cy.get("#champ-mandatée-prenom").should("be.visible");
  });
});
