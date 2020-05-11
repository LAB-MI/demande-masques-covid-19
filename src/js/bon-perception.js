import "core-js/stable";

import { $ } from "./dom-utils";
import { lancerTéléchargementPdf } from "./telecharger-pdf";
import {
  générerPdfBonDePerception,
  mapBonDePerceptionToDonnéesPdf,
} from "./generer-bon-de-perception";
import { isFacebookBrowser, isInternetExplorer } from "./detection-navigateurs";
import { initialiserFormulaireBonPerception } from "./formulaire-bon-perception";
import {
  enregistrerBonDePerception,
  récupérerBonDePerception,
} from "./persistance-bon-perception";
import { initialiserMiseAJour } from "./mise-a-jour";

const $alerteConfirmation = $("#message-confirmation");
const $alerteMiseAJour = $("#message-mise-a-jour");

const $alerteInternetExplorer = $("#alerte-ie");
if (isInternetExplorer()) {
  $alerteInternetExplorer.className += " alerte--visible"; // Utilisation de className pour supporter IE9
}

const $alerteFacebook = $("#alerte-facebook");
if (isFacebookBrowser()) {
  $alerteFacebook.classList.add("alerte--visible");
}

function montrerMessageMiseAJour() {
  $alerteMiseAJour.setAttribute("aria-hidden", "false");
}

function montrerMessageConfirmation() {
  $alerteConfirmation.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    $alerteConfirmation.setAttribute("aria-hidden", "true");
  }, 6000);
}

const formulaireBonPerception = initialiserFormulaireBonPerception({
  onSubmit: async () => {
    const bonDePerception = formulaireBonPerception.getBonDePerception();
    enregistrerBonDePerception(bonDePerception);

    const donnéesPdf = mapBonDePerceptionToDonnéesPdf(bonDePerception);
    const pdfBonPerception = await générerPdfBonDePerception(donnéesPdf);
    lancerTéléchargementPdf(pdfBonPerception, "bon-de-perception-");

    montrerMessageConfirmation();
  },
});

const miseAJour = initialiserMiseAJour();

miseAJour.quandDisponible(montrerMessageMiseAJour);

const ancienBonDePerception = récupérerBonDePerception();

if (ancienBonDePerception) {
  formulaireBonPerception.restaurerBonDePerception(ancienBonDePerception);
}
