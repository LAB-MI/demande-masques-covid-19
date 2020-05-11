import { $ } from "./dom-utils";

const setValiditéDuChamp = ($input) => {
  const isValid = $input.validity.valid;
  $input.setAttribute("aria-invalid", isValid ? "false" : "true");
};

export const initialiserFormulaireBonPerception = ({ onSubmit }) => {
  const $formulaire = $(".formulaire-bon-perception");
  const $formulairePersonneMandatee = $(".formulaire-personne-mandatée");
  const $optionUtilisateurEnCapacite = $("#champ-capacité-oui");
  const $optionUtilisateurPasEnCapacite = $("#champ-capacité-non");
  const $inputDateNaissanceDemandeur = $("#champ-demandeur-date-naissance");
  const $inputDateNaissanceMandatee = $("#champ-mandatée-date-naissance");
  const $tousLesInputs = [...$formulaire.querySelectorAll("input")];
  const $tousLesInputsFormulairePersonneMandatee = [
    ...$formulairePersonneMandatee.querySelectorAll("input"),
  ];
  const $boutonSoumission = $formulaire.querySelector('button[type="submit"]');
  const $consignesRetrait = $formulaire.querySelector(
    ".formulaire-consignes-retrait"
  );

  function afficherFormulairePersonneMandatée() {
    $formulairePersonneMandatee.classList.add(
      "formulaire-personne-mandatée--visible"
    );
    $consignesRetrait.classList.add(
      "formulaire-consignes-retrait--personne-mandatee"
    );

    $tousLesInputsFormulairePersonneMandatee.forEach(($input) => {
      $input.required = true;

      setValiditéDuChamp($input);
    });
  }

  function cacherFormulairePersonneMandatée() {
    $formulairePersonneMandatee.classList.remove(
      "formulaire-personne-mandatée--visible"
    );
    $consignesRetrait.classList.remove(
      "formulaire-consignes-retrait--personne-mandatee"
    );

    $tousLesInputsFormulairePersonneMandatee.forEach(($input) => {
      $input.value = "";
      $input.removeAttribute("required");

      setValiditéDuChamp($input);
    });
  }

  function ajouterUnSlashPendantRedactionDate(evenement) {
    const codeTouche = evenement.keyCode || evenement.charCode;
    const codeBackspace = 8;
    const codeDelete = 46;

    if (codeTouche !== codeBackspace && codeTouche !== codeDelete) {
      ajouterUnSlashEnFin(evenement.target);
    }
  }

  function ajouterUnSlashEnFin($dateInput) {
    $dateInput.value = $dateInput.value.replace(/^(\d{2})$/g, "$1/");
    $dateInput.value = $dateInput.value.replace(
      /^(\d{2})\/(\d{2})$/g,
      "$1/$2/"
    );
    $dateInput.value = $dateInput.value.replace(/\/\//g, "/");
  }

  function mettreAJourAriaInvalid(evenement) {
    const $input = evenement.target;

    setValiditéDuChamp($input);
  }

  function mettreAJourExemple(evenement) {
    const $input = evenement.target;
    const $exemple = $input.parentNode.querySelector(".exemple");

    if ($input.placeholder && $exemple) {
      if ($input.value) {
        $exemple.innerHTML = "ex.&nbsp;: " + $input.placeholder;
      } else {
        $exemple.innerHTML = "";
      }
    }
  }

  function mettreAJourValiditeFormulaire() {
    let isFormulaireValide = true;

    $tousLesInputs.forEach(($input) => {
      setValiditéDuChamp($input);

      isFormulaireValide = isFormulaireValide && $input.validity.valid;
    });

    if (isFormulaireValide) {
      $boutonSoumission.removeAttribute("disabled");
    } else {
      $boutonSoumission.setAttribute("disabled", "true");
    }
  }

  function soumissionDuFormulaire(evenement) {
    evenement.preventDefault();

    onSubmit();
  }

  $formulaire.addEventListener("submit", soumissionDuFormulaire);

  $optionUtilisateurEnCapacite.addEventListener(
    "click",
    cacherFormulairePersonneMandatée
  );
  $optionUtilisateurPasEnCapacite.addEventListener(
    "click",
    afficherFormulairePersonneMandatée
  );

  $inputDateNaissanceDemandeur.addEventListener(
    "keyup",
    ajouterUnSlashPendantRedactionDate,
    false
  );
  $inputDateNaissanceMandatee.addEventListener(
    "keyup",
    ajouterUnSlashPendantRedactionDate,
    false
  );

  $tousLesInputs.forEach(($input) => {
    $input.addEventListener("input", mettreAJourAriaInvalid);
    $input.addEventListener("input", mettreAJourExemple);
    $input.addEventListener("input", mettreAJourValiditeFormulaire);
    $input.addEventListener("blur", mettreAJourValiditeFormulaire);
  });

  mettreAJourValiditeFormulaire();

  return {
    getBonDePerception() {
      const bonDePerception = {};

      [...$formulaire.elements].forEach(($element) => {
        if (!$element.id) return;

        const isRadio = $element.type === "radio";

        if (isRadio) {
          bonDePerception[$element.id] = { checked: $element.checked };
        } else {
          bonDePerception[$element.id] = { value: $element.value };
        }
      });

      return bonDePerception;
    },
    restaurerBonDePerception(bonDePerception) {
      for (const [inputId, inputInformation] of Object.entries(
        bonDePerception
      )) {
        const $element = $formulaire.querySelector(`#${inputId}`);

        if ("value" in inputInformation) {
          $element.value = inputInformation.value;
        } else if ("checked" in inputInformation) {
          $element.checked = inputInformation.checked;
        }
      }

      if ($optionUtilisateurPasEnCapacite.checked) {
        afficherFormulairePersonneMandatée();
      }

      mettreAJourValiditeFormulaire();
    },
  };
};
