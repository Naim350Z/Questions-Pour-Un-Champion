const form = document.querySelector(".form-quizz");
let tableauResultats = [];
const reponses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
const titreResultat = document.querySelector(".resultats h2");
const noteResultat = document.querySelector(".note");
const aideResultat = document.querySelector(".aide");
const toutesLesQuestions = document.querySelectorAll(".question-block");

let verifTableau = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(document.querySelector('input[name="q1"]:checked').value);
  for (i = 1; i < 6; i++) {
    // va chercher les 5 questions afin de ne pas repéter le code 1x par question
    tableauResultats.push(
      //ajout dans les tableaux des valeurs données
      document.querySelector(`input[name="q${i}"]:checked`).value
    );
  }
  //probleme, les resultats s'ajoutent au tableaux pour l'agrandir, il faut donc reset le tableau à chaque submit
  verifFunc(tableauResultats);
  tableauResultats = [];
});
function verifFunc(tabResultats) {
  for (let a = 0; a < 5; a++) {
    if (tabResultats[a] === reponses[a]) {
      verifTableau.push(true);
    } else {
      verifTableau.push(false);
    }
  }
  afficherResultats(verifTableau);
  couleursFonction(verifTableau);
  verifTableau = [];
  console.log(verifTableau);
}
function afficherResultats(tabCheck) {
  const nbDeFautes = tabCheck.filter((el) => el !== true).length;
  switch (nbDeFautes) {
    case 0:
      titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`;
      aideResultat.innerText = "";
      noteResultat.innerText = "5/5";
      const audio = document.createElement("audio");
      audio.src = "ressources/julien-lepers-ah-oui-oui-oui-oui-oui-oui-oui.mp3";
      audio.play();
      document.getElementById("lepersGif").style.display = "block";
      setTimeout(() => {
        document.getElementById("lepersGif").style.display = "none";
      }, 8000);

      break;
    case 1:
      titreResultat.innerText = `✨ Vous y êtes presque ! ✨`;
      aideResultat.innerText =
        "Retentez une autre réponse dans la case rouge, puis re-validez !";
      noteResultat.innerText = "4/5";
      break;
    case 2:
      titreResultat.innerText = `✨ Encore un effort ... 👀`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "3/5";
      break;
    case 3:
      titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "2/5";
      break;
    case 4:
      titreResultat.innerText = `😭 Peux mieux faire ! 😭`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "1/5";
      const ohlala = document.createElement("audio");
      ohlala.src = "ressources/Ohlalala.mp3";
      ohlala.play();
      break;
    case 5:
      titreResultat.innerText = `👎 Peux mieux faire ! 👎`;
      aideResultat.innerText =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      noteResultat.innerText = "0/5";
      const bouleNoire = document.createElement("audio");
      bouleNoire.src = "ressources/motus-boule-noire.mp3";
      bouleNoire.play();
      document.getElementById("nonGif").style.display = "block";
      setTimeout(() => {
        document.getElementById("nonGif").style.display = "none";
      }, 4500);
      break;

    default:
      "Wops, cas innatendu.";
  }
}

function couleursFonction(tabValBool) {
  for (let j = 0; j < tabValBool.length; j++) {
    if (tabValBool[j] === true) {
      toutesLesQuestions[j].style.background = "lightgreen";
    } else {
      toutesLesQuestions[j].style.background = "#ffb8b8";
      toutesLesQuestions[j].classList.add("echec");
      setTimeout(() => {
        toutesLesQuestions[j].classList.remove("echec");
      }, 500);
    }
  }
}
toutesLesQuestions.forEach((item) => {
  item.addEventListener("click", () => {
    item.style.background = "white";
  });
});
