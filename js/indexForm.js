/**
 * @file acceuil.html
 * @author LAW SHUN Nicolas  
 * @author DIEMUNSCH Clement 
 * @author LE GALL Yann
 * @author CHECCHI Sébastien 
 */

let validation = document.getElementById('bouton_envoi');
let login = document.getElementById('login');

//Expression régulière de login, 1ère lettre doit être une majuscule
let login_v = /[A-Z][A-Za-z' -]+/;

let password = document.getElementById('password');
let erreur;
let tentatives = 3;

/**
 * Mission: 
 * @param  {string} click
 * @param  {function} f_control
 */
validation.addEventListener('click', f_control);

/**
 * Mission: 
 * @param  {function} e
 */
function f_control(e) {
    //Si aucune valeur n'est entrer dans utilisateur
    if (!login.value) {
        erreur = "Veuillez renseignez un nom.";
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = erreur;
    }
    //Si aucune valeur n'est entrer dans mot de passe
    else if (!password.value) {
        erreur = "Veuillez complétez le mot de passe.";
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = erreur;
    } else {
        //Si le format de login n'est pas respecté
        if (login_v.test(login.value) == false) {
            erreur = "Format identifiant incorrect.<br>" + "Veuillez commencer par une majuscule";
            document.getElementById('message').style.color = 'orange';
            document.getElementById('message').innerHTML = erreur;
        } else {
            //Si l'utilisateur ou le mot de passe est incorrect
            if (login.value !== 'Toto' || password.value !== 'abc') {
                tentatives--; //On réduit le nombre de tentatives
                erreur = "Erreur, utilisateur ou mot de passe incorrect.<br> Il vous reste " + tentatives + " essai(s).";
                document.getElementById('message').style.color = 'red';
                document.getElementById('message').innerHTML = erreur;

            }

            //Si tout est ok, redirection vers la page Accueil
            else {
                document.location = "html/accueil.html";
            }

        }

        //Si nbre de tentatives atteint 0, Le bouton connexion est supprimé
        if (tentatives == 0) {
            validation.remove();
            erreur = "Vous avez trop fait d'erreur.<br>" + "Veuillez rafraichir la page";
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = erreur;
        }

    }

}