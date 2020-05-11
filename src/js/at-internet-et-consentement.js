import "cookieconsent";

if (process.env.ACTIVATE_ANALYTICS === "true") {
  // Documentation de cookieconsent : https://www.osano.com/cookieconsent/documentation/javascript-api/
  // noinspection JSUnusedGlobalSymbols
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: "#000191",
        text: "#fff",
      },
      button: {
        background: "#fff",
        text: "#000191",
      },
    },
    type: "opt-out",
    content: {
      policy: "Gestion des Cookies",
      message:
        "Ce site utilise des cookies afin d'améliorer ses fonctionnalités et sa navigation.",
      allow: "J'accepte",
      deny: "Je refuse",
      link: "En savoir plus",
      href: "/confidentialite.html",
      target: null,
    },
    law: {
      countryCode: "FR",
    },
    onStatusChange(_status, _chosenBefore) {
      if (this.hasConsented()) {
        activerAtInternet();
      }
    },
  });
}

function activerAtInternet() {
  const idClientAtInternet = "445732";
  const idSiteDistribution = "31";
  // ATInternet importé par https://tag.aticdn.net/445732/smarttag.js
  // Bloqué par AdBlock et autres extensions, donc il faut être défensif
  // eslint-disable-next-line no-undef
  if (typeof ATInternet === "undefined") {
    return null;
  }
  // eslint-disable-next-line no-undef
  const tagAtInternet = new ATInternet.Tracker.Tag({
    site: idClientAtInternet,
    secure: "on",
  });
  tagAtInternet.page.set({
    level2: idSiteDistribution,
    name: "distribution-masques-covid-19",
  });
  tagAtInternet.dispatch();
}
