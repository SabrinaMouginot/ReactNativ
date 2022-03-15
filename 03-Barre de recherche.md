# Création de la barre de recherche

- Créer un dossier `Components`
- Créer un fichier `Search.js`
- Import des composants React Native déjà existants View, TextInput et Button
- Création d'un composant personnalisé

```javascript
// Components/Search.js
import React from 'react'
import { View, TextInput, Button } from 'react-native'
```

```javascript
class Search extends React.Component {
    render() {
        return (
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            )
    }
}

export default Search
```

`export default Search` permet de rendre notre composant accessible

- Dans la méthode render() mettre les composants que l'on veut

```javascript
    render() {
        return (
            <View>
                <TextInput placeholder='Titre du film' />
                <Button title='Rechercher' onPress={() => { }} />
            </View>
        )
    }
```

- Dans App.js

```javascript
import React from 'react'
import Search from './Components/Search'

export default class App extends React.Component {
  render() {
    return <Search />
  }
}
```

**_React Native utilise les composants natifs pour rendre vos vues. Sur IOS un bouton natif iOS : UIButton ; sur Android un bouton natif Android : android.widget.Button._**

# JSX

JSX est une extension du langage Javascript créée par Facebook. Il facilite la création de components avec une syntaxe très simple inspirée du HTML et du XML. JSX convertit le rendu de nos components en éléments React (qui sont eux-mêmes convertis en éléments natifs).

```javascript
<View>
  <TextInput placeholder="Titre du film" />
  <Button title="Rechercher" onPress={() => {}} />
</View>
```

est converti en

```javascript
React.createElement(
  View,
  {},
  React.createElement(TextInput, { placeholder: 'Titre du film' }),
  React.createElement(Button, { title: 'Rechercher', onPress: () => {} })
)
```

Source : OpenClassRoom
