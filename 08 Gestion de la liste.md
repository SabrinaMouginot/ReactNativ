# Gestion de la liste des films

Observez bien en détail le 'data' retourné par l'appel API.
Que voyez-vous ? Combien de films sont renvoyés ? Combien de films sont disponibles ?

En réalité l'appel API ne nous renvoie qu'un nombre limité de films (ici 20) mais il peut y en avoir beaucoup plus ! Il faut donc gérer la pagination.

Regardez dans la documentation de [FlatList](https://reactnative.dev/docs/flatlist#onendreached)

On trouve deux attributs : `onEndReached` et `onEndReachedThreshold`  
`onEndReachedThreshold` est une valeur qui indique à quel moment `onEndReached` doit être appelé
`onEndReached` est un événement qui doit être appelé lorsqu'on défile vers la fin de la liste
Le paramètre suggéré pour `onEndReachedThreshold` est `0.5` : lorsque la moitié de la liste est atteinte, on va actualiser

```javascript
// http://api.themoviedb.org/3/search/movie?api_key=VOTRE_TOKEN_ICI&language=fr&query=Star

{
    page: 1,
    total_results: 1981,
    total_pages: 100,
    results: [
        {...}
    ]
}
```

`page` et `total_pages` vont nous permettre de gérer la pagination

On va ajouter deux attributs à notre composant

```javascript
// Components/Search.js

constructor(props) {
    // ...
    this.page = 0 // Compteur pour connaître la page courante
    this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API
    //...
}
```

Ajouter à notre appel API : bien noter **"&page=" + page** et modification de l'appel de la fonction  
Notez bien **this.page + 1**
Notez bien **`flex: 1`** remarque **vérifier onEndreached**
Notez aussi la condition **`!isLoading`**

```javascript
// API/TMDBApi.js

const getFilmsFromApiWithSearchedText = async (text, page) => {
  const url = /* ... */ + '&language=fr&query=' + text + "&page=" + page

}

// Components/Search.js

_loadFilms() {
    if (this.searchedText.length > 0 && !this.isLoading) {

getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then((data) => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          // ... syntaxe Javascript ES6 qui permet de recopier
          // et de fusionner les deux tableaux
          // ⟺ films: this.state.films.concat(data.results)
          films: [...this.state.films, ...data.results],
          isLoading: false
        });
      });

  <View style={ { marginTop: 20, flex: 1 } }>
  // ...
  <FlatList
    onEndReachedThreshold={0.5}
    onEndReached={() => {
        if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
          this._loadFilms()
        } } }
```

Tester. Constater que les pages défilent correctement.

Maintenant il faut faire la différence entre le fait d'effectuer une nouvelle rechercher et le fait d'aller à la page suivante.  
Ajout et appel de la fonction \_searchFilms pour les recherches

Voir la documentation de [setState](https://fr.reactjs.org/docs/react-component.html#setstate)

```javascript
_searchFilms() {
  this.page = 0
  this.totalPages = 0

  // setState est une fonction asychrone
  // Pour améliorer les performances React peut en différer les traitements
  // Elle prend un deuxième paramètre
  //      une fonction callback qui est appelée lorsque tout est prêt
  this.setState({
      films: [],
    }, () => {
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()
    })
}

<TextInput
  style={styles.textinput}
  placeholder='Titre du film'
  onChangeText={(text) => this._searchTextInputChanged(text)}
  onSubmitEditing={() => this._searchFilms()}
/>
<Button title='Rechercher' onPress={() => this._searchFilms()}/>
```

Après quelques tests on constate que le id renvoyé par l'API produit parfois
des doublons. Solution : ajouter un listId et l'utiliser.

- La fonction `crypto.randomUUID()` pour générer le listId
- On va installer le module uuid : `yarn add uuid`
- Dans API/TMDBApi.js ajouter une boucle pour ajouter le listId aux résultats

```javascript
  import { v4 as uuidv4 } from 'uuid'
  /* ... */
  let i = 0;
  response.data.results.forEach(function (part, index) {
    this[index].listId = uuidv4() + page + i++;
  }, response.data.results);
  return response.data;`
```

- Dans Components/Search.js, au niveau de la Flatlist, changer le keyExtractor

```javascript
  keyExtractor={ (item) => item.listId }
```

Tester, observer les logs
