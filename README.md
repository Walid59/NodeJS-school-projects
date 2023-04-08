# JSFS2_ROUABAH_WALID

# **Comment lancer le tp1 & 2**
1) cd [tp/projet souhaité]  
2) npm install  
3) nodemon OU npm run start

# **Comment lancer le projet PFC**
1) cd client
2) npm run build
3) depuis la racine de pfc, cd server
4) nodemon

## **Comment lancer le tp3 & 4 (basicExpress)** 
1) créer un dossier appData (ou tout autre nom)
2) mongod --dbpath appData (ne pas quitter)
3) npm install
4) nodemon


## **Comment lancer le Le projet "Application de partage"**
1) créer un dossier appData (ou tout autre nom)
2) mongod --dbpath appData (ne pas quitter)

3) mongoimport --db appBase --collection users --type json --file ./mongoimport/users.json
4) mongoimport --db appBase --collection objects --type json --file ./mongoimport/objects.json
6) npm install
7) nodemon
8) Vous pouvez maintenant vous connecter.   
Par exemple avec le compte admin (avec pour login 0 et mot de passe 0), compte utilisateur test (login: 1 & mot de passe: 1), ou utilisateur test 2 (login : 2, mot de passe: 2).  
Ou alors créer un compte.

## Statut des TP/projets à réaliser :
- TP1 : complet, fonctionnel
- TP2 : complet, fonctionnel
- Projet : incomplet, compteur non fonctionnel & pfcia non réalisé.
- Projet 2 : Rechargement automatique de la page non fonctionnelle pour la suppression et le fait de rendre un objet. Tout le reste est fonctionnel.

## Problèmes constatés
- TP1 : aucun, tout est fonctionnel.
- TP2 : aucun, tout est fonctionnel.
- Projet : L'affichage du compteur de points ne fonctionne pas malgré l'incrémentation qui lui fonctionne bien. De plus, le pfcia n'a pas été réalisé.
- TP3 : aucun, tout est fonctionnel.
- TP4 : Partie cliente incomplète.
- Projet 2 : Rechargement automatique de la page non fonctionnelle pour la suppression et le fait de rendre un objet. Tout le reste est fonctionnel.

## Commentaires
- TP2:   
    Les deux versions des questions 7/8 ont étés réalisées.
    - La version en commentaire dans le fichier ioController.js concerne les mêmes valeurs qui sont envoyées au client au même moment. Pour cela, il fallait rendre sendRandomVal() statique pour que intervalID, statique, envoie la même valeur à chacun des clients, au même moment.
    - Pour l'autre version, il faut tout simplement tout mettre en variable et méthode d'instance pour que chaque client ait un nombre différent envoyé à un moment différent. La méthode sendRandomVal() ici contient le parametre socket pour envoyer au socket correspond sa valeur à elle.


- Projet 1 PFC:
  - L'ensemble des routes (sauf pfcia) a été réalisé.
  - L'échange de socket entre le client est serveur a été réalisé, et seul les 2 premiers clients peuvent se connecter et jouer au jeu. Ainsi, si un des 2 premiers joueurs quitte, cela donne la place au 3eme client. (FIFO)
  - Le PFCIA n'a pas été réalisé
  - Le compteur de score a partiellement été réalisé : Il faut actualiser pour avoir le score des joueurs et le compteur à jour. (faire attention à ce qu'il y ait que 2 joueurs...)


- Projet 2 (Application de partage):
  - Tout ce qui a été demandé dans le cahier des charges a été réalisé. C'est à dire :
    1) L'emprunt d'objet : le rechargement de la page de manière asynchrone ne fonctionne pas, il faut faire un f5 après chaque clic.
    2) La suppression d'objet (qui a été emprunté ou pas)
    3) Rendre un objet
    4) La création des objets : le rechargement de la page de manière asynchrone ne fonctionne pas, il faut faire un f5 après chaque clic.
    5) la connexion et la creation d'utilisateur fonctionne parfaitement sauf qu'on peut créer des utilisateurs avec des login identiques, ce qui est un probleme.
    6) les routes, et le REST API.
    7) (j'espere ne rien avoir oublié d'autre)  
  -

  - Pour l'emprunt d'objet on modifie users et objets donc on fait un PUT  
    Pour la suppression d'objet on réalise un POST  
    Pour la création d'objet on realise un POST  
    Pour rendre un objet on realise PUT