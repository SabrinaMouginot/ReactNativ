# Récupération du poster

```javascript
// API/TMDBApi.js

const getImageFromApi = (name) => {
  return { uri: 'https://image.tmdb.org/t/p/w300' + name }
}
```

Ajuster l'export et les import

```jsx
// API/TMDBApi.js
export { getFilmsFromApiWithSearchedText, getImageFromApi }

// Components/Search.js
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
```

```jsx
// Components/FilmItem.js

import { getImageFromApi } from '../API/TMDBApi'
```

```jsx
// ...
<Image style={styles.image} source={getImageFromApi(film.poster_path)} />
```

## Gestion des cas où il n'y a pas d'image

- Créer un dossier Assets
- Ajouter le fichiler filmVide.png

```javascript
// API/TMDBApi.js
const getImageFromApi = (name) => {
  if (name === null || name === undefined)
    return require('../Assets/filmVide.png')
  // 'https://image.tmdb.org/t/p/original' + name
  // 'https://image.tmdb.org/t/p/w300' + name
  return { uri: 'https://image.tmdb.org/t/p/w300' + name }
}
```
