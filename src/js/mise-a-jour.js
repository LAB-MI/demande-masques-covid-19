const cheminServiceWorker = "./sw.js";
const isProduction = process.env.NODE_ENV === "production";

const onUpdateFound = (registration) =>
  new Promise((resolve) => {
    registration.onupdatefound = () => {
      const serviceWorker = registration.installing;

      serviceWorker.onstatechange = () => {
        resolve(
          serviceWorker.state === "installed" &&
            navigator.serviceWorker.controller
        );
      };
    };
  });

const promiseMiseAJour =
  isProduction && "serviceWorker" in navigator
    ? navigator.serviceWorker.register(cheminServiceWorker).then(onUpdateFound)
    : Promise.resolve(false);

export const initialiserMiseAJour = () => {
  const $boutonMiseAJour = document.querySelector(
    "#message-mise-a-jour button"
  );

  const mettreAJour = () => window.location.reload();

  $boutonMiseAJour.addEventListener("click", mettreAJour);

  return {
    quandDisponible(callback) {
      promiseMiseAJour.then((isMiseAJourDisponible) => {
        if (isMiseAJourDisponible) {
          callback();
        }
      });
    },
  };
};
