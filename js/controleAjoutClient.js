// Note: {} controleAjout

/**
 * @file ajout_client.html
 * @author LE GALL Yann
 * @author DIEMUNSCH Clement
 * @author CHECCHI Sébastien 
 * @author LAW SHUN Nicolas 
 */

const BTN_VALIDER = document.getElementById('valider');
// Petit Regex pour empêcher d'envoyer du code HTML
var antiBaliseOuvrante = /<[a-z]+>/g;
var antiBaliseFermante = /<\/[a-z]+>/g;

/**
 * Mission: Envoi le formulaire vers le serveur
 */
var formulaireValide = () => {
	var formulaire = document.getElementById('ajouter_client');
	formulaire.submit();
};

/** 
 * Mission: Permet l'affichage des messages d'erreur pendans 5 secondes
 * @param {string} cible 
 * @param {string} msg 
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
var controleRadio = function (groupeRadio) {
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
 * Mission: Controle si un commentaire est saisie ou pas 
 * @return {boolean} controleOk
 *
 */
var controleCommentaire = () => {
	var controleOk;
	if (commentaire.value.trim().length < 1 || (commentaire.value.match(antiBaliseOuvrante) && commentaire.value.match(antiBaliseFermante) || commentaire.value.match(antiBaliseOuvrante))) {
		commentaire.style.borderColor = "red";
		controleOk = false;
	} else {
		commentaire.style.borderColor = "rgb(118, 118, 118)";
		controleOk = true;
	}

	return controleOk;
}

/**
 * Mission: Declenche les controles du formulaire et un éventuel envoie vers le serveur 
 * Si click sur le boutton valider
 * @see controleChampsSaisie()
 * @see controleRadio()
 * @see controleCommentaire()
 * @see afficherErreur()
 * @see formulaireValide()
 */
(() => {
	var champsOK;
	var typeSocieteOK;
	var natureSocieteOK;
	var commentaireOK;

	BTN_VALIDER.addEventListener('click', () => {
		champsOK = controleChampsSaisie();
		typeSocieteOK = controleRadio('radioTypeSo');
		natureSocieteOK = controleRadio('radioNature');
		commentaireOK = controleCommentaire();

		if (champsOK == false || typeSocieteOK == false || radioNature == false || commentaireOK == false) {
			afficherErreur('erreur', "* Veuillez remplir les champs en rouge");
		} else {
			formulaireValide();
		}
	}, false);
})();