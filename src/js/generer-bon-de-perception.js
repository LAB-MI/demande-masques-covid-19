import format from "date-fns/format";
import { PDFDocument, StandardFonts } from "pdf-lib";

import pdfBonPerceptionVide from "../pdf/bon-perception-vide.pdf";
import pdfBonPerceptionVideAvecMandataire from "../pdf/bon-perception-vide-avec-mandataire.pdf";

import générerQrCodeEnImage from "./generer-qr-code";

export const mapBonDePerceptionToDonnéesPdf = (bonDePerception) => {
  const donnéesDuFormulaire = {
    demandeur: {
      nom: bonDePerception["champ-demandeur-nom"].value,
      prenom: bonDePerception["champ-demandeur-prenom"].value,
      dateNaissance: bonDePerception["champ-demandeur-date-naissance"].value,
      lieuNaissance: bonDePerception["champ-demandeur-lieu-naissance"].value,
      nombreMineurs: bonDePerception["champ-nombre-mineurs"].value,
    },
    mandatée: null,
  };

  if (bonDePerception["champ-capacité-non"].checked) {
    donnéesDuFormulaire.mandatée = {
      nom: bonDePerception["champ-mandatée-nom"].value,
      prenom: bonDePerception["champ-mandatée-prenom"].value,
      dateNaissance: bonDePerception["champ-mandatée-date-naissance"].value,
      lieuNaissance: bonDePerception["champ-mandatée-lieu-naissance"].value,
    };
  }

  return donnéesDuFormulaire;
};

export const générerPdfBonDePerception = async (données) => {
  const donnéesDemandeurAInscrire = {
    nom: données.demandeur.nom,
    prenom: données.demandeur.prenom,
    dateNaissance: données.demandeur.dateNaissance,
    lieuNaissance: données.demandeur.lieuNaissance,
    nbMineurs: données.demandeur.nombreMineurs,
  };
  const contenuQrCode = JSON.stringify(donnéesDemandeurAInscrire);

  const pdfACharger = données.mandatée
    ? pdfBonPerceptionVideAvecMandataire
    : pdfBonPerceptionVide;
  const documentPdf = await _chargerPdf(pdfACharger);
  documentPdf.addPage();

  if (données.mandatée) {
    await _écrireDemandeurEtMandatéeSurPdf(documentPdf, données);
  } else {
    await _écrireDemandeurSurPdf(documentPdf, donnéesDemandeurAInscrire);
  }

  const qrCodeEnImage = await générerQrCodeEnImage(contenuQrCode);
  const qrImage = await documentPdf.embedPng(qrCodeEnImage);

  _ajouterQrCodeSurPremièrePage(documentPdf, qrImage);
  _ajouterQrCodeSurDeuxièmePage(documentPdf, qrImage);

  return documentPdf.save();
};

async function _chargerPdf(fichier) {
  const octetsPdf = await fetch(fichier).then((réponse) =>
    réponse.arrayBuffer()
  );

  return PDFDocument.load(octetsPdf);
}

const POSITION_NOM = 110;
const POSITION_LIEU = 74;
const POSITION_DATE = 94;

async function _écrireDemandeurSurPdf(documentPdf, donnéesDemandeur) {
  const écrireTexteSurPage1 = await _écrireTexteSurDocument(documentPdf);

  const prénomEtNom = `${donnéesDemandeur.prenom} ${donnéesDemandeur.nom}`;
  const { dateNaissance, lieuNaissance, nbMineurs } = donnéesDemandeur;
  écrireTexteSurPage1(prénomEtNom, POSITION_NOM, 546);
  écrireTexteSurPage1(dateNaissance, POSITION_NOM, 518);
  écrireTexteSurPage1(lieuNaissance, POSITION_LIEU, 490);
  écrireTexteSurPage1(nbMineurs, 150, 444);

  const dateDeGénération = format(new Date(), "dd/MM/yyyy");
  écrireTexteSurPage1(dateDeGénération, POSITION_DATE, 416);
}

async function _écrireDemandeurEtMandatéeSurPdf(documentPdf, données) {
  const écrireTexteSurPage1 = await _écrireTexteSurDocument(documentPdf);

  // Demandeur
  const donnéesDemandeur = données.demandeur;
  const prénomEtNomDemandeur = `${donnéesDemandeur.prenom} ${donnéesDemandeur.nom}`;
  écrireTexteSurPage1(prénomEtNomDemandeur, POSITION_NOM, 528);
  écrireTexteSurPage1(données.demandeur.dateNaissance, POSITION_NOM, 500);
  écrireTexteSurPage1(données.demandeur.lieuNaissance, POSITION_LIEU, 472);

  // Personne mandatée
  const prénomEtNomMandatée = `${données.mandatée.prenom} ${données.mandatée.nom}`;
  écrireTexteSurPage1(prénomEtNomMandatée, POSITION_NOM, 416);
  écrireTexteSurPage1(données.mandatée.dateNaissance, POSITION_NOM, 388);
  écrireTexteSurPage1(données.mandatée.lieuNaissance, POSITION_LIEU, 360);

  // Nombre mineurs
  écrireTexteSurPage1(données.demandeur.nombreMineurs, 106, 314);

  const dateDeGénération = format(new Date(), "dd/MM/yyyy");
  écrireTexteSurPage1(dateDeGénération, POSITION_DATE, 286);
}

async function _écrireTexteSurDocument(document, numeroPage = 1) {
  const page = document.getPages()[numeroPage - 1];
  const policeEnGras = await document.embedFont(StandardFonts.HelveticaBold);

  return (texte, x, y, taille = 12) => {
    // y = 0 correspond au bas du document !
    page.drawText(texte, {
      x,
      y,
      size: taille,
      font: policeEnGras,
    });
  };
}

function _ajouterQrCodeSurPremièrePage(documentPdf, qrImage) {
  const page1 = documentPdf.getPages()[0];
  page1.drawImage(qrImage, {
    x: page1.getWidth() - 160,
    y: 175,
    width: 100,
    height: 100,
  });
}

function _ajouterQrCodeSurDeuxièmePage(documentPdf, qrImage) {
  const page2 = documentPdf.getPages()[1];
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  });
}
