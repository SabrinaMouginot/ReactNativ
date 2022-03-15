# Liste des favoris

## this n'est pas automatiquement défini/lié/bindé correctement

```javascript
let person = {
  name: 'John Doe',
  getName: function () {
    // this n'est pas défini/lié correctement
    console.log(this.name)
  },
}
setTimeout(person.getName, 1000)
```

```javascript
let person = {
  name: 'John Doe',
  getName: function () {
    // this est l'objet personne grâce à la fonction bind
    console.log(this.name)
  },
}
let f = person.getName.bind(person)
setTimeout(f, 1000)
```

```javascript
let person = {
  name: 'John Doe',
  getName: () => {
    // this est correctement défini grâce à la fonction fléchée
    console.log(this.name)
  },
}
setTimeout(f, 1000)
```

[5 Approches du Data Binding en React](https://www.freecodecamp.org/news/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56/)

## FilmList

- Créer un composant ReactNative FilmList qui contient la FlatList
- Dans Search.js remplacer la FlatList par le nouveau composant FilmList  
  Plusieurs props : films, \_loadFilms qui est la fonction de rechargement des films, page, totalPages et favoriteList qui est true ou false
- Dans Search.js transformer \_loadFilms en une fonction fléchée
- Créer un fichier `Favorites.js` qui affiche la liste des favoris
- Dans `Navigation.js` créer un `BottomTabNavigator` avec `createBottomTabNavigator` qui contient deux onglets : SearchStackNavigator et FavoritesStackNavigator

```javascript
// Components/Search.js

  _loadFilms = (doResetList = false) => {
```

```javascript
// Components/Search.js

<Button title="Rechercher" onPress={() => this._loadFilms(true)} />
        <FilmList
          films={this.state.films}
          loadFilms={() => this._loadFilms()}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false}
        />
```

```javascript
// Navigation/Navigation.js

/* à compléter */

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      /* à compléter */
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarLabel: '♥',
      },
    },
  },
  {
    tabBarOptions: tabBarOptions,
  },
)
)

const tabBarOptions = {
  activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
  inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
  scrollEnabled: true,
  labelStyle: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
  },
  style: {
    backgroundColor: 'lightgrey',
  },
}

export default createAppContainer(MoviesTabNavigator)
```
