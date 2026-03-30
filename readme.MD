### Stack :

* **React** affiche
* **Vite** aide à développer le front
* **Node.js** fait tourner le back
* **Express** gère les routes de l’API
* **PostgreSQL** stocke les données
* **Prisma** relie le back à la base

## I - Préparer l'environnement de travail

- Set up Node.js
- créer le front/client (npm create vite@latest)
- Créer le back (npm install express)
- Setup Postgres (Créer la db du projet dans psql)
- Setup Prisma (Mettre l'URL de la DB dans le .env backend)
- Créer la table dans schema.prisma
- Effectuer la migration (npx prisma migrate dev --name init), pour que la DB dans postgre soit update avec le schema de Prisma.

### II - Backend

- index.js : Moteur de l'application -> Lance le serveur.
- src/lib/prisma.js : Création du client prisma, qui sera chargé de communiquer avec la DB.
- src/routes/appointments : router /appointments qui est chargé de toutes les routes en rapport avec les appointments.
  - TIPS : On utilise const router = Router() qu'on exporte. L'idée c'est qu'aucun fichier route ne doit connaitre const app. App est le standard, et il délègue aux routeurs, pas l'inverse.
    - C'est important pour la modularité. router est un mini-app indépendant que l'on branche sur l'app principale. Router() est une méthode d'Express.
  - TIPS2 : On default export router ----> Il est le "module" le plus important de ce .js. Sinon on aurait named export. (Rappel cours learnJS).

### III - Frontend

- src/App.jsx : On remplace le contenu généré par Vite par défaut (Page d'accueil Vite).
- On

## - React -

C'est une library JavaScript qui permet de construire des UI en les décrivant comme une fonction de données (UI = f(data)).

React sert à afficher une interface en fonction de données.

**Un composant React** c'est **une fonction qui return du jsx (du js dans du html) pour décrire une partie de l'UI**. C'est une brique du frontend.

**Un state** est **une donnée interne au composant qui peut changer et déclenche un re-render**.

Les props sont des données qui sont passées d'un parent à un enfant. (Un composant peut appeler un autre composant)

React est une bibliothèque qui permet d’afficher une interface en fonction de données, et de la mettre à jour automatiquement quand ces données changent.

- La fonction App dans App.jsx est un composant react. Soit une fonction qui décrit ce qu'on veut afficher à l'écran.
- Un state React ; Une donnée qui peut changer dans le temps ET qui met à jour l'écran automatiquement
- const [appointments, setAppointments] =useState([]); : Il s'agit d'une destructuration, React nous renvoie une data + une fonction.
- appointments représente la data, par exemple la liste des appointments. {brandname: "Dior"}.
- setAppointments représente une méthode qui va modifier la data, relance le composant et met donc à jour l'UI. Cette méthode est fourni par React, et nous on la nomme.
- De fait, on ne modifie donc jamais la data directement avec appointments = data; On utilisera toujours setAppointments(data);
- .jsx : Quand on gère de l'UI ---> JS avec du HTML dedans.
- .js : Quand on gère de la logique.
- Dés qu'une data va être modifiée, un re-render de l'UI est effectué auto par setAppointment (useState([])).
- useEffect([]) est une méthode React. Le [] signifie "une seule fois", donc quand la page charge fait ça (ce qui est envoyé en parametre de la fonciton, dans notre cas le fetch /appointments), si on fait useEffect(( => {}); il va s'effectuer à chaque re-render, ce qu'on ne souhaite pas ici.

### IMPORTANT : Pour que React déclenche un Re-render après une modif d'une donnée du state, il faut qu'il soit au courant que la donnée a été modifiée. C'est pour cette raison qu'il faut modifier la donnée en utilisant l'API React (Le setter fournis par useState), et non modifier la valeur simplement en JS.


### - CSS - 

Une classe en React est un nom qu'on donne à un élément pour le styliser. 

```javascript
<div className="container"></div>
```

en CSS 

```css
.container {
  background: red;
}
```

--> Le . en CSS = "Je cible une classe".

2 - Attribut (HTML)

```javascript
<input type="text" placeholder="Ton nom" />
```

type : Type d'input

placeholder : texte gris

value : valeur

onClick : interaction (react)

3 - Propriété CSS

```css
color: red;

Suit le schéma : propriété: valeur;
```

Propriétés CSS les plus utiles :



### - Lexique -

- Composant = Fonction React (App)
- State = données internes du composant (brandName)
- Setter = fonction qui met à jour le state (setBrandName)
- Render = exécution de la fonction + génération du JSX
- DOM = La page HTML affichée
- Event = action utilisateur (ex: taper dans un input)
- Handler = fonction appelée quand un event se produit. (onChange)
