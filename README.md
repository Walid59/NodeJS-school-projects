# JSFS2_ROUABAH_WALID

# **Comment lancer le tp/projet**
1) cd [tp/projet souhaité]  
2) npm install  
3) nodemon OU npm run start

## Statut des TP/projets à réaliser :
- TP1 : complet, fonctionnel
- TP2 : complet, fonctionnel
- Projet : en cours de réalisation

## Problèmes constatés
- TP1 : aucun, tout est fonctionnel.
- TP2 : aucun, tout est fonctionnel.
- Projet : 

## Commentaires
- TP2:   
    Les deux versions des questions 7/8 ont étés réalisées.
    - La version en commentaire dans le fichier ioController.js concerne les mêmes valeurs qui sont envoyées au client au même moment. Pour cela, il fallait rendre sendRandomVal() statique pour que intervalID, statique, envoie la même valeur à chacun des clients, au même moment.
    - Pour l'autre version, il faut tout simplement tout mettre en variable et méthode d'instance pour que chaque client ait un nombre différent envoyé à un moment différent. La méthode sendRandomVal() ici contient le parametre socket pour envoyer au socket correspond sa valeur à elle.
