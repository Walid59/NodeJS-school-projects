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

## **Comment lancer le tp3** 
TODO

## **Comment lancer le Le projet "Application de partage"**
1) créer un dossier appData (ou tout autre nom)
2) mongod --dbpath appData (ne pas quitter)

3) mongoimport --db appBase --collection users --type json --file ./mongoimport/users.json
4) mongoimport --db appBase --collection objects --type json --file ./mongoimport/users.json

5) nodemon
6) Vous pouvez maintenant vous connecter. Par exemple avec le compte admin (avec pour mot de passe admin), ou alors créer un compte.

## Statut des TP/projets à réaliser :
- TP1 : complet, fonctionnel
- TP2 : complet, fonctionnel
- Projet : incomplet, compteur non fonctionnel & pfcia non réalisé.
- 

## Problèmes constatés
- TP1 : aucun, tout est fonctionnel.
- TP2 : aucun, tout est fonctionnel.
- Projet : L'affichage du compteur de points ne fonctionne pas malgré l'incrémentation qui lui fonctionne bien. De plus, le pfcia n'a pas été réalisé.
- TP3 : aucun, tout est fonctionnel.
- TP4 : Partie cliente incomplète.
- Projet 2 "Application page unique" en cours de réalisation, il manque pour l'instant le partage d'objets entre utilisateurs, ainsi qu'éventuellement un meilleur affichage des objets.

## Commentaires
- TP2:   
    Les deux versions des questions 7/8 ont étés réalisées.
    - La version en commentaire dans le fichier ioController.js concerne les mêmes valeurs qui sont envoyées au client au même moment. Pour cela, il fallait rendre sendRandomVal() statique pour que intervalID, statique, envoie la même valeur à chacun des clients, au même moment.
    - Pour l'autre version, il faut tout simplement tout mettre en variable et méthode d'instance pour que chaque client ait un nombre différent envoyé à un moment différent. La méthode sendRandomVal() ici contient le parametre socket pour envoyer au socket correspond sa valeur à elle.


- Projet 1 PFC:
  - L'ensemble des routes (sauf pfcia) a été réalisé.
  - L'échange de socket entre le client est serveur a été réalisé, et seul les 2 premiers clients peuvent se connecter et jouer au jeu. Ainsi, si un des 2 premiers joueurs quitte, cela donne la place au 3eme client. (FIFO)
  - Le PFCIA n'a pas été réalisé
  - Le compteur de score a partiellement été réalisé : Il faut actualiser pour avoir le score des joueurs et le compteur à jour. (faire atttention à ce qu'il y ait que 2 joueurs...)


- Projet 2 (Application de partage):
  - TODO 