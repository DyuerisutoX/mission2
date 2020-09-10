/**
 * @file detail_client.html
 * @author CHECCHI Sébastien 
 * @author LAW SHUN Nicolas  
 * @author DIEMUNSCH Clement 
 * @author LE GALL Yann
 */

/**
 * Mission: fonction anonyme auto-exécutante englobante qui permet de ne pas se situer directement à la racine
 */ 
(function () {
    // champs du formulaire de recherche client
    const saisieIdClient = document.getElementById("idClient");
    const saisieRaisonSociale = document.getElementById("raisonSociale");
    const saisieVille = document.getElementById("ville");
    const saisieActivite = document.getElementById("activite");

    // bouton de recherche client
    const boutonRechercheClient = document.getElementById("boutonRechercheClient");

    // div qui accueille le message d'erreur
    const messageErreur = document.getElementById("messageErreur");

    // section qui accueille le résultat de la recherche
    const resultatRechercheClient = document.getElementById("resultat_recherche_client");

    // formulaire de recherche client
    const formRechercheClient = document.getElementById("form_recherche_client");

    // regex qui permet de ne laisser passer que les chiffres
    const filtreNombreEntier = /^\d*$/;

    // regex qui permet de ne laisser passer que les caractèles nécessaires, ^(?![\s\S]) permet de laisser passer une saisie vide
    const filtreTexte = /^[a-zA-ZÜ-ü][a-zA-ZÜ-ü \-]*[a-zA-ZÜ-ü]$|^(?![\s\S])/;

    // écouteur d'évènement : clic sur le bouton de recherche client
    /**
     * Mission: écouteur d'évènement : clic sur le bouton de recherche client
     * @param  {string} click
     * @param  {function} lancerRechercheClient
     */
    boutonRechercheClient.addEventListener("click", lancerRechercheClient);


    /**
     * Mission: écouteur d'évènement : touche Entrée dans le formulaire de recherche client
     * @param  {string} keypress
     * @param  {function} function  parametre: e KeyboardEvent
     * @see lancerRechercheClient
     */
    formRechercheClient.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            lancerRechercheClient();
        }
    });

    
    /**
     * Programme principal
     * @see formulaireEstPasVide
     * @see idClientEstOk
     * @see raisonSocialeEstOk
     * @see villeEstOk
     * @see activiteEstOk
     */
    function lancerRechercheClient() {
        let formulairePasVide = false;
        let saisieIdClientOk = false;
        let saisieRaisonSocialeOk = false;
        let saisieVilleOk = false;
        let saisieActiviteOk = false;
        let pret = false;

        resultatRechercheClient.innerHTML = "";
        messageErreur.innerHTML = "";
        saisieIdClient.removeAttribute("class");
        saisieRaisonSociale.removeAttribute("class");
        saisieVille.removeAttribute("class");
        saisieActivite.removeAttribute("class");

        formulairePasVide = formulaireEstPasVide();
        saisieIdClientOk = idClientEstOk();
        saisieRaisonSocialeOk = raisonSocialeEstOk();
        saisieVilleOk = villeEstOk();
        saisieActiviteOk = activiteEstOk();

        pret = (formulairePasVide &&
            saisieIdClientOk &&
            saisieRaisonSocialeOk &&
            saisieVilleOk &&
            saisieActiviteOk);

        if (pret) {
            resultatRechercheClient.removeAttribute("class");
            resultatRechercheClient.innerHTML = "Recherche en cours...";

            formRechercheClient.submit();
        }
    }

    /**
     * Mission: teste si le formulaire a au moins un champs rempli et affiche une consigne dans le cas contraire
     * @see afficherConsigne
     * @return {boolean} 
     */
    function formulaireEstPasVide() {
        let ok = false;

        if (saisieIdClient.value === "" &&
            saisieRaisonSociale.value === "" &&
            saisieVille.value === "" &&
            saisieActivite.value === "") {
            afficherConsigne();
        } else {
            ok = true;
        }

        return ok;
    }

   
    /**
     * Mission: Teste si l'id client saisi est conforme et gère les erreurs associées
     * @see afficheErreur
     * @return {boolean}
     */
    function idClientEstOk() {
        let ok = false;

        if (filtreNombreEntier.test(saisieIdClient.value)) {
            if (saisieIdClient.value.length === 4 ||
                saisieIdClient.value.length === 0) {
                ok = true;
            } else {
                afficherErreur(saisieIdClient, "Erreur : veuillez entrer un \"Id client\" à quatre chiffres svp !");
            }
        } else {
            afficherErreur(saisieIdClient, "Erreur : le champs \"Id client\" doit être un nombre de quatre chiffres !");
        }

        return ok;
    }

    /**
     * Mission: teste si la raison sociale saisie est conforme et gère les erreurs associées
     * @see afficheErreur
     * @return {boolean} 
     */
    function raisonSocialeEstOk() {
        let ok = false;

        if (filtreTexte.test(saisieRaisonSociale.value)) {
            if (saisieRaisonSociale.value.length >= 3 ||
                saisieRaisonSociale.value.length === 0) {
                if (saisieRaisonSociale.value.length <= 32) {
                    ok = true;
                } else {
                    afficherErreur(saisieRaisonSociale, "Erreur : le champs \"Raison sociale\" ne doit pas dépasser trente-deux caractères !");
                }
            } else {
                afficherErreur(saisieRaisonSociale, "Erreur : veuillez entrer au moins trois caractères dans le champ \"Raison sociale\" svp !");
            }
        } else {
            afficherErreur(saisieRaisonSociale, "Erreur : le champs \"Raison sociale\" doit commencer et se terminer par une lettre ! (lettres, tirets, espaces autorisés)");
        }

        return ok;
    }

    /**
     * Mission: teste si la ville saisie est conforme et gère les erreurs associées
     * @see afficheErreur
     * @return {boolean}
     */
    function villeEstOk() {
        let ok = false;

        if (filtreTexte.test(saisieVille.value)) {
            if (saisieVille.value.length >= 2 ||
                saisieVille.value.length === 0) {
                if (saisieVille.value.length <= 40) {
                    ok = true;
                } else {
                    afficherErreur(saisieVille, "Erreur : le champs \"Ville\" ne doit pas dépasser quarante caractères !");
                }
            } else {
                afficherErreur(saisieVille, "Erreur : veuillez entrer au moins deux caractères dans le champ \"Ville\" svp !");
            }
        } else {
            afficherErreur(saisieVille, "Erreur : le champs \"Ville\" doit commencer et se terminer par une lettre ! (lettres, tirets, espaces autorisés)");
        }

        return ok;
    }


    /**
     * Mission: teste si l'activité saisie est conforme et gère les erreurs associées
     * @see afficheErreur
     * @return {boolean}
     */
    function activiteEstOk() {
        let ok = false;

        if (filtreTexte.test(saisieActivite.value)) {
            if (saisieActivite.value.length >= 3 ||
                saisieActivite.value.length === 0) {
                if (saisieActivite.value.length <= 25) {
                    ok = true;
                } else {
                    afficherErreur(saisieActivite, "Erreur : le champs \"Secteur d'activité\" ne doit pas dépasser vingt-cinq caractères !");
                }
            } else {
                afficherErreur(saisieActivite, "Erreur : veuillez entrer au moins trois caractères dans le champ \"Secteur d'activité\" svp !");
            }
        } else {
            afficherErreur(saisieActivite, "Erreur : le champs \"Secteur d'activité\" doit commencer et se terminer par une lettre ! (lettres, tirets, espaces autorisés)");
        }

        return ok;
    }
    /**
     * Mission: affiche un message d'erreur modifie la couleur sur un champ 
     * @param  {*} champFormulaire
     * @param  {string} message
     */
    function afficherErreur(champFormulaire, message) {
        messageErreur.innerHTML += `${message}<br />`;
        champFormulaire.setAttribute("class", "erreurChamp"); // met un cadre rouge sur le champ où se trouve l'erreur
        resultatRechercheClient.setAttribute("class", "cache");
    }
    /**
     * Mission: Afficher une consigne 
     */
    function afficherConsigne() {
        messageErreur.innerHTML = "Veuillez remplir au moins un des champs svp.";
        resultatRechercheClient.setAttribute("class", "cache");
    }
})();