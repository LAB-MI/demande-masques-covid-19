import formatISO from "date-fns/formatISO";

export const lancerTéléchargementPdf = (octetsPdf, prefixeNom = "") => {
  const dateHeureGénérationFichier = formatISO(new Date());
  const nomDeFichier = `${prefixeNom + dateHeureGénérationFichier}.pdf`;

  const blobPdf = new Blob([octetsPdf], { type: "application/pdf" });
  return telechargerBlob(blobPdf, nomDeFichier);
};

const telechargerBlob = (blob, nomDeFichier) => {
  const lien = document.createElement("a");
  lien.download = nomDeFichier;
  lien.href = URL.createObjectURL(blob);
  document.body.appendChild(lien);
  lien.click();
};
