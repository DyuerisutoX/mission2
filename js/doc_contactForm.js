/**
 * @file document_contact.html
 * @author LAW SHUN Nicolas  
 * @author DIEMUNSCH Clement 
 * @author LE GALL Yann
 * @author CHECCHI Sébastien 
 */

var recherche = document.getElementById('recherche');
var name = document.getElementById('name');
var firstname = document.getElementById('firstname');
var message;

/** 
 * Mission: Gestionnaire de l'événement click : click sur le bouton de recherche 
 * @param  {string} click
 * @param  {function} f_rechercher
 */
recherche.addEventListener('click', f_rechercher);

/** 
 * Mission: Controle de saisie affichage message d'erreur ou affichage du nom et prénom contact
 */
function f_rechercher() {
    //Controle si champ vide
    if (name.value == "" || firstname.value == "") {
        message = "*Veuillez complétez au moins 1 champ";
        document.getElementById('message').innerHTML = message;
        document.getElementById('message').style.color = 'red';

        setTimeout(() => {
            document.getElementById('message').innerHTML = "";
        }, 2000);
    } else {
        //Afficher nom et prenom
        name = document.getElementById('name').value;
        firstname = document.getElementById('firstname').value;

        message = "Nom: " + name + '<br>Prénom: ' + firstname;
        document.getElementById('result').innerHTML = message;
        document.getElementById('result').style.color = 'blue';

    }

}