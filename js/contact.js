// Vider le formulaire quand on revient sur la page (bouton "Go back de Web3form")
const formulaire = document.querySelector(".formulaire");

window.addEventListener("pageshow", function () {
  formulaire.reset();
});