import { isFacebookBrowser, isInternetExplorer } from "./detection-navigateurs";

let userAgent = "";
let vendor = "";

Object.defineProperty(window.navigator, "userAgent", {
  get() {
    return userAgent;
  },
});

Object.defineProperty(window.navigator, "vendor", {
  get() {
    return vendor;
  },
});

const setUserAgent = (nouvelUserAgent) => {
  userAgent = nouvelUserAgent;
};

const setVendor = (nouveauVendor) => {
  vendor = nouveauVendor;
};

beforeEach(() => {
  userAgent = "";
  vendor = "";
  window.opera = "";
});

describe("isFacebookBrowser", () => {
  it('Retourne true si navigator.userAgent contient "FBAN', () => {
    setUserAgent("blabla FBAN blabla");

    expect(isFacebookBrowser()).toBe(true);
  });

  it('Retourne true si navigator.userAgent contient "FBAV', () => {
    setUserAgent("blabla FBAV blabla");

    expect(isFacebookBrowser()).toBe(true);
  });

  it('Retourne true si navigator.vendor contient "FBAN', () => {
    setVendor("blabla FBAN blabla");

    expect(isFacebookBrowser()).toBe(true);
  });

  it('Retourne true si navigator.vendor contient "FBAV', () => {
    setVendor("blabla FBAV blabla");

    expect(isFacebookBrowser()).toBe(true);
  });

  it('Retourne true si window.opera contient "FBAN', () => {
    window.opera = "blabla FBAN blabla";

    expect(isFacebookBrowser()).toBe(true);
  });

  it('Retourne true si window.opera contient "FBAV', () => {
    window.opera = "blabla FBAV blabla";

    expect(isFacebookBrowser()).toBe(true);
  });

  it("Retourne false sinon", () => {
    window.opera = "blabla FBARRR blabla";

    expect(isFacebookBrowser()).toBe(false);
  });
});

describe("isInternetExplorer", () => {
  it("Retourne true pour le user agent IE10", () => {
    setUserAgent(
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)"
    );

    expect(isInternetExplorer()).toBe(true);
  });

  it("Retourne true pour le user agent IE11", () => {
    setUserAgent(
      "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko"
    );

    expect(isInternetExplorer()).toBe(true);
  });

  it("Retourne false pour le user agent Edge 12", () => {
    setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0"
    );

    expect(isInternetExplorer()).toBe(false);
  });

  it("Retourne false pour le user agent Edge 13", () => {
    setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586"
    );

    expect(isInternetExplorer()).toBe(false);
  });
});
