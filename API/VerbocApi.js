// API/VerbocApi.js

const API_TOKEN = "1c564a808e64de6f514403b21c1dc6ac";

export function getConjugationFromVerb (verb, variety) {
  const verbmin = verb.toLowerCase()
  const verbtrim = verbmin.trim()
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&inf=' + verbtrim + '&var=' + variety
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getRandomForm (variety, group, tns, mod) {
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&ispers=1&games=1&form=random&var=' + variety
  if (group !== "all") {
    url += `&group=${group}`;
  }
  if (mod !== "all") {
    url += `&mod=${mod}`;
  }
  if (tns !== "all") {
    url += `&tns=${tns}`;
  }
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getRandomVerb (variety, group, tns, mod) {
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&games=1&inf=random&var=' + variety
  if (group !== "all") {
    url += `&group=${group}`;
  }
  if (mod !== "all") {
    url += `&mod=${mod}`;
  }
  if (tns !== "all") {
    url += `&tns=${tns}`;
  }
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getConjugationFromForm (form, inf, variety) {
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&form=' + form + '&inf=' + inf + '&var=' + variety
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getRandomTimes (tns, mod, variety, group) {
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&tns=' + tns + '&mod=' + mod + '&inf=random&games=1&var=' + variety
  if (group !== "all") {
    url += `&group=${group}`;
  }
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getRandomFormTimes (tns, mod, variety, group) {
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&tns=' + tns + '&mod=' + mod + '&form=random&games=1&var=' + variety
  if (group !== "all") {
    url += `&group=${group}`;
  }
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getRandomFormPers (per, num, variety, group, tns, mod) {
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&per=' + per + '&num=' + num + '&form=random&games=1&var=' + variety
  if (group !== "all") {
    url += `&group=${group}`;
  }
  if (mod !== "all") {
    url += `&mod=${mod}`;
  }
  if (tns !== "all") {
    url += `&tns=${tns}`;
  }
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getInfosFromForm (form, variety) {
  let url = 'https://api.locongres.org/verboc.php?key=' + API_TOKEN + '&form=' + form + '&var=' + variety
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

