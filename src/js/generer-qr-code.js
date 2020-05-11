import QRCode from "qrcode";

const indiceDeQualite = 0.92; // Par défaut : 0.92 ; Valeurs possibles : Entre 0 et 1
const tailleDuContourBlanc = 1; // Par défaut : 4
const niveauDeCorrectionDErreur = "M"; // Par défaut : M ; Valeurs possibles : L, M, Q, H

export default async (texteACoder) => {
  const optionsQrCode = {
    type: "image/png",
    quality: indiceDeQualite,
    margin: tailleDuContourBlanc,
    errorCorrectionLevel: niveauDeCorrectionDErreur,
  };
  return await QRCode.toDataURL(texteACoder, optionsQrCode).catch(
    console.error
  );
};
