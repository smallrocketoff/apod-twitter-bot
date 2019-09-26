# APOD Twitter Bot
## Astronomy Picture of the Day Twitter Bot
L'Astronomy Picture of the Day Twitter Bot vous permet de poster de manière automatique, sur votre compte twitter, une image ou une photographie de notre Univers différente chaque jour. Les images sont issues du site Astronomy Picture of the Day (<http://apod.nasa.gov/>).

# Commencer
## Prérequis
Pour pouvoir utiliser l'APOD Twitter Bot, il vous faudra au préalable télécharger et installer Node.js ainsi que git.

## Installation
1. Ouvrir un terminal.
2. Naviguez jusqu'à l'emplacement souhaité pour le référentiel.
3. Cloner le référentiel avec la commande `git clone https://github.com/smallrocketoff/apod-twitter-bot.git`.
4. Accédez à `/ apod-twitter-bot`.
5. Exécutez `npm i`.

## Fonctionnement
Le programme fonctionne pour le moment avec deux fichiers à exécuter séparément, le premier, `apod-image.js`, télécharge l'image du jour et la place dans le répertoire ou se situs le fichier. Le deuxième, `tweet.js`, envoie l'image téléchargée précédemment vers Twitter avec quelques informations sur celle-ci. Il ne vous restera plus qu'a créé une tâche afin d'exécuter les deux programmes tous les jours, avec un assez grand écart entre l'exécution des deux pour ne pas avoir de mauvaises surprises.
