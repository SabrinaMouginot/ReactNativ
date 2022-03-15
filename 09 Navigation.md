# Naviguer entre les vues (les activités)

Voir la documentation de [React Navigation](https://reactnavigation.org/docs/getting-started/)  
Plusieurs classes/objets permettent de gérer la navigation :

- _StackNavigator_ : les vues sont empilées les unes sur les autres et on choisit quelle vue on affiche
- _TabNavigator_ : permet de créer une barre d'onglets
- _DrawerNavigator_ : permet de créer un menu à gauche qui est refermable et une vue à droite
- _NavigatorIOS_ spécifique à iOS

Installer react-navigation</br>

- `expo install react-navigation react-navigation-stack`
- `expo install react-native-gesture-handler react-native-safe-area-context react-native-reanimated`

## Créez un StackNavigator

Voir le [tutoriel](https://reactnavigation.org/docs/hello-react-navigation/) ou la [documentation](https://reactnavigation.org/docs/navigation-prop)

Création de l'objet pour la fenêtre de "Recherche"

```javascript
// Navigation/Navigation.js

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'

const SearchStackNavigator = createStackNavigator({
  // le nom Search dans le StackNavigator n'est pas forcément identique au nom du composant
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher',
    },
  },
})

export default createAppContainer(SearchStackNavigator)
```

Dans APP.js remplacer `<Search/>` par `<Navigation/>` y compris la directive import

```javascript
// App.js

import React from 'react'
import Navigation from './Navigation/Navigation'

export default class App extends React.Component {
  render() {
    return <Navigation />
  }
}
```

## Créer une vue FilmDetail

```javascript
// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class FilmDetail extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text>Détail du film</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
})

export default FilmDetail
```

Ajout de la vue FilmDetail au StackNavigator

```javascript
const SearchStackNavigator = createStackNavigator({
  // ...
  // le nom dans le StackNavigator n'est pas obligatoirement
  // identique au nom du Composant
  FilmDetail: {
    screen: FilmDetail
  },
}
```

Dans Component/Search.js ajouter une fonction prenant en charge le click sur un film

```javascript
displayDetailForFilm = (idFilm, listId) => {
  console.log('film.id=' + idFilm + ' film.listId=' + listId)
}
```

Cela paraît évident qu'il s'agit d'un clic sur un item (FilmItem) de notre FlatList. On veut qu'au clic sur un component FilmItem, le détail du film cliqué soit affiché. On va donc avoir besoin d'appeler la fonction displayDetailForFilm dans le component FilmItem.

Le composant Pressable permet de récupérer les événements de click.

```javascript
import { Pressable } from "react-native";

class FilmItem extends React.Component {

    render() {
        const film = this.props.film;

        return (
            <Pressable onPress={ () => alert("clicked") } >
```

Véfifier que le `alert("clicked")` fonctionne correctement

Gestion du clic sur le FilmItem :

1. On passe l'objet film en prop au FilmItem : `<FilmItem film={ item }`
2. On passe la fonction displayDetailForFilm en prop au FilmItem : `displayDetailForFilm={ this.displayDetailForFilm }`
3. On récupère les deux props par [décomposition Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
4. Le FilmItem est `Pressable` (voir ci-dessus)
5. Au moment du clic sur un FilmItem on va utiliser la prop `displayDetailForFilm`du FilmItem qui est défini dans le composant `Search` pour traiter le clic et naviguer dans le composant FilmDetail

```javascript
// Components/Search.js
<FlatList renderItem={ ({ item }) => <FilmItem film={ item } displayDetailForFilm={ this.displayDetailForFilm } /> }


// Components/FilmItem.js
class FilmItem extends React.Component {
  render() {

    // Récupération des props par décomposition Javascript
    // { film, displayDetailForFilm } = this.props
    // '⟺     const film = this.props.film
    // '       const displayDetailForFilm = this.props.displayDetailForFilm
    const { film, displayDetailForFilm } = this.props

    return (

      // ...
      <Pressable onPress={ () => displayDetailForFilm(film.id, film.listId) } >
```

Constater dans le log que cela fonctionne

Comme on a ajouté `Search` et `FilmDetail` dans le `StackNavigator`  
chaque composant a une `prop` qui s'appelle `navigation`  
et qui nous permet d'accéder à notre `StackNavigator`.

Maintenant on va ouvrir le FilmDetail grâce à la méthode `navigate` (voir un [exemple](https://reactnavigation.org/docs/params) et/ou la [documentation](https://reactnavigation.org/docs/navigation-prop/#navigate) du `StackNavigator`)  
Avec la méthode `navigate` on ajoute un paramètre `idFilm` à passer à `FilmDetail`

```javascript
displayDetailForFilm = (idFilm, listId) => {
  console.log('film.id=' + idFilm + ' film.listId=' + listId)
  this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
}
```

Vérifions comment cela se passe :

```javascript
class FilmDetail extends React.Component {
  render() {
    console.log(this.props.navigation)
    return (
      // ...
    )
  }
}
```

On constate que le idFilm se trouve dans `this.props.navigation.state.params.idFilm`  
On peut récupérer cette valeur via `this.props.navigation.getParam('idFilm')`
