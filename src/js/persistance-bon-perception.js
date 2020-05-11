const KEY = "BON_PERCEPTION";

export const récupérerBonDePerception = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch (e) {
    return null;
  }
};

export const enregistrerBonDePerception = (données) =>
  localStorage.setItem(KEY, JSON.stringify(données));
