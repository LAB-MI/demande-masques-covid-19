// see: https://stackoverflow.com/a/32348687/1513045
export function isFacebookBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return userAgent.includes("FBAN") || userAgent.includes("FBAV");
}

export function isInternetExplorer() {
  const userAgent = window.navigator.userAgent;
  const isIe10OuMoins = userAgent.indexOf("MSIE ") > 0;
  const isIe11 = userAgent.indexOf("Trident/") > 0;

  return isIe10OuMoins || isIe11;
}
