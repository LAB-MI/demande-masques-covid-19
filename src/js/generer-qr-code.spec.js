jest.mock("qrcode");

import QRCode from "qrcode";

import genererQrCode from "./generer-qr-code.js";

describe("QR Code", () => {
  const toDataUrlSpy = jest.fn().mockResolvedValue("QR Code bien formé");
  QRCode.toDataURL = toDataUrlSpy;

  const texteACoder = "JEANDUPONT09/09/1969";

  it("appelle la fonction de génération de QR Code", async () => {
    await genererQrCode(texteACoder);

    expect(toDataUrlSpy).toHaveBeenCalledWith("JEANDUPONT09/09/1969", {
      errorCorrectionLevel: "M",
      type: "image/png",
      quality: 0.92,
      margin: 1,
    });
  });

  describe("Si la génération du QR Code fonctionne correctement", () => {
    it("renvoie le bon QR Code", async () => {
      const reel = await genererQrCode(texteACoder);

      expect(reel).toEqual("QR Code bien formé");
    });
  });

  describe("Si la génération du QR Code entraîne une erreur", () => {
    it("ne renvoie rien", async () => {
      toDataUrlSpy.mockRejectedValue("Erreur");

      const reel = await genererQrCode(texteACoder);

      expect(reel).toEqual(undefined);
    });
  });
});
