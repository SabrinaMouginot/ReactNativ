# Conserver la liste des films favoris

Ajouter `redux-persist`

```javascript
yarn add redux-persist

import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

```

Configuration du stockage local

```javascript
// Store/configureStore.js

import { createStore } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, toggleFavorite)
const Store = createStore(persistedReducer)
const Persistor = persistStore(Store)

export { Store, Persistor }
```

Ajout du PersistGate dans App.js

```javascript
export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <PersistGate persistor={Persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}
```
