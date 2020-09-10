/**
 * @file liste_contact.html
 * @author DIEMUNSCH Clement 
 * @author LE GALL Yann
 * @author CHECCHI Sébastien 
 * @author LAW SHUN Nicolas  
 */

/* Bouton de recherche client
 */
const RECHERCHE = document.getElementById('recherche');

/* DIV qui accueille le nom de l'entreprise saisie
 */
var retournNomClient = document.getElementById('nom_ent');

/* Champ de saisie client
 */
var champsRecherche = document.getElementById('client');

/* Formulaire de recherche client
 */
var formulaire = document.getElementById('form_recherche_client');

/* Regex pour le controle de saisie
 */
var antiBaliseOuvrante = /<[a-z]+>/g;
var antiBaliseFermante = /<\/[a-z]+>/g;
var antiNumber = /[0-9]+/g;

/** 
 * Mission: Permet l'affichage des messages d'erreur pendans 5 secondes
 * @param  {string} cible
 * @param  {string} msg
 */
var afficherErreur = function (cible, msg) {
	var divErreur = document.getElementById(cible);
	divErreur.style.color = "red";
	divErreur.innerText = msg;
	setTimeout(() => {
		divErreur.innerText = "";
	}, 5000);
};

/** 
 * Mission: Controle de saisie sur le champ client du formulaire 
 */
function controleSaisie() {
	//Controle sur la longueur de la chaine de caractères 
	if (champsRecherche.value.length >= 20) {
		afficherErreur('client_manquant', "* Nom client trop long !");
		//Controle afin qu'on ne puisse saisir des balises html dans le champ et affichage du message d'erreur	
	} else if (champsRecherche.value.match(antiBaliseOuvrante) && champsRecherche.value.match(antiBaliseFermante) || champsRecherche.value.match(antiBaliseOuvrante)) {
		afficherErreur('client_manquant', "* Saisie invalide !");
		//Controle si aucune valeur saisie et affichage du message d'erreur	
	} else if (champsRecherche.value.length < 1) {
		afficherErreur('client_manquant', "* Saisie vide ! ");
		//Controle sur les saisies numérique et affichage du message d'erreur	
	} else if (champsRecherche.value.match(antiNumber)) {
		afficherErreur('client_manquant', "* Saisie numérique non autorisé !");
		//Affichage de la valeur saisie (nom de l'entreprise cliente) dans la div nom_ent et soumission du formulaire
	} else {
		retournNomClient.innerText = champsRecherche.value;
			formulaire.submit();
	}
}

(() => {
	/**
	 * Mission: Gestionnaire de l'événement click : Au click sur le bouton de recherche client controle la saisie du champ 
	 * @param  {string} click
	 * @param  {function} 
	 * @see controleSaisie();
	 */
	RECHERCHE.addEventListener('click', ()=> {
		controleSaisie();
	});

	/**
	 * Mission: Gestionnaire de l'événement appui touche : touche Entrée dans le formulaire de recherche client controle la saisie du champ
	 * @param  {string} keypress
	 * @param  {function} function(e)
	 * @see controleSaisie()
	 */
	champsRecherche.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			controleSaisie();
		}
	});
})();