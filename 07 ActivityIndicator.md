# Ajout d'une image "en cours de chargement"

React Native propose un composant pour cela : ActivityIndicator

Est-ce qu'une variable `isLoading`, pour afficher ou masquer notre chargement, a sa place dans le state ?

Oui, on veut qu'à son chargement, avec `setState` , notre component Search soit re-rendu pour afficher, ou non, le chargement.

Ajout de la varible isLoading

```javascript
// Components/Search.js

this.state = {
  films: [],
  isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
}

 // Bien noter les deux setState
 //   isLoading: True puis appel API puis lorsque l'API a répondu isLoading: False
 _loadFilms() {
    if (this.searchedText.length > 0 && !this.state.isLoading) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText).then((data) => {
        this.setState({ films: data.results, isLoading: false });
      });
    }
  }
```

Ajout de l'ActivityIndicator

```javascript
    // Components/Search.js
    import { ActivityIndicator } from 'react-native'

    // ...
   _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
        )
      }
    }

    // dans la méthode render()
        { this._displayLoading() }
      </View>


     // Ajout d'un style
     const styles = StyleSheet.create({
        ...
        loading_container: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }
        })
```

Simulation de la lenteur du réseau

```javascript
// API/TMDBApi.js


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function slowNetwork() {
  await sleep(5000)
}

const getFilmsFromApiWithSearchedText = async (text) => {
  await slowNetwork()
```
