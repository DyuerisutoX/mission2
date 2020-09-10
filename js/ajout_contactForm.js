/**
 * @file ajout_contact.html
 * @author LE GALL Yann
 * @author DIEMUNSCH Clement
 * @author CHECCHI Sébastien 
 * @author LAW SHUN Nicolas 
 */

const BTN_VALIDER = document.getElementById('envoie');
var antiBaliseOuvrante = /<[a-z]+>/g;
var antiBaliseFermante = /<\/[a-z]+>/g;

/**
 * Envoi le formulaire vers le serveur
 */
var formulaireValide = () => {
	var formulaire = document.getElementById('ajout_contact');
	formulaire.submit();
};

/**
 * Mission: Permet l'affichage des messages d'erreur pendans 5 secondes
 * @param  {string} cible
 * @param  {string} msg
 */
var afficherErreur = (cible, msg) => {
	let divErreur = document.getElementById(cible);
	divErreur.style.color = "red";
	divErreur.innerText = msg;
	setTimeout(() => {
		divErreur.innerText = "";
	}, 5000);
};

/**
 * Mission: Controle les champs de saisie.
 * Change la couleur de la bordure si vide ou saisie balise html
 * @return {boolean} controleOk
 */
var controleChampsSaisie = () => {
	var champsSaisie = document.getElementsByTagName('input');
	var controleOk;
	var vide = champsSaisie.length;
	for (let elems of champsSaisie) {
		if (elems.value == "" || (elems.value.match(antiBaliseOuvrante) && elems.value.match(antiBaliseFermante) || elems.value.match(antiBaliseOuvrante))) {
			elems.style.borderColor = "red";
			vide--;
		} else {
			elems.style.borderColor = "rgb(69, 75, 80)";
		}
	}
	if (vide == 0) {
		controleOk = false;
	} else {
		controleOk = true;
	}

	return controleOk;
};

/**
 * Mission: Controle les bouton radio si coché ou non
 * @param {objet} groupeRadio 
 * @return {boolean} controleOk 
 * @see afficherErreur()
 */
var controleRadio = (groupeRadio) => {
	var groupRadio = document.getElementsByClassName(groupeRadio);
	var pasCheck = 0;
	var controleOk;
	for (let elems of groupRadio) {
		if (elems.checked == false) {
			pasCheck++;
			if (pasCheck == groupRadio.length) {
				afficherErreur(groupeRadio, "* Veuillez cocher une option");
				controleOk = false;
			} else {
				controleOk = true;
			}
		}
	}
	return controleOk;

};

/**
 * Mission: Controle si au moins un fichier est selectionner
 * @return {boolean} controleOk 
 * @see afficherErreur()
 */
var controleFichier = () => {
	var fichier = document.getElementById('fichier');
	var controleOk;
	if (fichier.value == "") {
		fichier.style.background = "red";
		fichier.style.color = "white";
		afficherErreur('fichierManquant', "* Fichier manquant");
		controleOk = false;
	} else {
		controleOk = true;
	}

	return controleOk;

}

/**
 * Mission: Declenche les controles du formulaire et un éventuel envoie vers le serveur 
 * Si click sur le boutton valider
 * @see controleChampsSaisie()
 * @see controleRadio()
 * @see afficherErreur()
 * @see controlefichier()
 * @see formulaireValide()
 */
(() => {
	var champsOK;
	var poOK;
	var fichiersOK;

	BTN_VALIDER.addEventListener('click', () => {
		champsOK = controleChampsSaisie();
		poOK = controleRadio('radioPo');
		fichiersOK = controleFichier();

		if (champsOK == false || poOK == false || fichiersOK == false) {
			afficherErreur('erreur', "* Veuillez remplir les champs en rouge");
		} else {
			formulaireValide();
		}
	}, false);
})();