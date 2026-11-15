// =====================================================
// LIGHTBOX : agrandir les photos des chats (page Adopter)
// =====================================================

// 1. On récupère les éléments de la lightbox (écrits dans adopter.html)
const lightbox = document.getElementById("lightbox");
const grandeImage = document.getElementById("lb-image");
const boutonFermer = document.getElementById("lb-fermer");
const boutonPrecedent = document.getElementById("lb-prec");
const boutonSuivant = document.getElementById("lb-suiv");

// 2. Deux variables pour se souvenir de ce qui est affiché
let photosDuChat = []; // toutes les photos de la fiche cliquée
let position = 0;      // le numéro de la photo affichée (0 = la première)

// 3. Fonction qui affiche la photo numéro "position" en grand
function afficherPhoto() {
  grandeImage.src = photosDuChat[position].src;
  grandeImage.alt = photosDuChat[position].alt;
}

// 4. Sur chaque fiche, un clic sur une photo ouvre la lightbox
const cartes = document.querySelectorAll("div.carte");

cartes.forEach(function (carte) {
  const photos = carte.querySelectorAll("img"); // les photos de CETTE fiche seulement

  photos.forEach(function (photo, numero) {
    photo.addEventListener("click", function () {
      photosDuChat = photos;
      position = numero;
      afficherPhoto();
      lightbox.classList.add("ouverte"); // le CSS affiche alors la lightbox
    });
  });
});

// 5. Fermer la lightbox
function fermer() {
  lightbox.classList.remove("ouverte");
}

boutonFermer.addEventListener("click", fermer);

// clic sur le fond noir (mais pas sur la photo elle-même) = fermer
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    fermer();
  }
});

// 6. Photo précédente / suivante (on revient au début après la dernière)
function photoPrecedente() {
  position = position - 1;
  if (position < 0) {
    position = photosDuChat.length - 1;
  }
  afficherPhoto();
}

function photoSuivante() {
  position = position + 1;
  if (position >= photosDuChat.length) {
    position = 0;
  }
  afficherPhoto();
}

boutonPrecedent.addEventListener("click", photoPrecedente);
boutonSuivant.addEventListener("click", photoSuivante);

// 7. Le clavier : Échap pour fermer, flèches gauche/droite pour naviguer
document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("ouverte")) {
    return; // la lightbox est fermée : on ne fait rien
  }
  if (event.key === "Escape") {
    fermer();
  }
  if (event.key === "ArrowLeft") {
    photoPrecedente();
  }
  if (event.key === "ArrowRight") {
    photoSuivante();
  }
});
